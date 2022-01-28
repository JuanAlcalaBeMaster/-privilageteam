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
const axios_1 = __importDefault(require("../lib/axios"));
class ActiveCampaign {
    sendEmail(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = new axios_1.default();
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const requestAction = yield request.post({
                        data: Object.assign(Object.assign({}, params.bodyEmail), params.customTags),
                        typeDataSend: params.typeDataSend || '',
                        url: `${process.env.URL_BASE_ACTIVE_CAMPAIGN}api_action=${params.apiKeys.api_action}&api_key=${params.apiKeys.api_key}&api_output=json`,
                    });
                    console.log("response emil active campaign", requestAction);
                    if (requestAction.result_code == 0) {
                        throw false;
                    }
                    return resolve(requestAction);
                }
                catch (error) {
                    console.log("response catch", error);
                    return reject(false);
                }
            }));
        });
    }
}
exports.default = ActiveCampaign;
