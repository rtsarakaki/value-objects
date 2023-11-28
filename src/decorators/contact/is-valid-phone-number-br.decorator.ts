
import { PhoneNumberBR } from "../../ValueObjects";
import { buildGetterAndSetter, registerDecoratorFunction, typeConstructorFactory } from "../engine/decorator-builder.engine";

export function IsValidPhoneNumberBR(label?: string, required?: boolean, language?: string) {
	return function (target: any, propertyKey: string | symbol | object): void {
		if (typeof propertyKey !== 'string' && typeof propertyKey !== 'symbol') {
			return;
		}
		const labelText = label || 'PhoneNumberBR';
		const typeInstanceCreator = typeConstructorFactory(PhoneNumberBR, labelText, required, language);
		buildGetterAndSetter(target, propertyKey, typeInstanceCreator);
		registerDecoratorFunction('IsValidPhoneNumberBR', target, propertyKey, labelText, typeInstanceCreator);
	}
}