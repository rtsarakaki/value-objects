"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.capitalizeText = exports.createTitle = exports.Title = void 0;
const GenericType_type_1 = __importDefault(require("../../Types/RootTypes/GenericType.type"));
const CannotBeBlank_validation_1 = require("../../Validations/CannotBeBlank.validation");
const CannotHaveMoreThanXCharacters_validation_1 = require("../../Validations/CannotHaveMoreThanXCharacters.validation");
const MustHaveAtLeastXCharacters_validation_1 = require("../../Validations/MustHaveAtLeastXCharacters.validation");
class Title extends GenericType_type_1.default {
    constructor(value, label) {
        const msg = label ?? 'Title';
        super(value);
        this.validate([
            () => (0, CannotBeBlank_validation_1.CannotBeBlank)(value, msg),
            () => (0, MustHaveAtLeastXCharacters_validation_1.MustHaveAtLeastXCharacters)(value, msg, 2),
            () => (0, CannotHaveMoreThanXCharacters_validation_1.CannotHaveMoreThanXCharacters)(value, msg, 50),
        ]);
        if (this.errors.length === 0) {
            this.value = capitalizeText(value.trim());
            ;
        }
    }
}
exports.Title = Title;
function createTitle(value, label) {
    return new Title(value, label);
}
exports.createTitle = createTitle;
function capitalizeText(value) {
    value = value.trim();
    value = value.toLowerCase().replace(/(?:^|\s)\S/g, function (capitalize) {
        return capitalize.toUpperCase();
    });
    var arrayOfPrepositionsWithFirstLetterCapitalized = ['Da', 'Do', 'Das', 'Dos', 'A', 'E', 'De', 'La', 'And', 'Of'];
    var arrayOfPrepositionsWithFirstLetterLowerCase = ['da', 'do', 'das', 'dos', 'a', 'e', 'de', 'la', 'and', 'of'];
    for (var i = arrayOfPrepositionsWithFirstLetterCapitalized.length - 1; i >= 0; i--) {
        value = value.replace(RegExp('\\b' + arrayOfPrepositionsWithFirstLetterCapitalized[i].replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&') + '\\b', 'g'), arrayOfPrepositionsWithFirstLetterLowerCase[i]);
    }
    let parts = value.split(' ');
    value = '';
    for (i = 0; i < parts.length; i++) {
        if (parts[i].trim().length > 0) {
            value = value + parts[i] + ' ';
        }
    }
    return value.trim();
}
exports.capitalizeText = capitalizeText;
