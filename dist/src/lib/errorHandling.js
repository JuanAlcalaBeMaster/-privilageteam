"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpError = void 0;
class HttpError extends Error {
    constructor(status, message, name) {
        super(message);
        this.status = status || 500;
        this.message =
            message || 'Ha sucedido un error, por favor intente más tarde.';
        this.result = name || 'Internal server error';
    }
}
exports.HttpError = HttpError;
