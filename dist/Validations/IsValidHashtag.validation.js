"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsValidHashtag = void 0;
const InvalidValue_error_1 = require("../Errors/InvalidValue.error");
const ValidationsTools_1 = require("./ValidationsTools");
const IsValidHashtag = (value, label, required = true, language = 'en-US') => {
    function validateSlackChannel(channel, errorMessage) {
        try {
            if (typeof channel !== 'string')
                return new InvalidValue_error_1.InvalidValue(errorMessage);
            if (!/^#[a-z0-9_.-]+$/i.test(channel))
                return new InvalidValue_error_1.InvalidValue(errorMessage);
            if (channel.endsWith('-') || channel.endsWith('_'))
                return new InvalidValue_error_1.InvalidValue(errorMessage);
            return null;
        }
        catch (err) {
            return new InvalidValue_error_1.InvalidValue(errorMessage);
        }
    }
    const replaceList = [{ tag: '${label}', value: label }];
    return (0, ValidationsTools_1.validationAcceleratorSuggestion)(validateSlackChannel, value, label, required, "IsValidSlackChannel", language, replaceList);
};
exports.IsValidHashtag = IsValidHashtag;
