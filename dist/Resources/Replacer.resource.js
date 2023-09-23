"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.replaceTagsInMessage = void 0;
const InvalidValue_error_1 = require("../Errors/InvalidValue.error");
const Messages_resource_1 = require("./Messages.resource");
function replaceTagsInMessage(message, tagList) {
    try {
        const messageReplaced = tagList.reduce((result, tag) => { return result.replace(tag.tag, tag.value); }, message);
        return messageReplaced;
    }
    catch (e) {
        const errorMessage = (0, Messages_resource_1.getResourceMessageByKey)(replaceTagsInMessage.name);
        throw new InvalidValue_error_1.InvalidValue(errorMessage);
    }
}
exports.replaceTagsInMessage = replaceTagsInMessage;
