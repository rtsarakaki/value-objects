"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSystemName = exports.SystemName = void 0;
const Title_type_1 = require("../StringLiteral/Title.type");
class SystemName extends Title_type_1.Title {
    constructor(value, label, required, language, ...customValidators) {
        super(value, label ?? 'SystemName', required ?? true, language ?? 'en-US', ...customValidators);
    }
}
exports.SystemName = SystemName;
function createSystemName(value, label, required, language, ...customValidators) {
    return new SystemName(value, label, required, language, ...customValidators);
}
exports.createSystemName = createSystemName;
