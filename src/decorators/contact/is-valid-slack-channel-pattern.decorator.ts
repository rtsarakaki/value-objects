
import { SlackChannelPattern } from "../../ValueObjects";
import { buildGetterAndSetter, registerDecoratorFunction, typeConstructorFactory } from "../engine/decorator-builder.engine";

export function IsValidSlackChannelPattern(label?: string, required?: boolean, language?: string) {
	return function (target: any, propertyKey: string | symbol | object): void {
		if (typeof propertyKey !== 'string' && typeof propertyKey !== 'symbol') {
			return;
		}
		const labelText = label || 'SlackChannelPattern';
		const typeInstanceCreator = typeConstructorFactory(SlackChannelPattern, labelText, required, language);
		buildGetterAndSetter(target, propertyKey, typeInstanceCreator);
		registerDecoratorFunction('IsValidSlackChannelPattern', target, propertyKey, labelText, typeInstanceCreator);
	}
}