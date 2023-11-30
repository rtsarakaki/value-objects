"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailDomainBlackList = void 0;
const Errors_1 = require("../Errors");
const ValidationsTools_1 = require("./ValidationsTools");
const EmailDomainBlackList = (value, label, domains = [], required = true, language = 'en-US') => {
    function validateEmailDomainBlackList(email, errorMessage) {
        try {
            const domain = email.split('@')[1];
            if (domains.length === 0 || !domains.includes(domain)) {
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
    return (0, ValidationsTools_1.validationAcceleratorSuggestion)(validateEmailDomainBlackList, value, label, required, "EmailDomainBlackList", language, replaceList);
};
exports.EmailDomainBlackList = EmailDomainBlackList;
