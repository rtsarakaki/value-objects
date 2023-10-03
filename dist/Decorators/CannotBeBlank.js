"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CannotBeBlank = void 0;
const ValidationDecorator_1 = require("./ValidationDecorator");
const CannotBeBlank_validation_1 = require("../Validations/CannotBeBlank.validation");
const CannotBeBlank = (label, required, language = 'en-US') => {
    return function (target, key) {
        (0, ValidationDecorator_1.ValidationDecorator)(label, required, (value, label) => {
            const result = (0, CannotBeBlank_validation_1.CannotBeBlank)(value, label, required, language);
            return result;
        })(target, key);
    };
};
exports.CannotBeBlank = CannotBeBlank;
