
import { Title } from "../../../ValueObjects";
import { buildGetterAndSetter, registerDecoratorFunction, typeConstructorFactory } from "../../engine/decorator-builder.engine";

export function IsValidTitle(label?: string, required?: boolean, language?: string) {
	return function (target: any, propertyKey: string | symbol | object): void {
		if (typeof propertyKey !== 'string' && typeof propertyKey !== 'symbol') {
			return;
		}
		const labelText = label || 'Title';
		const typeInstanceCreator = typeConstructorFactory(Title, labelText, required, language);
		buildGetterAndSetter(target, propertyKey, typeInstanceCreator);
		registerDecoratorFunction('IsValidTitle', target, propertyKey, labelText, typeInstanceCreator);
	}
}