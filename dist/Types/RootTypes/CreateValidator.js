"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateValidator = void 0;
const GenericEntity_entity_1 = require("./GenericEntity.entity");
const GenericType_type_1 = require("./GenericType.type");
function CreateValidator(property, label) {
    if (property instanceof GenericEntity_entity_1.GenericEntity || property instanceof GenericType_type_1.GenericType) {
        const type = Object.prototype.toString.call(property).slice(8, -1);
        const ValidatorClass = eval(`${type}`);
        return new ValidatorClass(property, label);
    }
    else {
        return undefined;
    }
}
exports.CreateValidator = CreateValidator;
