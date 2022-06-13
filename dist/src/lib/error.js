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
    generateErrorControlled(errorInfo) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(' error generate ', errorInfo);
            const errorException = new Error(errorInfo.message);
            errorException.name = errorInfo.nameError;
            errorException.code = errorInfo.code;
            errorException.exception = true;
            throw errorException;
        });
    }
    catchController(error) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('errror controolled', error);
            /** validation for errors from Requests ( axios , fetch ) */
            if (error.response && !error.response.data.result && error.response.data.controlled) {
                const errorException = new Error(error.response.data.message);
                errorException.name = 'ERROR-CONTROLLED-REQUEST';
                errorException.code = error.response.status;
                errorException.exception = true;
                throw errorException;
            }
            const errorException = new Error(error.response.data.message);
            errorException.name = 'ERROR-NO-CONTROLLED-REQUEST';
            errorException.code = error.response.status;
            errorException.exception = false;
            throw errorException;
        });
    }
    catchParentResponse(error, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(' error catchParentResponse ', error);
            const defaultRes = {
                codeResponse: 500,
                result: false,
                message: "Ha sucedido un error, por favor intente más tarde.",
                data: null,
                controlled: false,
            };
            if (error.exception) {
                defaultRes.codeResponse = error.code;
                defaultRes.message = error.message;
                defaultRes.controlled = true;
                return res.status(error.code).json(Object.assign({}, defaultRes));
            }
            return res.status(defaultRes.codeResponse).json(Object.assign({}, defaultRes));
        });
    }
}
exports.default = ResponseDTO;
