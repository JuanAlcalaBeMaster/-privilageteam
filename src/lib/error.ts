import { Response } from "express";

interface BaseResponse {
  codeResponse?: number;
  result?: string | Boolean;
  message?: string;
  data?: any;
}

interface ErrorControlled {
    nameError: string;
    message: string;
    code: number;
}

class ResponseDTO {

  async generateErrorControlled(errorInfo: ErrorControlled) {
      console.log(' error generate ', errorInfo);
      const errorException: any = new Error(errorInfo.message);
          errorException.name = errorInfo.nameError;
          errorException.code = errorInfo.code;
          errorException.exception = true;
      throw errorException;
  }

  async catchController(error: any) {
      console.log('errror controolled', error);
    /** validation for errors from Requests ( axios , fetch ) */
    if(error.response && !error.response.data.result) {
        const errorException: any = new Error(error.response.data.message);
        errorException.name = 'ERROR-CONTROLLED-REQUEST';
        errorException.code = error.response.status;
        errorException.exception = true;
        throw errorException;
    }

    throw error;
  }

  async catchParentResponse(error: any, res: Response) {
    console.log(' error catchParentResponse ', error);

    const defaultRes: BaseResponse = {
      codeResponse: 500,
      result: false,
      message: "Ha sucedido un error, por favor intente más tarde.",
      data: null,
    };
    
    if(error.exception) {
      defaultRes.codeResponse = error.code;
      defaultRes.message = error.message;
      return res.status(error.code).json({ ...defaultRes });
    }

    return res.status(defaultRes.codeResponse as number).json({ ...defaultRes });
  }
}

export default ResponseDTO;
