"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsValidColor = void 0;
const InvalidValue_error_1 = require("../Errors/InvalidValue.error");
const ValidationsTools_1 = require("./ValidationsTools");
const Messages_resource_1 = require("../Resources/Messages.resource");
const IsValidColor = (value, label, language = 'en-US') => {
    const labelValidation = (0, ValidationsTools_1.validateLabel)(label);
    if (labelValidation !== null)
        return labelValidation;
    const replaceList = [
        { tag: '${label}', value: label },
    ];
    const errorMessage = (0, Messages_resource_1.getResourceMessageByKey)(exports.IsValidColor.name, language, replaceList);
    function colorValidation(color) {
        try {
            if (typeof color !== 'string')
                throw new InvalidValue_error_1.InvalidValue(errorMessage);
            return false;
        }
        catch (err) {
            return false;
        }
    }
    return !colorValidation(value) ? new InvalidValue_error_1.InvalidValue(errorMessage) : null;
};
exports.IsValidColor = IsValidColor;
