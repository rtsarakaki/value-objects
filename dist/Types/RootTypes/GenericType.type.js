"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenericType = void 0;
class GenericType {
    constructor(value) {
        this.value = value;
        this.errors = new Array();
    }
    get isValid() {
        return this?.errors?.length === 0;
    }
    accumulateErrors(callback) {
        const res = callback();
        if (res) {
            this.errors.push(res);
        }
    }
    addErrors(errors) {
        this.errors = this.errors.concat(errors);
    }
    clearErrors() {
        this.errors = [];
    }
    validate(validationList) {
        if (validationList !== undefined && validationList !== null && validationList.length > 0) {
            validationList.forEach(validation => this.accumulateErrors(validation));
        }
    }
}
exports.GenericType = GenericType;
