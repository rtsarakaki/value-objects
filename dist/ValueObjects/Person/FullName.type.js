"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatFullName = exports.createFullName = exports.FullName = void 0;
const Types_1 = require("../../Types");
const CannotBeBlank_validation_1 = require("../../Validations/CannotBeBlank.validation");
const CannotHaveMoreThanXCharacters_validation_1 = require("../../Validations/CannotHaveMoreThanXCharacters.validation");
const MustHaveAtLeastXCharacters_validation_1 = require("../../Validations/MustHaveAtLeastXCharacters.validation");
class FullName extends Types_1.GenericType {
    constructor(name, label, required = true) {
        const msg = label ?? 'Name';
        super(name);
        if (name !== undefined) {
            const formatedName = formatFullName(name);
            this.validate([
                () => (0, CannotBeBlank_validation_1.CannotBeBlank)(formatedName, msg, required),
                () => (0, MustHaveAtLeastXCharacters_validation_1.MustHaveAtLeastXCharacters)(formatedName, msg, 2),
                () => (0, CannotHaveMoreThanXCharacters_validation_1.CannotHaveMoreThanXCharacters)(formatedName, msg, 50),
            ]);
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
}
exports.FullName = FullName;
function createFullName(name, label, required = true) {
    return new FullName(name, label, required);
}
exports.createFullName = createFullName;
function formatFullName(fullName) {
    fullName = fullName.trim();
    fullName = fullName.replace(/[^\w\sÀ-ú]/gi, '');
    fullName = fullName.replace(/\d+/g, '');
    fullName = fullName.toLowerCase().replace(/(?:^|\s)\S/g, function (capitalize) {
        return capitalize.toUpperCase();
    });
    var arrayOfPrepositionsWithFirstLetterCapitalized = ['Da', 'Do', 'Das', 'Dos', 'A', 'E', 'De', 'La'];
    var arrayOfPrepositionsWithFirstLetterLowerCase = ['da', 'do', 'das', 'dos', 'a', 'e', 'de', 'la'];
    for (var i = arrayOfPrepositionsWithFirstLetterCapitalized.length - 1; i >= 0; i--) {
        fullName = fullName.replace(RegExp('\\b' + arrayOfPrepositionsWithFirstLetterCapitalized[i].replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&') + '\\b', 'g'), arrayOfPrepositionsWithFirstLetterLowerCase[i]);
    }
    let parts = fullName.split(' ');
    fullName = '';
    for (i = 0; i < parts.length; i++) {
        if (parts[i].trim().length > 0) {
            fullName = fullName + parts[i] + ' ';
        }
    }
    return fullName.trim();
}
exports.formatFullName = formatFullName;
