"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertStringToNumber = exports.IsValidNumber = void 0;
const InvalidValue_error_1 = require("../Errors/InvalidValue.error");
const ValidationsTools_1 = require("./ValidationsTools");
const IsValidNumber = (value, label, required = true, language = 'en-US') => {
    const numberToString = value?.toString() ?? undefined;
    function validate(value, errorMessage) {
        const convertedToNumber = convertStringToNumber(value);
        if (convertedToNumber instanceof InvalidValue_error_1.InvalidValue)
            return new InvalidValue_error_1.InvalidValue(errorMessage, convertedToNumber);
        return null;
    }
    const replaceList = [{ tag: '${label}', value: label }];
    return (0, ValidationsTools_1.validationAcceleratorSuggestion)(validate, numberToString, label, required, "IsPositiveInteger", language, replaceList);
};
exports.IsValidNumber = IsValidNumber;
function convertStringToNumber(value) {
    const regexNumberValidation = /^\d+$/;
    if (value === null || value === undefined)
        return new InvalidValue_error_1.InvalidValue(`Value '${value}' is null or undefined`);
    const { integerPart, decimalPart, thousandSeparator, negativeSignal, error } = decomposeIntegerAndDecimalsParts(value);
    if (error)
        return new InvalidValue_error_1.InvalidValue(`Value '${value}' is not a valid number.`);
    if (!validateDecimalPart(decimalPart))
        return new InvalidValue_error_1.InvalidValue(`Value '${value}' is not a valid number.`);
    const validatedIntegerPart = validateIntegerPart(integerPart, thousandSeparator);
    if (validatedIntegerPart === null)
        return new InvalidValue_error_1.InvalidValue(`Value '${value}' is not a valid number.`);
    const sanitizedValue = `${negativeSignal ? '-' : ''}${validatedIntegerPart}.${decimalPart}`;
    const convertedToFloat = Number.parseFloat(sanitizedValue);
    if (convertedToFloat === -0)
        return 0;
    return convertedToFloat;
}
exports.convertStringToNumber = convertStringToNumber;
function validateIntegerPart(integerPart, thousandSeparator) {
    const regexNumberValidation = /^\d+$/;
    const arrayOfThousandParts = integerPart.split(thousandSeparator);
    if (arrayOfThousandParts.length <= 1) {
        const regexSingleIntegerPartResult = regexNumberValidation.test(integerPart);
        if (!regexSingleIntegerPartResult)
            return null;
    }
    else {
        const errorsInThousandParts = validateIntegerPartWhenHasThousandSeparator(arrayOfThousandParts, regexNumberValidation);
        if (errorsInThousandParts.length > 0)
            return null;
    }
    return arrayOfThousandParts.join('');
}
function validateIntegerPartWhenHasThousandSeparator(arrayOfThousandParts, regexNumberValidation) {
    return arrayOfThousandParts.filter((thousandPart, index) => {
        if (thousandPart.length < 3 && index !== 0)
            return true;
        if (thousandPart.length > 3)
            return true;
        const regexThousandPartResult = regexNumberValidation.test(thousandPart);
        if (!regexThousandPartResult)
            return true;
        return false;
    });
}
function validateDecimalPart(decimalPart) {
    const regexNumberValidation = /^\d+$/;
    if (decimalPart !== undefined) {
        const regexDecimalPartResult = regexNumberValidation.test(decimalPart);
        if (!regexDecimalPartResult)
            return false;
    }
    return true;
}
function decomposeIntegerAndDecimalsParts(value) {
    const timmedValue = value.toString().trim();
    const valueSignal = timmedValue[0];
    const hasSignal = valueSignal === '+' || valueSignal === '-';
    const negativeSignal = valueSignal === "-";
    const cleanedValue = hasSignal ? timmedValue.substring(1) : timmedValue;
    const firstCommaIndex = cleanedValue.indexOf(",");
    const firstDotIndex = cleanedValue.indexOf(".");
    const decimalSeparator = firstCommaIndex > firstDotIndex ? ',' : '.';
    const thousandSeparator = firstCommaIndex > firstDotIndex ? '.' : ',';
    const arrayDivideStringInIntegerPartAndDecimalPart = cleanedValue.split(decimalSeparator);
    const error = (arrayDivideStringInIntegerPartAndDecimalPart.length > 2);
    const decimalPart = arrayDivideStringInIntegerPartAndDecimalPart[1];
    const integerPart = arrayDivideStringInIntegerPartAndDecimalPart[0];
    return {
        integerPart: integerPart,
        decimalPart: decimalPart,
        firstDotIndex: firstDotIndex,
        decimalSeparator: decimalSeparator,
        thousandSeparator: thousandSeparator,
        negativeSignal: negativeSignal,
        error: error
    };
}
