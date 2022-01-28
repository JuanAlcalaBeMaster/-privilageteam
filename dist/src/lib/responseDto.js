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
Object.defineProperty(exports, "__esModule", { value: true });
class ResponseDTO {
    constructor(res) {
        this.res = res;
    }
    customResponse(response) {
        return __awaiter(this, void 0, void 0, function* () {
            const defaultRes = {
                codeResponse: 200,
                result: "Success",
                message: "",
                data: null,
            };
            const customResult = Object.assign(Object.assign({}, defaultRes), response);
            return this.res.status(customResult.codeResponse).json(Object.assign({}, customResult));
        });
    }
    successResponse(response) {
        return __awaiter(this, void 0, void 0, function* () {
            const defaultRes = {
                codeResponse: 200,
                result: "Success",
                message: "",
                data: null,
            };
            const customResult = Object.assign(Object.assign({}, defaultRes), response);
            return this.res.status(customResult.codeResponse).json(Object.assign({}, customResult));
        });
    }
    errorServerResponse(response) {
        return __awaiter(this, void 0, void 0, function* () {
            const defaultRes = {
                codeResponse: 500,
                result: "Internal server error",
                message: "Ha sucedido un error, por favor intente más tarde.",
                data: null,
            };
            const customResult = Object.assign(Object.assign({}, defaultRes), response);
            return this.res.status(customResult.codeResponse).json(Object.assign({}, customResult));
        });
    }
}
exports.default = ResponseDTO;
