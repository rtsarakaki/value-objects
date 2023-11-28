
import { UUID } from "../../../ValueObjects";
import { buildGetterAndSetter, registerDecoratorFunction, typeConstructorFactory } from "../../engine/decorator-builder.engine";

export function GenerateUUID(label?: string, required?: boolean, language?: string) {
	return function (target: any, propertyKey: string | symbol | object): void {
		if (typeof propertyKey !== 'string' && typeof propertyKey !== 'symbol') {
			return;
		}
		const labelText = label || 'UUID';
		const typeInstanceCreator = typeConstructorFactory(UUID, labelText, required, language);
		buildGetterAndSetter(target, propertyKey, typeInstanceCreator);
		registerDecoratorFunction('GenerateUUID', target, propertyKey, labelText, typeInstanceCreator);
	}
}