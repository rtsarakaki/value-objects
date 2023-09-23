"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateLabel = void 0;
const Errors_1 = require("../Errors");
const Messages_resource_1 = require("../Resources/Messages.resource");
function validateLabel(value, language = 'en-US') {
    const errorMessage = (0, Messages_resource_1.getResourceMessageByKey)(validateLabel.name, language);
    if (typeof value !== 'string')
        return new Errors_1.InvalidValue(errorMessage);
    if (value.trim() === '')
        return new Errors_1.InvalidValue(errorMessage);
    return null;
}
exports.validateLabel = validateLabel;
