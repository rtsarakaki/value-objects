"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateLabel = void 0;
const InvalidValue_error_1 = __importDefault(require("../Errors/InvalidValue.error"));
const Messages_resource_1 = require("../Resources/Messages.resource");
function validateLabel(value, language = 'en-US') {
    const errorMessage = (0, Messages_resource_1.getResourceMessageByKey)(validateLabel.name, language);
    if (typeof value !== 'string')
        return new InvalidValue_error_1.default(errorMessage);
    if (value.trim() === '')
        return new InvalidValue_error_1.default(errorMessage);
    return null;
}
exports.validateLabel = validateLabel;
