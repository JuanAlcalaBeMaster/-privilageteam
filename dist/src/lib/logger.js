"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const dynamoAws_1 = __importDefault(require("../utils/db/dynamo/dynamoAws"));
class Logger {
    constructor(config) {
        this.config = config;
    }
    log(params) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                Logger.validationDataByDialect[`${this.config.dialect}`](params, this.config.level);
                return yield Logger.actionByDialect[`${this.config.dialect}`](params, this.config.level);
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.default = Logger;
_a = Logger;
Logger.validationDataByDialect = {
    dynamo: (params) => {
        let validate = true;
        if (params.itemDynamoCustom) {
            validate = params.itemDynamoCustom.tableName.length > 0;
            validate = !params.itemDynamoCustom.item ? false : true;
        }
        else if (params.itemDynamoDefault) {
            validate = params.itemDynamoDefault.tableName.length > 0;
            validate = params.itemDynamoDefault.item.date.S.length > 0;
        }
        return validate;
    },
};
Logger.actionByDialect = {
    dynamo: (params, level) => __awaiter(void 0, void 0, void 0, function* () {
        if (params.itemDynamoDefault) {
            params.itemDynamoDefault.item.typeLog.S = params.itemDynamoDefault.item.typeLog.S || level;
        }
        yield dynamoAws_1.default.setItem(params.itemDynamoDefault.tableName || params.itemDynamoCustom.tableName, params.itemDynamoDefault.item || params.itemDynamoCustom.item);
    })
};
