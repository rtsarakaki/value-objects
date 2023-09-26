"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsValidDate = void 0;
const InvalidValue_error_1 = require("../Errors/InvalidValue.error");
const Messages_resource_1 = require("../Resources/Messages.resource");
const ValidationsTools_1 = require("./ValidationsTools");
const IsValidDate = (value, label, language = 'en-US') => {
    const labelValidation = (0, ValidationsTools_1.validateLabel)(label);
    if (labelValidation !== null)
        return labelValidation;
    const replaceList = [
        { tag: '${label}', value: label },
    ];
    const errorMessage = (0, Messages_resource_1.getResourceMessageByKey)("IsValidColor", language, replaceList);
    function colorValidation(date) {
        try {
            if (typeof date !== 'string')
                return false;
            const dateObj = new Date(date.trim());
            const isValid = dateObj.toString() !== 'Invalid Date';
            console.log('isValid', isValid);
            return isValid;
        }
        catch (err) {
            console.log('houve erro', err);
            return false;
        }
    }
    return !colorValidation(value) ? new InvalidValue_error_1.InvalidValue(errorMessage) : null;
};
exports.IsValidDate = IsValidDate;
