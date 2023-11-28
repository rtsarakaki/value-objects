
import { PositiveInteger } from "../../../ValueObjects";
import { buildGetterAndSetter, registerDecoratorFunction, typeConstructorFactory } from "../../engine/decorator-builder.engine";

export function IsValidPositiveInteger(max?: number, min?: number, label?: string, required?: boolean, language?: string) {
	return function (target: any, propertyKey: string | symbol | object): void {
		if (typeof propertyKey !== 'string' && typeof propertyKey !== 'symbol') {
			return;
		}
		const labelText = label || 'PositiveInteger';
		const typeInstanceCreator = typeConstructorFactory(PositiveInteger, labelText, required, max, min, language);
		buildGetterAndSetter(target, propertyKey, typeInstanceCreator);
		registerDecoratorFunction('IsValidPositiveInteger', target, propertyKey, labelText, typeInstanceCreator);
	}
}