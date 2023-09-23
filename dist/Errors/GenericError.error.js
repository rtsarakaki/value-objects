"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenericError = void 0;
class GenericError extends Error {
    errors = new Array();
    constructor(message, errors = null) {
        super(message);
        this.errors = errors;
        Object.setPrototypeOf(this, GenericError.prototype);
    }
}
exports.GenericError = GenericError;
