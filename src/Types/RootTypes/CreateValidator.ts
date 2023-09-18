import GenericEntity from "./GenericEntity.entity";
import GenericType from "./GenericType.type";

export function CreateValidator(property: any, label: string) {
	if (property instanceof GenericEntity || property instanceof GenericType) {
		const type = Object.prototype.toString.call(property).slice(8, -1);
		const ValidatorClass = eval(`${type}`);
		return new ValidatorClass(property, label);
	} else {
		return undefined;
	}
}