import { Response } from "express";
import Logger from './logger';
import { DateTime } from 'luxon';

interface BaseResponse {
  codeResponse?: number;
  result?: string | Boolean;
  message?: string;
  data?: any;
  controlled: Boolean;
}

interface ErrorControlled {
  nameError: string;
  message: string;
  code: number;
  data?: any;
}

type ConstructorParametersInterface = {
  errorTableLog: string,
  moduleLog: string;
}

class ResponseDTO {
  errorTableLog: string;
  moduleLog: string;
  logger: Logger;

  constructor(params: ConstructorParametersInterface) {
    this.errorTableLog = params.errorTableLog;
    this.moduleLog = params.moduleLog;
    this.logger = new Logger({ dialect: 'dynamo', level: 'error' });
  }

  async generateErrorControlled(errorInfo: ErrorControlled) {
    const errorException: any = new Error(errorInfo.message);
    errorException.name = errorInfo.nameError;
    errorException.code = errorInfo.code;
    errorException.exception = true;
    errorException.data = errorInfo.data;
    throw errorException;
  }

  async catchController(error: any) {
    console.log('errror controolled', error);
    /** validation for errors from Requests ( axios , fetch ) */
    
    if (error.isAxiosError && error.response && !error.response.data.result && error.response.data.controlled) {
      const data = error.response ? JSON.stringify(error.response.data) : error.message;
      let dataLogError = {
        date: { S: `${DateTime.now().toUTC().toISO()}` },
        typeLog: { S: `ERROR-GENERATED-BY-REQUEST` },
        module: { S: this.moduleLog },
        data: { S: data },
        catchBy: { S: 'CatchControllerRequest' },
        controlled: { S: `${true}` },
        urlCaught: { S: `${error.config.url}` },
        dataSentRequest: { S: `${error.config.data}` },
        methodUsedRequest: { S: `${error.config.method}` },
        codeError: { S: 'ERROR-CONTROLLED-REQUEST'}
      }
      const errorException: any = new Error(error.response.data.message);
      errorException.name = 'ERROR-CONTROLLED-REQUEST';
      errorException.code = error.response.status;
      errorException.exception = true;

      await this.logger.log({
        itemDynamoCustom: {
          tableName: this.errorTableLog,
          item: dataLogError,
        },
      });

      throw errorException;
    }else if (error.isAxiosError){
      const data = error.response ? JSON.stringify(error.response.data) : error.message;
      const status = error.response ? error.response.status : '500';
      let dataLogError = {
        date: { S: `${DateTime.now().toUTC().toISO()}` },
        typeLog: { S: `ERROR-GENERATED-BY-REQUEST` },
        module: { S: this.moduleLog },
        data: { S: data },
        catchBy: { S: 'CatchControllerRequest' },
        controlled: { S: `${false}` },
        urlCaught: { S: `${error.config.url}` },
        dataSentRequest: { S: `${error.config.data}` },
        methodUsedRequest: { S: `${error.config.method}` },
        codeError: { S: 'ERROR-NO-CONTROLLED-REQUEST'}
      }
      const errorException: any = new Error('ERROR-NO-CONTROLLED-REQUEST');
      errorException.name = 'ERROR-NO-CONTROLLED-REQUEST';
      errorException.code = status;
      errorException.exception = false;

      await this.logger.log({
        itemDynamoCustom: {
          tableName: this.errorTableLog,
          item: dataLogError,
        },
      });

      throw errorException;
    }
    
    throw error;

  }

  async catchParentResponse(error: any, res: Response) {

    const defaultRes: BaseResponse = {
      codeResponse: 500,
      result: false,
      message: "Ha sucedido un error, por favor intente más tarde.",
      data: null,
      controlled: false,
    };
    let dataLogError = {
      date: { S: `${DateTime.now().toUTC().toISO()}` },
      typeLog: { S: `${error.name == 'ERROR-NO-CONTROLLED-REQUEST' ? error.name : 'ERROR-NO-CONTROLLED'}` },
      module: { S: this.moduleLog },
      data: { S: error.message },
      catchBy: { S: 'Parent' },
      controlled: { S: `${error.controlled ? error.controlled : false}` },
      codeError: { S: `${error.name == 'ERROR-NO-CONTROLLED-REQUEST' ? error.name : 'ERROR-NO-CONTROLLED'}` },
    }

    if (error.exception) {

      defaultRes.codeResponse = error.code;
      defaultRes.message = error.message;
      defaultRes.controlled = true;
      defaultRes.data = error.data;

      dataLogError.controlled = { S: `${true}` };
      dataLogError.typeLog = { S: `${ error.name == 'ERROR-CONTROLLED-REQUEST' ? error.name : 'ERROR-CONTROLLED-GENERATED' }` }
      dataLogError.codeError = { S: ` ${error.name}`}
      await this.logger.log({
        itemDynamoCustom: {
          tableName: this.errorTableLog,
          item: dataLogError,
        },
      });

      return res.status(error.code).json({ ...defaultRes });
    }

    /** save tracking log to dynamoDB */
    await this.logger.log({
      itemDynamoCustom: {
        tableName: this.errorTableLog,
        item: dataLogError,
      },
    });

    return res.status(defaultRes.codeResponse as number).json({ ...defaultRes });
  }
}

export default ResponseDTO;
