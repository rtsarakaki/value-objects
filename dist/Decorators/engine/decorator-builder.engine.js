"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerDecoratorFunction = exports.buildGetterAndSetter = exports.typeConstructorFactory = void 0;
const class_validator_1 = require("class-validator");
function typeConstructorFactory(typeConstructor, ...args) {
    return (next) => new typeConstructor(next, ...args);
}
exports.typeConstructorFactory = typeConstructorFactory;
function buildGetterAndSetter(target, propertyKey, typeInstanceCreator, property) {
    let value = target[propertyKey] || {};
    const getter = () => {
        if (!!!property) {
            return value;
        }
        else {
            return value[property];
        }
    };
    const setter = (next) => {
        const typeInstance = typeInstanceCreator(next);
        if (typeInstance.errors && typeInstance.errors.length > 0) {
            if (!("errors" in target)) {
                target.errors = [];
            }
            target.errors.push(...typeInstance.errors);
        }
        if (!!!property) {
            value = typeInstance.value;
        }
        else {
            value[property] = typeInstance[property];
        }
    };
    if (Reflect.isExtensible(target)) {
        Reflect.deleteProperty(target, propertyKey);
        Reflect.defineProperty(target, propertyKey, {
            get: getter,
            set: setter,
            enumerable: true,
            configurable: true,
        });
    }
}
exports.buildGetterAndSetter = buildGetterAndSetter;
function registerDecoratorFunction(decoratorName, target, propertyKey, labelText, typeInstanceCreator) {
    (0, class_validator_1.registerDecorator)({
        name: decoratorName,
        target: target.constructor,
        propertyName: propertyKey.toString(),
        options: { message: `${labelText} is invalid.` },
        validator: {
            validate(value, _) {
                const typeInstance = typeInstanceCreator(value);
                if (typeInstance.errors && typeInstance.errors.length > 0) {
                    return false;
                }
                return true;
            },
        },
    });
}
exports.registerDecoratorFunction = registerDecoratorFunction;
