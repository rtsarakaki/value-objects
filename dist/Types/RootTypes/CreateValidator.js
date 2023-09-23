"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateValidator = void 0;
const GenericEntity_entity_1 = __importDefault(require("./GenericEntity.entity"));
const GenericType_type_1 = __importDefault(require("./GenericType.type"));
function CreateValidator(property, label) {
    if (property instanceof GenericEntity_entity_1.default || property instanceof GenericType_type_1.default) {
        const type = Object.prototype.toString.call(property).slice(8, -1);
        const ValidatorClass = eval(`${type}`);
        return new ValidatorClass(property, label);
    }
    else {
        return undefined;
    }
}
exports.CreateValidator = CreateValidator;
