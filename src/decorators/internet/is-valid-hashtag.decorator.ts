
import { Hashtag } from "../../ValueObjects/Digital/Hashtag.type";
import { buildGetterAndSetter, registerDecoratorFunction, typeConstructorFactory } from "../engine/decorator-builder.engine";

export function IsValidHashtag(label?: string, required?: boolean, language?: string) {
	return function (target: any, propertyKey: string | symbol | object): void {
		if (typeof propertyKey !== 'string' && typeof propertyKey !== 'symbol') {
			return;
		}
		const labelText = label || 'Hashtag';
		const typeInstanceCreator = typeConstructorFactory(Hashtag, labelText, required, language);
		buildGetterAndSetter(target, propertyKey, typeInstanceCreator);
		registerDecoratorFunction('IsValidHashtag', target, propertyKey, labelText, typeInstanceCreator);
	}
}