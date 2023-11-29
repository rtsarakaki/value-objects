"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createHashtag = exports.Hashtag = void 0;
const Types_1 = require("../../Types");
const Validations_1 = require("../../Validations");
const IsValidHashtag_validation_1 = require("../../Validations/IsValidHashtag.validation");
class Hashtag extends Types_1.GenericType {
    constructor(value, label = null, required = true, language = 'en-US', ...customValidators) {
        super(value);
        const msg = label ?? 'Email';
        const valueWithHashtag = value.startsWith('#') ? value : `#${value}`;
        const defaultValidators = [
            () => (0, Validations_1.CannotBeBlank)(value, msg, required, language),
            () => (0, Validations_1.MustHaveAtLeastXCharacters)(value, msg, 1, required, language),
            () => (0, Validations_1.CannotHaveMoreThanXCharacters)(value, msg, 80, required, language),
            () => (0, Validations_1.MustHaveOnlyOneWord)(value, msg, required, language),
            () => (0, IsValidHashtag_validation_1.IsValidHashtag)(valueWithHashtag, msg, required, language),
        ];
        const validators = customValidators.length > 0 ? [...defaultValidators, ...customValidators] : defaultValidators;
        this.validate(validators);
        if (this.errors.length === 0) {
            this.value = valueWithHashtag;
        }
    }
}
exports.Hashtag = Hashtag;
function createHashtag(value, label = null, required = true, language = 'en-US', ...customValidators) {
    return new Hashtag(value, label, required, language, ...customValidators);
}
exports.createHashtag = createHashtag;
