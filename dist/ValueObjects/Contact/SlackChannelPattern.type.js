"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSlackChannelPattern = exports.SlackChannelPattern = void 0;
const Types_1 = require("../../Types");
const Validations_1 = require("../../Validations");
const IsValidSlackChannel_validation_1 = require("../../Validations/IsValidSlackChannel.validation");
class SlackChannelPattern extends Types_1.GenericType {
    constructor(value, label = null, required = true, language = 'en-US', ...customValidators) {
        super(value);
        const msg = label ?? 'Email';
        const valueWithHashtag = value.startsWith('#') ? value : `#${value}`;
        const defaultValidators = [
            () => (0, Validations_1.CannotBeBlank)(value, msg, required, language),
            () => (0, Validations_1.MustHaveAtLeastXCharacters)(value, msg, 1, required, language),
            () => (0, Validations_1.CannotHaveMoreThanXCharacters)(value, msg, 80, required, language),
            () => (0, Validations_1.MustHaveOnlyOneWord)(value, msg, required, language),
            () => (0, IsValidSlackChannel_validation_1.IsValidSlackChannel)(valueWithHashtag, msg, required, language),
        ];
        const validators = customValidators.length > 0 ? [...defaultValidators, ...customValidators] : defaultValidators;
        this.validate(validators);
        if (this.errors.length === 0) {
            this.value = valueWithHashtag;
        }
    }
}
exports.SlackChannelPattern = SlackChannelPattern;
function createSlackChannelPattern(value, label = null, required = true, language = 'en-US', ...customValidators) {
    return new SlackChannelPattern(value, label, required, language, ...customValidators);
}
exports.createSlackChannelPattern = createSlackChannelPattern;
