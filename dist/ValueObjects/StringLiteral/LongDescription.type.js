"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createLongDescription = exports.LongDescription = void 0;
const Types_1 = require("../../Types");
const Validations_1 = require("../../Validations");
const CannotBeBlank_validation_1 = require("../../Validations/CannotBeBlank.validation");
class LongDescription extends Types_1.GenericType {
    constructor(value, label, required = true, language = "en-US", ...customValidators) {
        const msg = label ?? "Long Description";
        super(value);
        const defaultValidators = [
            () => (0, CannotBeBlank_validation_1.CannotBeBlank)(value, msg, required, language),
            () => (0, Validations_1.MustHaveAtLeastXLetters)(value, msg, 5, required, language),
        ];
        const validators = customValidators.length > 0
            ? [...defaultValidators, ...customValidators]
            : defaultValidators;
        this.validate(validators);
        if (this.errors.length === 0) {
            this.value = value.trim();
        }
    }
}
exports.LongDescription = LongDescription;
function createLongDescription(value, label, required = true, language = "en-US", ...customValidators) {
    return new LongDescription(value, label, required, language, ...customValidators);
}
exports.createLongDescription = createLongDescription;
