"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCompanyName = exports.CompanyName = void 0;
const Title_type_1 = require("../StringLiteral/Title.type");
class CompanyName extends Title_type_1.Title {
    constructor(value, label, required, language, ...customValidators) {
        super(value, label ?? 'CompanyName', required ?? true, language ?? 'en-US', ...customValidators);
    }
}
exports.CompanyName = CompanyName;
function createCompanyName(value, label, required, language, ...customValidators) {
    return new CompanyName(value, label, required, language, ...customValidators);
}
exports.createCompanyName = createCompanyName;
