
import { Acronym } from "../../../ValueObjects";
import { buildGetterAndSetter, registerDecoratorFunction, typeConstructorFactory } from "../../engine/decorator-builder.engine";

export function IsValidAcronym(upper?: boolean, label?: string, required?: boolean, language?: string) {
	return function (target: any, propertyKey: string | symbol | object): void {
		if (typeof propertyKey !== 'string' && typeof propertyKey !== 'symbol') {
			return;
		}
		const labelText = label || 'Acronym';
		const typeInstanceCreator = typeConstructorFactory(Acronym, labelText, required, upper, language);
		buildGetterAndSetter(target, propertyKey, typeInstanceCreator);
		registerDecoratorFunction('IsValidAcronym', target, propertyKey, labelText, typeInstanceCreator);
	}
}