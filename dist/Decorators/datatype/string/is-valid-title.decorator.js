"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsValidTitle = void 0;
const ValueObjects_1 = require("../../../ValueObjects");
const decorator_builder_engine_1 = require("../../engine/decorator-builder.engine");
function IsValidTitle(label, required, language) {
    return function (target, propertyKey) {
        if (typeof propertyKey !== 'string' && typeof propertyKey !== 'symbol') {
            return;
        }
        const labelText = label || 'Title';
        const typeInstanceCreator = (0, decorator_builder_engine_1.typeConstructorFactory)(ValueObjects_1.Title, labelText, required, language);
        (0, decorator_builder_engine_1.buildGetterAndSetter)(target, propertyKey, typeInstanceCreator);
        (0, decorator_builder_engine_1.registerDecoratorFunction)('IsValidTitle', target, propertyKey, labelText, typeInstanceCreator);
    };
}
exports.IsValidTitle = IsValidTitle;
