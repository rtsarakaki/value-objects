"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsValidHashtag = void 0;
const Hashtag_type_1 = require("../../ValueObjects/Digital/Hashtag.type");
const decorator_builder_engine_1 = require("../engine/decorator-builder.engine");
function IsValidHashtag(label, required, language) {
    return function (target, propertyKey) {
        if (typeof propertyKey !== 'string' && typeof propertyKey !== 'symbol') {
            return;
        }
        const labelText = label || 'Hashtag';
        const typeInstanceCreator = (0, decorator_builder_engine_1.typeConstructorFactory)(Hashtag_type_1.Hashtag, labelText, required, language);
        (0, decorator_builder_engine_1.buildGetterAndSetter)(target, propertyKey, typeInstanceCreator);
        (0, decorator_builder_engine_1.registerDecoratorFunction)('IsValidHashtag', target, propertyKey, labelText, typeInstanceCreator);
    };
}
exports.IsValidHashtag = IsValidHashtag;
