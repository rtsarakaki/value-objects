import { GenericValidation } from "../../Types";
import { Title } from "../StringLiteral/Title.type";
import { CannotContainSpecialCharacters } from "../../Validations/CannotContainSpecialCharacters.validation";

export class SystemName extends Title {
	constructor(
		value: string,
		label?: string,
		required?: boolean,
		language?: string,
		...customValidators: GenericValidation[]
	) {
		const cannotContainSpecialCharacters = () =>
			CannotContainSpecialCharacters(
				value,
				label ?? "SystemName",
				required ?? true,
				language ?? "en-US",
			);
		super(
			value,
			label ?? "SystemName",
			required ?? true,
			language ?? "en-US",
			...customValidators,
			cannotContainSpecialCharacters,
		);
	}
}

export function createSystemName(
	value: string,
	label?: string,
	required?: boolean,
	language?: string,
	...customValidators: GenericValidation[]
) {
	return new SystemName(value, label, required, language, ...customValidators);
}
