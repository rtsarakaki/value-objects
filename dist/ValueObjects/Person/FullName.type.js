"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatFullName = exports.createFullName = exports.FullName = void 0;
const Types_1 = require("../../Types");
const Validations_1 = require("../../Validations");
const CannotBeBlank_validation_1 = require("../../Validations/CannotBeBlank.validation");
const CannotHaveMoreThanXCharacters_validation_1 = require("../../Validations/CannotHaveMoreThanXCharacters.validation");
const CannotRepeatCharInSequenceFourTimes_validation_1 = require("../../Validations/CannotRepeatCharInSequenceFourTimes.validation");
class FullName extends Types_1.GenericType {
    constructor(name, label, required = true, language = 'en-US', ...customValidators) {
        const msg = label ?? 'Name';
        super(name);
        if (name !== undefined) {
            const formatedName = (0, exports.formatFullName)(name);
            const defaultValidators = [
                () => (0, CannotBeBlank_validation_1.CannotBeBlank)(formatedName, msg, required, language),
                () => (0, Validations_1.MustHaveAtLeastXLetters)(formatedName, msg, 2, required, language),
                () => (0, CannotHaveMoreThanXCharacters_validation_1.CannotHaveMoreThanXCharacters)(formatedName, msg, 50, required, language),
                () => (0, CannotRepeatCharInSequenceFourTimes_validation_1.CannotRepeatCharInSequenceFourTimes)(formatedName, msg, required, language),
            ];
            const validators = customValidators.length > 0 ? [...defaultValidators, ...customValidators] : defaultValidators;
            this.validate(validators);
            this.value = formatedName;
        }
    }
    get _nameParts() {
        return this.value?.split(' ') ?? [];
    }
    get firstName() {
        if (this._nameParts.length === 0)
            return '';
        return this._nameParts[0];
    }
    get lastName() {
        if (this._nameParts.length <= 1)
            return '';
        return this._nameParts.at(-1) ?? '';
    }
    get middleName() {
        if (this._nameParts.length < 3)
            return '';
        return this._nameParts.slice(1, this._nameParts.length - 1).join(' ') ?? '';
    }
    get abbreviatedName() {
        if (this._nameParts.length < 3)
            return this.value ?? '';
        const middleInitials = this._nameParts.slice(1, this._nameParts.length - 1).map(name => `${name.charAt(0)}.`).join(' ');
        return `${this.firstName} ${middleInitials} ${this.lastName}`;
    }
    get cardName() {
        return this.abbreviatedName.toUpperCase();
    }
}
exports.FullName = FullName;
function createFullName(name, label, required = true) {
    return new FullName(name, label, required);
}
exports.createFullName = createFullName;
const removeSpecialCharacters = (str) => str.replace(/[^\w\sÀ-ú]/gi, '');
const removeNumbers = (str) => str.replace(/\d+/g, '');
const capitalizeFirstLetter = (str) => str.toLowerCase().replace(/(?:^|\s)\S/g, (capitalize) => capitalize.toUpperCase());
const replacePrepositions = (str) => {
    const prepositions = {
        'Da': 'da',
        'Do': 'do',
        'Das': 'das',
        'Dos': 'dos',
        'A': 'a',
        'E': 'e',
        'De': 'de',
        'La': 'la'
    };
    return str.split(' ').map(word => prepositions[word] || word).join(' ');
};
const removeExtraSpaces = (str) => str.trim().replace(/\s+/g, ' ');
const formatFullName = (fullName) => {
    return removeExtraSpaces(replacePrepositions(capitalizeFirstLetter(removeNumbers(removeSpecialCharacters(fullName)))));
};
exports.formatFullName = formatFullName;
