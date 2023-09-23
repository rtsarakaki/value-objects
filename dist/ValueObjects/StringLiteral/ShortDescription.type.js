"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createShortDescription = exports.ShortDescription = void 0;
const Types_1 = require("../../Types");
const CannotBeBlank_validation_1 = require("../../Validations/CannotBeBlank.validation");
const CannotHaveMoreThanXCharacters_validation_1 = require("../../Validations/CannotHaveMoreThanXCharacters.validation");
const MustHaveAtLeastXCharacters_validation_1 = require("../../Validations/MustHaveAtLeastXCharacters.validation");
class ShortDescription extends Types_1.GenericType {
    constructor(value, label) {
        const msg = label ?? 'Short Description';
        super(value);
        this.validate([
            () => (0, CannotBeBlank_validation_1.CannotBeBlank)(value, msg),
            () => (0, MustHaveAtLeastXCharacters_validation_1.MustHaveAtLeastXCharacters)(value, msg, 2),
            () => (0, CannotHaveMoreThanXCharacters_validation_1.CannotHaveMoreThanXCharacters)(value, msg, 120),
        ]);
        if (this.errors.length === 0) {
            this.value = value.trim();
        }
    }
}
exports.ShortDescription = ShortDescription;
function createShortDescription(value, label) {
    return new ShortDescription(value, label);
}
exports.createShortDescription = createShortDescription;
