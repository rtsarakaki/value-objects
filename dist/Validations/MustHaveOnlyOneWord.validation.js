"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MustHaveOnlyOneWord = void 0;
const Errors_1 = require("../Errors");
const Messages_resource_1 = require("../Resources/Messages.resource");
const ValidationsTools_1 = require("./ValidationsTools");
const MustHaveOnlyOneWord = (value, label, language = 'en-US') => {
    const labelValidation = (0, ValidationsTools_1.validateLabel)(label);
    if (labelValidation !== null)
        return labelValidation;
    const replaceList = [
        { tag: '${label}', value: label },
    ];
    const errorMessage = (0, Messages_resource_1.getResourceMessageByKey)("MustHaveOnlyOneWord", language, replaceList);
    try {
        const haveSpace = value?.trim().indexOf(' ') != -1;
        const haveTab = value?.trim().indexOf('	') != -1;
        const haveReturn = value?.trim().indexOf(`
		`) != -1;
        return (haveSpace || haveReturn || haveTab) ? new Errors_1.InvalidValue(errorMessage) : null;
    }
    catch (e) {
        return new Errors_1.InvalidValue(errorMessage);
    }
};
exports.MustHaveOnlyOneWord = MustHaveOnlyOneWord;
