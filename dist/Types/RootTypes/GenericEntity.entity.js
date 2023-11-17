"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenericEntity = void 0;
const GenericType_type_1 = require("./GenericType.type");
class GenericEntity extends GenericType_type_1.GenericType {
    constructor(json) {
        super(null);
        this._json = json;
    }
    initProp(object, value, required = true) {
        if (!(value instanceof GenericType_type_1.GenericType))
            return value;
        const isString = typeof value?.value === 'string';
        const isRequired = required === undefined || required;
        const hasValue = isString ? value?.value === undefined || value?.value.length > 0 : false;
        const needValidation = isRequired || hasValue;
        if (!needValidation) {
            return value;
        }
        if (!value.isValid) {
            object.errors = object.errors.concat(value.errors);
        }
        return value;
    }
    get id() {
        return this._json?.id;
    }
}
exports.GenericEntity = GenericEntity;
