"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class GenericError extends Error {
    errors = new Array();
    constructor(message, errors = null) {
        super(message);
        this.errors = errors;
        Object.setPrototypeOf(this, GenericError.prototype);
    }
}
exports.default = GenericError;
