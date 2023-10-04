"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationDecorator = void 0;
const Errors_1 = require("../Errors");
const ValidationDecorator = (label, required, validation) => {
    return function (target, key) {
        let value = target[key];
        const addError = (error) => {
            value = error;
            let errors = target['errors'];
            if (!errors) {
                errors = [];
            }
            errors.push(error);
        };
        Object.defineProperty(target, key, {
            get: function () {
                return value;
            },
            set: function (newValue) {
                const typeValidation = typeof newValue !== 'string';
                if (typeValidation) {
                    throw new Errors_1.InvalidValue(`The value of '${label}' must be a string. ${typeof newValue} stringfy ${JSON.stringify(newValue)}`);
                }
                const emptyOrNotDefined = required && (newValue == undefined || newValue.length === 0 || newValue?.trim() === '');
                if (emptyOrNotDefined) {
                    throw new Errors_1.InvalidValue(`The value of '${label}' cannot be blank.`);
                }
                const validationError = validation(newValue, label);
                if (validationError) {
                    throw validationError;
                }
                value = newValue;
            },
            enumerable: true,
            configurable: true
        });
    };
};
exports.ValidationDecorator = ValidationDecorator;
