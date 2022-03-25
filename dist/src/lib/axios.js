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
const axios_1 = __importDefault(require("axios"));
const headerObjectDefault = {
    token: (token) => ({
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
    }),
    default: () => ({
        "Content-Type": "application/json",
    }),
};
class Request {
    constructor(baseUrl) {
        const urlEnviromentDefault = `${process.env.ENVIRONMENT}` !== 'Local' ? `${process.env.URL_BASE_REQUEST}` : `${process.env.URL_LOCAL}`;
        this.baseUrl = baseUrl || urlEnviromentDefault;
    }
    static setAuthorizationDefault(auth) {
        return headerObjectDefault[Object.keys(auth)[0]](auth.token);
    }
    get(options) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let headersTemp;
                if (options.headers) {
                    headersTemp = Object.assign({}, options.headers);
                }
                else {
                    headersTemp = options.auth
                        ? Request.setAuthorizationDefault(options.auth)
                        : headerObjectDefault.default;
                }
                const response = yield axios_1.default.get(`${options.url ? options.url : this.baseUrl + options.endpoint}`, Object.assign({}, headersTemp));
                return response.data;
            }
            catch (error) {
                throw new Error(`${error}`);
            }
        });
    }
    post(options) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let headersTemp;
                if (options.headers) {
                    headersTemp = Object.assign({}, options.headers);
                }
                else {
                    headersTemp = options.auth
                        ? Request.setAuthorizationDefault(options.auth)
                        : headerObjectDefault.default;
                }
                options.data = options.data || {};
                if (options.typeDataSend == "UrlParams") {
                    let formData = new URLSearchParams();
                    for (const key in options.data) {
                        formData.append(`${key}`, options.data[`${key}`]);
                    }
                    options.data = formData;
                }
                const response = yield axios_1.default.post(`${options.url ? options.url : this.baseUrl + options.endpoint}`, options.data, Object.assign({}, headersTemp));
                return response.data;
            }
            catch (error) {
                throw new Error(`Request Error: ${error}`);
            }
        });
    }
    put(options) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let headersTemp;
                if (options.headers) {
                    headersTemp = Object.assign({}, options.headers);
                }
                else {
                    headersTemp = options.auth
                        ? Request.setAuthorizationDefault(options.auth)
                        : headerObjectDefault.default;
                }
                const response = yield axios_1.default.post(`${options.url ? options.url : this.baseUrl + options.endpoint}`, JSON.stringify(options.data) || {}, Object.assign({}, headersTemp));
                return response.data;
            }
            catch (error) {
                throw new Error(`Request Error: ${error}`);
            }
        });
    }
}
exports.default = Request;
