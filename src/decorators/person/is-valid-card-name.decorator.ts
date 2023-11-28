import { FullName } from "../../ValueObjects";
import { buildGetterAndSetter, registerDecoratorFunction, typeConstructorFactory } from "../engine/decorator-builder.engine";

export function IsValidCardName(label?: string, required?: boolean, language?: string) {
	return function (target: any, propertyKey: string | symbol | object): void {
		if (typeof propertyKey !== 'string' && typeof propertyKey !== 'symbol') {
			return;
		}
		const labelText = label || 'CardName';
		const typeInstanceCreator = typeConstructorFactory(FullName, labelText, required, language);
		buildGetterAndSetter(target, propertyKey, typeInstanceCreator, 'cardName');
		registerDecoratorFunction('IsValidCardName', target, propertyKey, labelText, typeInstanceCreator);
	}
}