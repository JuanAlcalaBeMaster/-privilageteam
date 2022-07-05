import { DateTime } from "luxon";
import dynamoDB from "../utils/db/dynamo/dynamoAws";
import Logger from './logger'


interface ItemDefault {
  date: { S: string };
  typeLog?: { S: string };
  data: { S: string };
}

interface LogParamsInterface {
  idProduct: number;
  idWebhook: number;
  data: any;
}

const loggerWebhook = new Logger({dialect: 'dynamo', level: 'info'});


export default class Webhook {
  logger: Logger;

  constructor() {
    this.logger = loggerWebhook;
  }

  async addWebhookCall(params: LogParamsInterface) {
    try {
        console.log('params', params);
        const dateExecute = DateTime.now().toISO();
        const id = `WH-${dateExecute}`
        const normalizeData = {
            wid: { S: id },
            date: { S: dateExecute },
            idProduct: { S: params.idProduct },
            idWebhook: { S: params.idWebhook },
            data: { S: JSON.stringify(params.data)},
          }
        return await this.logger.log({itemDynamoCustom: {tableName: 'PayTool-Webhook-Action', item: normalizeData}});
    } catch (error) {
        console.log(' error add webhaook', error);
        throw error;
    }
  }
}
