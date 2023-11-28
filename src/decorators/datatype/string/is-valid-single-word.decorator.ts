
import { SingleWord } from "../../../ValueObjects";
import { buildGetterAndSetter, registerDecoratorFunction, typeConstructorFactory } from "../../engine/decorator-builder.engine";

export function IsValidSingleWord(label?: string, required?: boolean, language?: string) {
	return function (target: any, propertyKey: string | symbol | object): void {
		if (typeof propertyKey !== 'string' && typeof propertyKey !== 'symbol') {
			return;
		}
		const labelText = label || 'SingleWord';
		const typeInstanceCreator = typeConstructorFactory(SingleWord, labelText, required, language);
		buildGetterAndSetter(target, propertyKey, typeInstanceCreator);
		registerDecoratorFunction('IsValidSingleWord', target, propertyKey, labelText, typeInstanceCreator);
	}
}