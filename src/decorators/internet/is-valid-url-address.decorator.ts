import { UrlAddress } from "../../ValueObjects";
import { buildGetterAndSetter, registerDecoratorFunction, typeConstructorFactory } from "../engine/decorator-builder.engine";

export function IsValidUrlAddress(label?: string, required?: boolean, language?: string) {
	return function (target: any, propertyKey: string | symbol | object): void {
		if (typeof propertyKey !== 'string' && typeof propertyKey !== 'symbol') {
			return;
		}
		const labelText = label || 'IsValidUrlAddress';
		const typeInstanceCreator = typeConstructorFactory(UrlAddress, labelText, required, language);
		buildGetterAndSetter(target, propertyKey, typeInstanceCreator);
		registerDecoratorFunction('IsValidUrlAddress', target, propertyKey, labelText, typeInstanceCreator);
	}
}