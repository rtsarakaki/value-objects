"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUUID = exports.UUID = exports.GenerateUUID = void 0;
const Types_1 = require("../../Types");
const Validations_1 = require("../../Validations");
function S4() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
}
function GenerateUUID(label, required = true, language = 'en-US', ...customValidators) {
    return new UUID((S4() +
        S4() +
        '-' +
        S4() +
        '-4' +
        S4().substr(0, 3) +
        '-' +
        S4() +
        '-' +
        S4() +
        S4() +
        S4()).toLowerCase(), label, required, language, ...customValidators);
}
exports.GenerateUUID = GenerateUUID;
class UUID extends Types_1.GenericType {
    constructor(value, label, required = true, language = 'en-US', ...customValidators) {
        const msg = label ?? 'Id';
        super(value);
        if (value !== null) {
            const defaultValidators = [
                () => (0, Validations_1.CannotBeBlank)(value, msg, required, language),
                () => (0, Validations_1.MustHaveOnlyOneWord)(value, msg, required, language),
            ];
            const validators = customValidators.length > 0 ? [...defaultValidators, ...customValidators] : defaultValidators;
            this.validate(validators);
        }
        else {
            this.valor = GenerateUUID(label);
        }
    }
}
exports.UUID = UUID;
function createUUID(value, label, required = true, language = 'en-US', ...customValidators) {
    if (!value || value.trim() === '') {
        return GenerateUUID(label, required, language, ...customValidators);
    }
    else {
        return new UUID(value, label, required, language, ...customValidators);
    }
}
exports.createUUID = createUUID;
