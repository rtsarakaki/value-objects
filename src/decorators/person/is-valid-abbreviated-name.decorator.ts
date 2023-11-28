import { FullName } from "../../ValueObjects";
import { buildGetterAndSetter, registerDecoratorFunction, typeConstructorFactory } from "../engine/decorator-builder.engine";

export function IsValidAbbreviatedName(label?: string, required?: boolean, language?: string) {
	return function (target: any, propertyKey: string | symbol | object): void {
		if (typeof propertyKey !== 'string' && typeof propertyKey !== 'symbol') {
			return;
		}
		const labelText = label || 'AbbreviatedName';
		const typeInstanceCreator = typeConstructorFactory(FullName, labelText, required, language);
		buildGetterAndSetter(target, propertyKey, typeInstanceCreator, 'abbreviatedName');
		registerDecoratorFunction('IsValidAbbreviatedName', target, propertyKey, labelText, typeInstanceCreator);
	}
}