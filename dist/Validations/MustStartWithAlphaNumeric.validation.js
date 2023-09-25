"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MustStartWithAlphaNumeric = void 0;
const Errors_1 = require("../Errors");
const Messages_resource_1 = require("../Resources/Messages.resource");
const ValidationsTools_1 = require("./ValidationsTools");
const MustStartWithAlphaNumeric = (value, label, language = 'en-US') => {
    const labelValidation = (0, ValidationsTools_1.validateLabel)(label);
    if (labelValidation !== null)
        return labelValidation;
    const replaceList = [
        { tag: '${label}', value: label },
    ];
    const errorMessage = (0, Messages_resource_1.getResourceMessageByKey)("MustStartWithAlphaNumeric", language, replaceList);
    if (value === undefined || value === null || typeof value !== 'string') {
        return new Errors_1.InvalidValue(errorMessage);
    }
    const trimmedValue = value.trim();
    if (trimmedValue.length === 0) {
        return new Errors_1.InvalidValue(errorMessage);
    }
    const firstChar = trimmedValue[0];
    if (!firstChar.match(/^[a-zA-Z0-9]+$/)) {
        return new Errors_1.InvalidValue(errorMessage);
    }
    return null;
};
exports.MustStartWithAlphaNumeric = MustStartWithAlphaNumeric;
