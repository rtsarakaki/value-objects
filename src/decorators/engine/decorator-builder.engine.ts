import {
	registerDecorator,
	ValidationOptions,
	ValidationArguments,
} from "class-validator";
import { GenericType } from "../../Types";

export function typeConstructorFactory(
	typeConstructor: new (...args: any[]) => GenericType,
	...args: any[]
) {
	return (next: any) => new typeConstructor(next, ...args);
}

export function buildGetterAndSetter(
	target: Record<string, any>,
	propertyKey: string | symbol,
	typeInstanceCreator: (next: any) => GenericType,
	property?: string,
) {
	let value = target[propertyKey as string] || {};

	const getter = () => {
		if (!!!property) {
			return value;
		}
		else {
			return value[property];
		}
	};

	const setter = (next: any) => {
		const typeInstance = typeInstanceCreator(next);
		if (typeInstance.errors && typeInstance.errors.length > 0) {
			if (!("errors" in target)) {
				target.errors = [];
			}
			target.errors.push(...typeInstance.errors);
		}
		if (!!!property) {
			value = typeInstance.value;
		} else {
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

export function registerDecoratorFunction(
	decoratorName: string,
	target: Record<string, any>,
	propertyKey: string | symbol,
	labelText: string,
	typeInstanceCreator: (value: any) => GenericType,
) {
	registerDecorator({
		name: decoratorName,
		target: target.constructor,
		propertyName: propertyKey.toString(),
		options: { message: `${labelText} is invalid.` } as ValidationOptions,
		validator: {
			validate(value: any, _: ValidationArguments) {
				const typeInstance = typeInstanceCreator(value);
				if (typeInstance.errors && typeInstance.errors.length > 0) {
					return false;
				}
				return true;
			},
		},
	});
}