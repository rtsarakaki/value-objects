"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsValidCardName = void 0;
const ValueObjects_1 = require("../../ValueObjects");
const decorator_builder_engine_1 = require("../engine/decorator-builder.engine");
function IsValidCardName(label, required, language) {
    return function (target, propertyKey) {
        if (typeof propertyKey !== 'string' && typeof propertyKey !== 'symbol') {
            return;
        }
        const labelText = label || 'CardName';
        const typeInstanceCreator = (0, decorator_builder_engine_1.typeConstructorFactory)(ValueObjects_1.FullName, labelText, required, language);
        (0, decorator_builder_engine_1.buildGetterAndSetter)(target, propertyKey, typeInstanceCreator, 'cardName');
        (0, decorator_builder_engine_1.registerDecoratorFunction)('IsValidCardName', target, propertyKey, labelText, typeInstanceCreator);
    };
}
exports.IsValidCardName = IsValidCardName;
