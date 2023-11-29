"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsValidShortDate = void 0;
const ValueObjects_1 = require("../../../ValueObjects");
const decorator_builder_engine_1 = require("../../engine/decorator-builder.engine");
function IsValidShortDate(outputFormat, label, required, language) {
    return function (target, propertyKey) {
        if (typeof propertyKey !== 'string' && typeof propertyKey !== 'symbol') {
            return;
        }
        const labelText = label || 'ShortDate';
        const typeInstanceCreator = (0, decorator_builder_engine_1.typeConstructorFactory)(ValueObjects_1.ShortDate, labelText, outputFormat, required, language);
        (0, decorator_builder_engine_1.buildGetterAndSetter)(target, propertyKey, typeInstanceCreator);
        (0, decorator_builder_engine_1.registerDecoratorFunction)('IsValidShortDate', target, propertyKey, labelText, typeInstanceCreator);
    };
}
exports.IsValidShortDate = IsValidShortDate;
