"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSingleWord = exports.SingleWord = void 0;
const GenericType_type_1 = __importDefault(require("../../Types/RootTypes/GenericType.type"));
const CannotBeBlank_validation_1 = require("../../Validations/CannotBeBlank.validation");
const CannotHaveMoreThanXCharacters_validation_1 = require("../../Validations/CannotHaveMoreThanXCharacters.validation");
const MustHaveAtLeastXCharacters_validation_1 = require("../../Validations/MustHaveAtLeastXCharacters.validation");
const MustHaveOnlyOneWord_validation_1 = require("../../Validations/MustHaveOnlyOneWord.validation");
class SingleWord extends GenericType_type_1.default {
    constructor(value, label = null) {
        const msg = label ?? 'One Word';
        super(value);
        this.validate([
            () => (0, CannotBeBlank_validation_1.CannotBeBlank)(value, msg),
            () => (0, MustHaveAtLeastXCharacters_validation_1.MustHaveAtLeastXCharacters)(value, msg, 1),
            () => (0, CannotHaveMoreThanXCharacters_validation_1.CannotHaveMoreThanXCharacters)(value, msg, 50),
            () => (0, MustHaveOnlyOneWord_validation_1.MustHaveOnlyOneWord)(value, msg),
        ]);
        if (this.errors.length === 0) {
            this.value = value?.trim().toLowerCase();
        }
    }
}
exports.SingleWord = SingleWord;
function createSingleWord(value, label = null) {
    return new SingleWord(value, label);
}
exports.createSingleWord = createSingleWord;
