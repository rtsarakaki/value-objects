"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const GenericType_type_1 = __importDefault(require("./GenericType.type"));
class GenericEntity extends GenericType_type_1.default {
    constructor() {
        super(null);
    }
    initProp = (object, value, required = true) => {
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
    };
    get id() {
        return '';
    }
}
exports.default = GenericEntity;
