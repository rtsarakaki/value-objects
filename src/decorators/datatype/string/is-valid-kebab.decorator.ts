
import { KebabCode } from "../../../ValueObjects";
import { buildGetterAndSetter, registerDecoratorFunction, typeConstructorFactory } from "../../engine/decorator-builder.engine";

export function IsValidKebab(label?: string, required?: boolean, language?: string) {
	return function (target: any, propertyKey: string | symbol | object): void {
		if (typeof propertyKey !== 'string' && typeof propertyKey !== 'symbol') {
			return;
		}
		const labelText = label || 'Acronym';
		const typeInstanceCreator = typeConstructorFactory(KebabCode, labelText, required, language);
		buildGetterAndSetter(target, propertyKey, typeInstanceCreator);
		registerDecoratorFunction('IsValidKebab', target, propertyKey, labelText, typeInstanceCreator);
	}
}