"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenericType = void 0;
class GenericType {
    constructor(value) {
        this._value = value;
        this._originalValue = value;
        this.errors = new Array();
    }
    get originalValue() {
        return this._originalValue;
    }
    get value() {
        return this._value;
    }
    set value(value) {
        this._value = value;
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
        if (validationList !== undefined &&
            validationList !== null &&
            validationList.length > 0) {
            validationList.forEach((validation) => {
                if (typeof validation === 'function') {
                    this.accumulateErrors(validation);
                }
            });
        }
    }
}
exports.GenericType = GenericType;
