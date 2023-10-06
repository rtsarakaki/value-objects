"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createShortDescription = exports.ShortDescription = void 0;
const Types_1 = require("../../Types");
const CannotBeBlank_validation_1 = require("../../Validations/CannotBeBlank.validation");
const CannotHaveMoreThanXCharacters_validation_1 = require("../../Validations/CannotHaveMoreThanXCharacters.validation");
const MustHaveAtLeastXCharacters_validation_1 = require("../../Validations/MustHaveAtLeastXCharacters.validation");
class ShortDescription extends Types_1.GenericType {
    constructor(value, label, required = true, language = 'en-US', ...customValidators) {
        const msg = label ?? 'Short Description';
        super(value);
        const defaultValidators = [
            () => (0, CannotBeBlank_validation_1.CannotBeBlank)(value, msg, required, language),
            () => (0, MustHaveAtLeastXCharacters_validation_1.MustHaveAtLeastXCharacters)(value, msg, 2, required, language),
            () => (0, CannotHaveMoreThanXCharacters_validation_1.CannotHaveMoreThanXCharacters)(value, msg, 120, required, language),
        ];
        const validators = customValidators.length > 0 ? [...defaultValidators, ...customValidators] : defaultValidators;
        this.validate(validators);
        if (this.errors.length === 0) {
            this.value = value.trim();
        }
    }
}
exports.ShortDescription = ShortDescription;
function createShortDescription(value, label, required = true, language = 'en-US', ...customValidators) {
    return new ShortDescription(value, label, required, language, ...customValidators);
}
exports.createShortDescription = createShortDescription;
