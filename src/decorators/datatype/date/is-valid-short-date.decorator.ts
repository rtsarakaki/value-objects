
import { ShortDate } from "../../../ValueObjects";
import { buildGetterAndSetter, registerDecoratorFunction, typeConstructorFactory } from "../../engine/decorator-builder.engine";

export function IsValidShortDate(outputFormat?: string, label?: string, required?: boolean, language?: string) {
	return function (target: any, propertyKey: string | symbol | object): void {
		if (typeof propertyKey !== 'string' && typeof propertyKey !== 'symbol') {
			return;
		}
		const labelText = label || 'ShortDate';
		const typeInstanceCreator = typeConstructorFactory(ShortDate, labelText, outputFormat, required, language);
		buildGetterAndSetter(target, propertyKey, typeInstanceCreator);
		registerDecoratorFunction('IsValidShortDate', target, propertyKey, labelText, typeInstanceCreator);
	}
}