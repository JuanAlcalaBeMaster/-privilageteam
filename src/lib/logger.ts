import dynamoDB from "../utils/db/dynamo/dynamoAws";

interface ConfigLoggerInterface {
  dialect: string;
  level: string;
}

interface ItemDynamoCustomInterface {
  tableName: string;
  item: any;
}

interface ItemDefault {
  date: { S: string };
  typeLog?: { S: string };
  data: { S: string };
}

interface ItemDynamoDefaultInterface {
  tableName: string;
  item: ItemDefault;
}

interface LogParamsInterface {
  itemDynamoCustom?: ItemDynamoCustomInterface;
  itemDynamoDefault?: ItemDynamoDefaultInterface;
}

export default class Logger {
  config: ConfigLoggerInterface;

  constructor(config: ConfigLoggerInterface) {
    this.config = config;
  }

  private static validationDataByDialect: any = {
    dynamo: (params: LogParamsInterface) => {
      let validate: Boolean = true;
      if (params.itemDynamoCustom) {
        validate = params.itemDynamoCustom!.tableName.length > 0;
        validate = !params.itemDynamoCustom!.item ? false : true;
      } else if (params.itemDynamoDefault) {
        validate = params.itemDynamoDefault!.tableName.length > 0;
        validate = params.itemDynamoDefault!.item.date.S.length > 0;
      }
      return validate;
    },
  };

  private static actionByDialect: any = {
    dynamo: async (params: LogParamsInterface, level: string) => {
      if(params.itemDynamoDefault) {
        params.itemDynamoDefault!.item.typeLog!.S = params.itemDynamoDefault!.item.typeLog!.S || level;
      }
        
        await dynamoDB.setItem(
          params.itemDynamoDefault ? params.itemDynamoDefault!.tableName : params.itemDynamoCustom!.tableName,
          params.itemDynamoDefault ? params.itemDynamoDefault!.item : params.itemDynamoCustom!.item
        )
    }
      
  };

  async log(params: LogParamsInterface) {
    try {
      Logger.validationDataByDialect[`${this.config.dialect}`](params, this.config.level);
      return await Logger.actionByDialect[`${this.config.dialect}`](params, this.config.level);
    } catch (error) {
      throw error;
    }
  }
}
