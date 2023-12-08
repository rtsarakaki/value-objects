"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSystemName = exports.SystemName = void 0;
const Title_type_1 = require("../StringLiteral/Title.type");
const CannotContainSpecialCharacters_validation_1 = require("../../Validations/CannotContainSpecialCharacters.validation");
class SystemName extends Title_type_1.Title {
    constructor(value, label, required, language, ...customValidators) {
        const cannotContainSpecialCharacters = () => (0, CannotContainSpecialCharacters_validation_1.CannotContainSpecialCharacters)(value, label ?? "SystemName", required ?? true, language ?? "en-US");
        super(value, label ?? "SystemName", required ?? true, language ?? "en-US", ...customValidators, cannotContainSpecialCharacters);
    }
}
exports.SystemName = SystemName;
function createSystemName(value, label, required, language, ...customValidators) {
    return new SystemName(value, label, required, language, ...customValidators);
}
exports.createSystemName = createSystemName;
