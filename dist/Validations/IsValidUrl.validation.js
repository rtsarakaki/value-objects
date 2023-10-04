"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateProtocol = exports.isMailToFormat = exports.isDataFormat = exports.isFilePathFormat = exports.IsValidUrl = void 0;
const InvalidValue_error_1 = require("../Errors/InvalidValue.error");
const ValidationsTools_1 = require("./ValidationsTools");
const IsValidUrl = (value, label, required = true, language = 'en-US') => {
    function validateUrl(url) {
        const protocolRegex = /^((http|https|ftp|sftp|file|data|mailto):\/\/).*/;
        const protocolMatch = url.match(protocolRegex);
        if (protocolMatch) {
            const protocol = protocolMatch[1];
            const validateProtocolResult = validateProtocol(protocol, url);
            return validateProtocolResult;
        }
        try {
            new URL(url);
            return null;
        }
        catch (error) {
            return new InvalidValue_error_1.InvalidValue('Invalid URL.');
        }
    }
    const replaceList = [{ tag: '${label}', value: label }];
    return (0, ValidationsTools_1.validationAcceleratorSuggestion)(validateUrl, value, label, required, "IsValidUrl", language, replaceList);
};
exports.IsValidUrl = IsValidUrl;
function isFilePathFormat(url) {
    const regex = /^([a-zA-Z]:)?[\\/]?([^\\/:\*\?"<>\|]+[\\/])*([^\\/:\*\?"<>\|]+)?$/;
    return regex.test(url);
}
exports.isFilePathFormat = isFilePathFormat;
function isDataFormat(url) {
    const regex = /^data:/;
    return regex.test(url);
}
exports.isDataFormat = isDataFormat;
function isMailToFormat(url) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(url);
}
exports.isMailToFormat = isMailToFormat;
function validateProtocol(protocol, url) {
    const protocolValidations = [
        {
            protocol: 'http://',
            regex: /^(https?|http):\/\/([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+(\.[a-zA-Z]{2,})?(:\d+)?([\/?#][^"\s<>]*[^\s"<>\/\/])?\/?$/,
            errorMessage: 'Incorrect URL http protocol format.',
        },
        {
            protocol: 'https://',
            regex: /^(https?|http):\/\/([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+(\.[a-zA-Z]{2,})?(:\d+)?([\/?#][^"\s<>]*[^\s"<>\/\/])?\/?$/,
            errorMessage: 'Incorrect URL https protocol format.',
        },
        {
            protocol: 'ftp://',
            regex: /^ftp:\/\/([a-zA-Z0-9-]+(:[^:@\s]+)?@)?(ftp\.[a-zA-Z0-9-]+(\.[a-zA-Z]{2,})?(:\d+)?|([a-zA-Z0-9-]+(\.[a-zA-Z]{2,})?(:\d+)?))(\/[^\s]*)?$/,
            errorMessage: 'Incorrect URL ftp protocol format.',
        },
        {
            protocol: 'sftp://',
            regex: /^sftp:\/\/([a-zA-Z0-9-]+(:[^:@\s]+)?@)?(sftp\.[a-zA-Z0-9-]+(\.[a-zA-Z]{2,})?(:\d+)?|([a-zA-Z0-9-]+(\.[a-zA-Z]{2,})?(:\d+)?))(\/[^\s]*)?$/,
            errorMessage: 'Incorrect URL sftp protocol format.',
        },
        {
            protocol: 'mailto:',
            regex: /^mailto:([^\s@]+@[^\s@]+\.[^\s@]+)(\?[^?]+)?$/,
            errorMessage: 'Incorrect URL mailto protocol format.',
        },
        {
            protocol: 'file:///',
            regex: /^file:\/\/([a-zA-Z]:)?[\\/]?([^\\/:\*\?"<>\|]+[\\/])*([^\\/:\*\?"<>\|]+)?$/,
            errorMessage: 'Incorrect URL file protocol format.',
        },
        {
            protocol: 'data:',
            regex: /^data:[^,;]+(,[^,;]+)*$/,
            errorMessage: 'Incorrect URL data protocol format.',
        },
    ];
    const validation = protocolValidations.find((pv) => pv.protocol === protocol);
    console.log('validation', validation, protocol);
    if (validation === undefined)
        return null;
    const validationResult = validation.regex.test(url);
    console.log('validationResult', validationResult);
    return validationResult ? null : new InvalidValue_error_1.InvalidValue(validation.errorMessage);
}
exports.validateProtocol = validateProtocol;
