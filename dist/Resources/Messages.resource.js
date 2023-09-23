"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLanguage = exports.getResourceMessageByKey = void 0;
const Messages_resources_json_1 = __importDefault(require("./Messages.resources.json"));
const Replacer_resource_1 = require("./Replacer.resource");
function getResourceMessageByKey(key, language, replaces) {
    const defaultLanguage = getLanguage(language);
    const validation = getValidationByKey(key);
    const message = getMessageByLanguage(validation, defaultLanguage);
    if (message === null) {
        throw new Error(`Message not found for key: ${key} and language: ${defaultLanguage}`);
    }
    const messageReplaced = replaces ? (0, Replacer_resource_1.replaceTagsInMessage)(message, replaces) : message;
    return messageReplaced;
}
exports.getResourceMessageByKey = getResourceMessageByKey;
function getLanguage(language) {
    const result = (language === undefined) ? Messages_resources_json_1.default.defaultLanguage : language;
    if (typeof result === 'string') {
        return result;
    }
    return 'en-US';
}
exports.getLanguage = getLanguage;
function getValidationByKey(key) {
    const validations = Messages_resources_json_1.default.validations.filter((validation) => {
        return validation.key === key;
    });
    return validations[0];
}
function getMessageByLanguage(validation, language) {
    if (validation === undefined) {
        return null;
    }
    const message = validation.messages.filter((message) => {
        return message.language === language;
    });
    if (message.length === 0) {
        return null;
    }
    return message[0].message;
}
