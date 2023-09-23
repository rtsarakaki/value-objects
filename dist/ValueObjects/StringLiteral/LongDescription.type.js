"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createLongDescription = exports.LongDescription = void 0;
const Types_1 = require("../../Types");
const CannotBeBlank_validation_1 = require("../../Validations/CannotBeBlank.validation");
const MustHaveAtLeastXCharacters_validation_1 = require("../../Validations/MustHaveAtLeastXCharacters.validation");
class LongDescription extends Types_1.GenericType {
    constructor(value, label) {
        const msg = label ?? 'Long Description';
        super(value);
        this.validate([
            () => (0, CannotBeBlank_validation_1.CannotBeBlank)(value, msg),
            () => (0, MustHaveAtLeastXCharacters_validation_1.MustHaveAtLeastXCharacters)(value, msg, 2),
        ]);
        if (this.errors.length === 0) {
            this.value = value.trim();
        }
    }
}
exports.LongDescription = LongDescription;
function createLongDescription(value, label) {
    return new LongDescription(value, label);
}
exports.createLongDescription = createLongDescription;
