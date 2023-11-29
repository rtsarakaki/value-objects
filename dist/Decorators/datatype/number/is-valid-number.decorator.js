"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsValidNumber = void 0;
const ValueObjects_1 = require("../../../ValueObjects");
const decorator_builder_engine_1 = require("../../engine/decorator-builder.engine");
function IsValidNumber(max, min, label, required, language) {
    return function (target, propertyKey) {
        if (typeof propertyKey !== 'string' && typeof propertyKey !== 'symbol') {
            return;
        }
        const labelText = label || 'Number';
        const typeInstanceCreator = (0, decorator_builder_engine_1.typeConstructorFactory)(ValueObjects_1.Number, labelText, required, max, min, language);
        (0, decorator_builder_engine_1.buildGetterAndSetter)(target, propertyKey, typeInstanceCreator);
        (0, decorator_builder_engine_1.registerDecoratorFunction)('IsValidNumber', target, propertyKey, labelText, typeInstanceCreator);
    };
}
exports.IsValidNumber = IsValidNumber;
