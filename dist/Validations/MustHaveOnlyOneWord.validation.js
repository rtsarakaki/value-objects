"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MustHaveOnlyOneWord = void 0;
const InvalidValue_error_1 = __importDefault(require("../Errors/InvalidValue.error"));
const Messages_resource_1 = require("../Resources/Messages.resource");
const ValidationsTools_1 = require("./ValidationsTools");
const MustHaveOnlyOneWord = (value, label, language = 'en-US') => {
    const labelValidation = (0, ValidationsTools_1.validateLabel)(label);
    if (labelValidation !== null)
        return labelValidation;
    const replaceList = [
        { tag: '${label}', value: label },
    ];
    const errorMessage = (0, Messages_resource_1.getResourceMessageByKey)(exports.MustHaveOnlyOneWord.name, language, replaceList);
    try {
        const haveSpace = value?.trim().indexOf(' ') != -1;
        const haveTab = value?.trim().indexOf('	') != -1;
        const haveReturn = value?.trim().indexOf(`
		`) != -1;
        return (haveSpace || haveReturn || haveTab) ? new InvalidValue_error_1.default(errorMessage) : null;
    }
    catch (e) {
        return new InvalidValue_error_1.default(errorMessage);
    }
};
exports.MustHaveOnlyOneWord = MustHaveOnlyOneWord;
