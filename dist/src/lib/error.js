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
const logger_1 = __importDefault(require("./logger"));
const luxon_1 = require("luxon");
class ResponseDTO {
    constructor(params) {
        this.errorTableLog = params.errorTableLog;
        this.moduleLog = params.moduleLog;
        this.logger = new logger_1.default({ dialect: 'dynamo', level: 'error' });
    }
    generateErrorControlled(errorInfo) {
        return __awaiter(this, void 0, void 0, function* () {
            const errorException = new Error(errorInfo.message);
            errorException.name = errorInfo.nameError;
            errorException.code = errorInfo.code;
            errorException.exception = true;
            errorException.data = errorInfo.data;
            throw errorException;
        });
    }
    catchController(error) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('errror controolled', error);
            /** validation for errors from Requests ( axios , fetch ) */
            if (error.isAxiosError && error.response && !error.response.data.result && error.response.data.controlled) {
                const data = error.response ? JSON.stringify(error.response.data) : error.message;
                let dataLogError = {
                    date: { S: `${luxon_1.DateTime.now().toUTC().toISO()}` },
                    typeLog: { S: `ERROR-GENERATED-BY-REQUEST` },
                    module: { S: this.moduleLog },
                    data: { S: data },
                    catchBy: { S: 'CatchControllerRequest' },
                    controlled: { S: `${true}` },
                    urlCaught: { S: `${error.config.url}` },
                    dataSentRequest: { S: `${error.config.data}` },
                    methodUsedRequest: { S: `${error.config.method}` },
                    codeError: { S: 'ERROR-CONTROLLED-REQUEST' }
                };
                const errorException = new Error(error.response.data.message);
                errorException.name = 'ERROR-CONTROLLED-REQUEST';
                errorException.code = error.response.status;
                errorException.exception = true;
                yield this.logger.log({
                    itemDynamoCustom: {
                        tableName: this.errorTableLog,
                        item: dataLogError,
                    },
                });
                throw errorException;
            }
            else if (error.isAxiosError) {
                const data = error.response ? JSON.stringify(error.response.data) : error.message;
                const status = error.response ? error.response.status : '500';
                let dataLogError = {
                    date: { S: `${luxon_1.DateTime.now().toUTC().toISO()}` },
                    typeLog: { S: `ERROR-GENERATED-BY-REQUEST` },
                    module: { S: this.moduleLog },
                    data: { S: data },
                    catchBy: { S: 'CatchControllerRequest' },
                    controlled: { S: `${false}` },
                    urlCaught: { S: `${error.config.url}` },
                    dataSentRequest: { S: `${error.config.data}` },
                    methodUsedRequest: { S: `${error.config.method}` },
                    codeError: { S: 'ERROR-NO-CONTROLLED-REQUEST' }
                };
                const errorException = new Error('ERROR-NO-CONTROLLED-REQUEST');
                errorException.name = 'ERROR-NO-CONTROLLED-REQUEST';
                errorException.code = status;
                errorException.exception = false;
                yield this.logger.log({
                    itemDynamoCustom: {
                        tableName: this.errorTableLog,
                        item: dataLogError,
                    },
                });
                throw errorException;
            }
            throw error;
        });
    }
    catchParentResponse(error, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const defaultRes = {
                codeResponse: 500,
                result: false,
                message: "Ha sucedido un error, por favor intente más tarde.",
                data: null,
                controlled: false,
            };
            let dataLogError = {
                date: { S: `${luxon_1.DateTime.now().toUTC().toISO()}` },
                typeLog: { S: `${error.name == 'ERROR-NO-CONTROLLED-REQUEST' ? error.name : 'ERROR-NO-CONTROLLED'}` },
                module: { S: this.moduleLog },
                data: { S: error.message },
                catchBy: { S: 'Parent' },
                controlled: { S: `${error.controlled ? error.controlled : false}` },
                codeError: { S: `${error.name == 'ERROR-NO-CONTROLLED-REQUEST' ? error.name : 'ERROR-NO-CONTROLLED'}` },
            };
            if (error.exception) {
                defaultRes.codeResponse = error.code;
                defaultRes.message = error.message;
                defaultRes.controlled = true;
                defaultRes.data = error.data;
                dataLogError.controlled = { S: `${true}` };
                dataLogError.typeLog = { S: `${error.name == 'ERROR-CONTROLLED-REQUEST' ? error.name : 'ERROR-CONTROLLED-GENERATED'}` };
                dataLogError.codeError = { S: ` ${error.name}` };
                yield this.logger.log({
                    itemDynamoCustom: {
                        tableName: this.errorTableLog,
                        item: dataLogError,
                    },
                });
                return res.status(error.code).json(Object.assign({}, defaultRes));
            }
            /** save tracking log to dynamoDB */
            yield this.logger.log({
                itemDynamoCustom: {
                    tableName: this.errorTableLog,
                    item: dataLogError,
                },
            });
            return res.status(defaultRes.codeResponse).json(Object.assign({}, defaultRes));
        });
    }
}
exports.default = ResponseDTO;
