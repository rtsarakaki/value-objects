"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CannotHaveMoreThanXCharacters = void 0;
const Errors_1 = require("../Errors");
const Messages_resource_1 = require("../Resources/Messages.resource");
const ValidationsTools_1 = require("./ValidationsTools");
const CannotHaveMoreThanXCharacters = (value, label, charactersNumber, language = 'en-US') => {
    const labelValidation = (0, ValidationsTools_1.validateLabel)(label);
    if (labelValidation !== null)
        return labelValidation;
    const replaceList = [
        { tag: '${label}', value: label },
        { tag: '${charactersNumber}', value: charactersNumber.toString() }
    ];
    const errorMessage = (0, Messages_resource_1.getResourceMessageByKey)("CannotHaveMoreThanXCharacters", language, replaceList);
    try {
        if (typeof value !== 'string')
            throw new Errors_1.InvalidValue(errorMessage);
        return value?.trim().length > charactersNumber ? new Errors_1.InvalidValue(errorMessage) : null;
    }
    catch (e) {
        return new Errors_1.InvalidValue(errorMessage);
    }
};
exports.CannotHaveMoreThanXCharacters = CannotHaveMoreThanXCharacters;
