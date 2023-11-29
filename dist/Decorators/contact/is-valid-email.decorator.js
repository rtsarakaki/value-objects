"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsValidEmail = void 0;
const ValueObjects_1 = require("../../ValueObjects");
const decorator_builder_engine_1 = require("../engine/decorator-builder.engine");
function IsValidEmail(label, required, language) {
    return function (target, propertyKey) {
        if (typeof propertyKey !== 'string' && typeof propertyKey !== 'symbol') {
            return;
        }
        const labelText = label || 'Email';
        const typeInstanceCreator = (0, decorator_builder_engine_1.typeConstructorFactory)(ValueObjects_1.Email, labelText, required, language);
        (0, decorator_builder_engine_1.buildGetterAndSetter)(target, propertyKey, typeInstanceCreator);
        (0, decorator_builder_engine_1.registerDecoratorFunction)('IsValidEmail', target, propertyKey, labelText, typeInstanceCreator);
    };
}
exports.IsValidEmail = IsValidEmail;
