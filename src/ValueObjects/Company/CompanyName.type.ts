import { GenericValidation } from "../../Types";
import { Title } from "../StringLiteral/Title.type";

export class CompanyName extends Title {
	constructor(value: string, label?: string, required?: boolean, language?: string, ...customValidators: GenericValidation[]) {
		super(value, label ?? 'CompanyName', required ?? true, language ?? 'en-US', ...customValidators);
	}
}

export function createCompanyName(value: string, label?: string, required?: boolean, language?: string, ...customValidators: GenericValidation[]) {
	return new CompanyName(value, label, required, language, ...customValidators);
}
