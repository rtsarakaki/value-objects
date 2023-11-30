"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailDomainWhiteList = void 0;
const Errors_1 = require("../Errors");
const ValidationsTools_1 = require("./ValidationsTools");
const EmailDomainWhiteList = (value, label, domains = [], required = true, language = 'en-US') => {
    function validateEmailDomainWhiteList(email, errorMessage) {
        try {
            const domain = email.split('@')[1];
            if (domains.length === 0 || domains.includes(domain)) {
                return null;
            }
            else {
                return new Errors_1.InvalidValue(errorMessage);
            }
        }
        catch (err) {
            console.log('error', err);
            return new Errors_1.InvalidValue(errorMessage);
        }
    }
    const replaceList = [{ tag: '${label}', value: label }];
    return (0, ValidationsTools_1.validationAcceleratorSuggestion)(validateEmailDomainWhiteList, value, label, required, "EmailDomainWhiteList", language, replaceList);
};
exports.EmailDomainWhiteList = EmailDomainWhiteList;
