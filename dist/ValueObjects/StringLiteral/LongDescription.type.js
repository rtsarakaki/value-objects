"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createLongDescription = exports.LongDescription = void 0;
const GenericType_type_1 = __importDefault(require("../../Types/RootTypes/GenericType.type"));
const CannotBeBlank_validation_1 = require("../../Validations/CannotBeBlank.validation");
const MustHaveAtLeastXCharacters_validation_1 = require("../../Validations/MustHaveAtLeastXCharacters.validation");
class LongDescription extends GenericType_type_1.default {
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
