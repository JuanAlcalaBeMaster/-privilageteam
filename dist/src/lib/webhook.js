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
Object.defineProperty(exports, "__esModule", { value: true });
const luxon_1 = require("luxon");
const logger_1 = __importDefault(require("./logger"));
const loggerWebhook = new logger_1.default({ dialect: 'dynamo', level: 'info' });
class Webhook {
    constructor() {
        this.logger = loggerWebhook;
    }
    addWebhookCall(params) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log('params', params);
                const dateExecute = luxon_1.DateTime.now().toISO();
                const id = `WH-${dateExecute}`;
                const normalizeData = {
                    wid: { S: id },
                    date: { S: dateExecute },
                    idProduct: { S: params.idProduct },
                    idWebhook: { S: params.idWebhook },
                    data: { S: JSON.stringify(params.data) },
                };
                return yield this.logger.log({ itemDynamoCustom: { tableName: 'PayTool-Webhook-Action', item: normalizeData } });
            }
            catch (error) {
                console.log(' error add webhaook', error);
                throw error;
            }
        });
    }
}
exports.default = Webhook;
