"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSlackChannelPattern = exports.SlackChannelPattern = void 0;
const Hashtag_type_1 = require("../Digital/Hashtag.type");
class SlackChannelPattern extends Hashtag_type_1.Hashtag {
    constructor(value, label = null, required = true, language = 'en-US', ...customValidators) {
        super(value, label, required, language, ...customValidators);
    }
}
exports.SlackChannelPattern = SlackChannelPattern;
function createSlackChannelPattern(value, label = null, required = true, language = 'en-US', ...customValidators) {
    return new SlackChannelPattern(value, label, required, language, ...customValidators);
}
exports.createSlackChannelPattern = createSlackChannelPattern;
