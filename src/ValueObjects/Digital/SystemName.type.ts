import { GenericValidation } from "../../Types";
import { Title } from "../StringLiteral/Title.type";

export class SystemName extends Title {
	constructor(value: string, label?: string, required?: boolean, language?: string, ...customValidators: GenericValidation[]) {
		super(value, label ?? 'SystemName', required ?? true, language ?? 'en-US', ...customValidators);
	}
}

export function createSystemName(value: string, label?: string, required?: boolean, language?: string, ...customValidators: GenericValidation[]) {
	return new SystemName(value, label, required, language, ...customValidators);
}
