"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createEmail = exports.Email = void 0;
const Types_1 = require("../../Types");
const Validations_1 = require("../../Validations");
class Email extends Types_1.GenericType {
    constructor(value, label = null, required = true, language = 'en-US', ...customValidators) {
        super(value);
        const msg = label ?? 'Email';
        const defaultValidators = [
            () => (0, Validations_1.CannotBeBlank)(value, msg, required, language),
            () => (0, Validations_1.MustHaveAtLeastXCharacters)(value, msg, 5, required, language),
            () => (0, Validations_1.CannotHaveMoreThanXCharacters)(value, msg, 80, required, language),
            () => (0, Validations_1.MustHaveOnlyOneWord)(value, msg, required, language),
            () => (0, Validations_1.IsValidEmail)(value, msg, required, language),
        ];
        const validators = customValidators.length > 0 ? [...defaultValidators, ...customValidators] : defaultValidators;
        this.validate(validators);
    }
}
exports.Email = Email;
function createEmail(value, label = null, required = true, language = 'en-US', ...customValidators) {
    return new Email(value, label, required, language, ...customValidators);
}
exports.createEmail = createEmail;
