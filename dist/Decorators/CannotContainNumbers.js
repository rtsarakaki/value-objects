"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CannotContainNumbers = void 0;
const ValidationDecorator_1 = require("./ValidationDecorator");
const CannotContainNumbers_validation_1 = require("../Validations/CannotContainNumbers.validation");
const CannotContainNumbers = (label, language = 'en-US') => {
    return function (target, key) {
        (0, ValidationDecorator_1.ValidationDecorator)(label, true, (value, label) => {
            const result = (0, CannotContainNumbers_validation_1.CannotContainNumbers)(value, label, language);
            return result;
        })(target, key);
    };
};
exports.CannotContainNumbers = CannotContainNumbers;
