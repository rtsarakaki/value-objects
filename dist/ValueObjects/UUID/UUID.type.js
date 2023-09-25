"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUUID = exports.UUID = exports.GenerateUUID = void 0;
const Types_1 = require("../../Types");
const Validations_1 = require("../../Validations");
function S4() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
}
function GenerateUUID(label) {
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
        S4()).toLowerCase(), label);
}
exports.GenerateUUID = GenerateUUID;
class UUID extends Types_1.GenericType {
    constructor(value, label, ...customValidators) {
        const msg = label ?? 'Id';
        super(value);
        if (value !== null) {
            const defaultValidators = [
                () => (0, Validations_1.CannotBeBlank)(value, msg),
                () => (0, Validations_1.MustHaveOnlyOneWord)(value, msg),
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
function createUUID(value, label) {
    if (!value || value.trim() === '') {
        return GenerateUUID(label);
    }
    else {
        return new UUID(value, label);
    }
}
exports.createUUID = createUUID;
