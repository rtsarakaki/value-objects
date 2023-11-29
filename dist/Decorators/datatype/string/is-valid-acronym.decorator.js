"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsValidAcronym = void 0;
const ValueObjects_1 = require("../../../ValueObjects");
const decorator_builder_engine_1 = require("../../engine/decorator-builder.engine");
function IsValidAcronym(upper, label, required, language) {
    return function (target, propertyKey) {
        if (typeof propertyKey !== 'string' && typeof propertyKey !== 'symbol') {
            return;
        }
        const labelText = label || 'Acronym';
        const typeInstanceCreator = (0, decorator_builder_engine_1.typeConstructorFactory)(ValueObjects_1.Acronym, labelText, required, upper, language);
        (0, decorator_builder_engine_1.buildGetterAndSetter)(target, propertyKey, typeInstanceCreator);
        (0, decorator_builder_engine_1.registerDecoratorFunction)('IsValidAcronym', target, propertyKey, labelText, typeInstanceCreator);
    };
}
exports.IsValidAcronym = IsValidAcronym;
