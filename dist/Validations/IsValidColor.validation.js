"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsValidColor = void 0;
const validate_color_1 = __importDefault(require("validate-color"));
const InvalidValue_error_1 = require("../Errors/InvalidValue.error");
const ValidationsTools_1 = require("./ValidationsTools");
const IsValidColor = (value, label, language = 'en-US') => {
    function colorValidation(color, errorMessage) {
        try {
            if (typeof color !== 'string')
                return new InvalidValue_error_1.InvalidValue(errorMessage);
            return (0, validate_color_1.default)(color.trim()) ? null : new InvalidValue_error_1.InvalidValue(errorMessage);
        }
        catch (err) {
            return new InvalidValue_error_1.InvalidValue(errorMessage);
        }
    }
    const replaceList = [{ tag: '${label}', value: label }];
    return (0, ValidationsTools_1.validationAcceleratorSuggestion)(colorValidation, value, label, "IsValidColor", language, replaceList);
};
exports.IsValidColor = IsValidColor;
