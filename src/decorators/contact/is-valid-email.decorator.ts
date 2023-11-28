
import { Email } from "../../ValueObjects";
import { buildGetterAndSetter, registerDecoratorFunction, typeConstructorFactory } from "../engine/decorator-builder.engine";

export function IsValidEmail(label?: string, required?: boolean, language?: string) {
	return function (target: any, propertyKey: string | symbol | object): void {
		if (typeof propertyKey !== 'string' && typeof propertyKey !== 'symbol') {
			return;
		}
		const labelText = label || 'Email';
		const typeInstanceCreator = typeConstructorFactory(Email, labelText, required, language);
		buildGetterAndSetter(target, propertyKey, typeInstanceCreator);
		registerDecoratorFunction('IsValidEmail', target, propertyKey, labelText, typeInstanceCreator);
	}
}