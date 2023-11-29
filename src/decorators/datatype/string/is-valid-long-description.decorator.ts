
import { LongDescription } from "../../../ValueObjects";
import { buildGetterAndSetter, registerDecoratorFunction, typeConstructorFactory } from "../../engine/decorator-builder.engine";

export function IsValidLongDescription(label?: string, required?: boolean, language?: string) {
	console.log("IsValidFullName", label, required, language)
	return function (target: any, propertyKey: string | symbol | object): void {
		if (typeof propertyKey !== 'string' && typeof propertyKey !== 'symbol') {
			return;
		}
		const labelText = label || 'LongDescription';
		const typeInstanceCreator = typeConstructorFactory(LongDescription, labelText, required, language);
		buildGetterAndSetter(target, propertyKey, typeInstanceCreator);
		registerDecoratorFunction('IsValidLongDescription', target, propertyKey, labelText, typeInstanceCreator);
	}
}