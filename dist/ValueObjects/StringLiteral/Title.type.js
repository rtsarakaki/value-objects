"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.capitalizeText = exports.createTitle = exports.Title = void 0;
const Types_1 = require("../../Types");
const Validations_1 = require("../../Validations");
const CannotHaveMoreThanXCharacters_validation_1 = require("../../Validations/CannotHaveMoreThanXCharacters.validation");
const CannotRepeatCharInSequenceFourTimes_validation_1 = require("../../Validations/CannotRepeatCharInSequenceFourTimes.validation");
class Title extends Types_1.GenericType {
    constructor(value, label, required = true, language = "en-US", ...customValidators) {
        const msg = label ?? "Title";
        super(value);
        const cleanedValue = value.trim();
        const defaultValidators = [
            () => (0, Validations_1.CannotBeBlank)(cleanedValue, msg, required, language),
            () => (0, Validations_1.MustHaveAtLeastXLetters)(cleanedValue, msg, 3, required, language),
            () => (0, CannotHaveMoreThanXCharacters_validation_1.CannotHaveMoreThanXCharacters)(cleanedValue, msg, 50, required, language),
            () => (0, CannotRepeatCharInSequenceFourTimes_validation_1.CannotRepeatCharInSequenceFourTimes)(cleanedValue, msg, required, language),
        ];
        const validators = customValidators.length > 0
            ? [...defaultValidators, ...customValidators]
            : defaultValidators;
        this.validate(validators);
        this.value = capitalizeText(cleanedValue);
    }
}
exports.Title = Title;
function createTitle(value, label, required = true, language = "en-US", ...customValidators) {
    return new Title(value, label, required, language, ...customValidators);
}
exports.createTitle = createTitle;
function capitalizeText(value) {
    value = value.trim();
    value = value.toLowerCase().replace(/(?:^|\s)\S/g, function (capitalize) {
        return capitalize.toUpperCase();
    });
    var arrayOfPrepositionsWithFirstLetterCapitalized = [
        "Da",
        "Do",
        "Das",
        "Dos",
        "A",
        "E",
        "De",
        "La",
        "And",
        "Of",
    ];
    var arrayOfPrepositionsWithFirstLetterLowerCase = [
        "da",
        "do",
        "das",
        "dos",
        "a",
        "e",
        "de",
        "la",
        "and",
        "of",
    ];
    for (var i = arrayOfPrepositionsWithFirstLetterCapitalized.length - 1; i >= 0; i--) {
        value = value.replace(RegExp("\\b" +
            arrayOfPrepositionsWithFirstLetterCapitalized[i].replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&") +
            "\\b", "g"), arrayOfPrepositionsWithFirstLetterLowerCase[i]);
    }
    let parts = value.split(" ");
    value = "";
    for (i = 0; i < parts.length; i++) {
        if (parts[i].trim().length > 0) {
            value = value + parts[i] + " ";
        }
    }
    return value.trim();
}
exports.capitalizeText = capitalizeText;
