"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenericType = void 0;
class GenericType {
    value;
    errors = new Array();
    constructor(value) {
        this.value = value;
    }
    get isValid() {
        return this.errors?.length === 0;
    }
    accumulateErrors(callback) {
        const res = callback();
        if (res) {
            this.errors.push(res);
        }
    }
    validate(validationList) {
        validationList.forEach(validation => this.accumulateErrors(validation));
    }
    toJson() {
        return {};
    }
}
exports.GenericType = GenericType;
