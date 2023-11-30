"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSingleWord = exports.SingleWord = void 0;
const Types_1 = require("../../Types");
const Validations_1 = require("../../Validations");
const CannotHaveMoreThanXCharacters_validation_1 = require("../../Validations/CannotHaveMoreThanXCharacters.validation");
const MustHaveOnlyOneWord_validation_1 = require("../../Validations/MustHaveOnlyOneWord.validation");
class SingleWord extends Types_1.GenericType {
    constructor(value, label = null, required = true, language = 'en-US', ...customValidators) {
        const msg = label ?? 'One Word';
        super(value);
        const defaultValidators = [
            () => (0, Validations_1.CannotBeBlank)(value, msg, required, language),
            () => (0, Validations_1.MustHaveAtLeastXLetters)(value, msg, 3, required, language),
            () => (0, CannotHaveMoreThanXCharacters_validation_1.CannotHaveMoreThanXCharacters)(value, msg, 50, required, language),
            () => (0, MustHaveOnlyOneWord_validation_1.MustHaveOnlyOneWord)(value, msg, required, language),
        ];
        const validators = customValidators.length > 0 ? [...defaultValidators, ...customValidators] : defaultValidators;
        this.validate(validators);
        if (this.errors.length === 0) {
            this.value = value?.trim().toLowerCase();
        }
    }
}
exports.SingleWord = SingleWord;
function createSingleWord(value, label = null, required = true, language = 'en-US', ...customValidators) {
    return new SingleWord(value, label, required, language, ...customValidators);
}
exports.createSingleWord = createSingleWord;
