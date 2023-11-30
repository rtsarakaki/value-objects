import { GenericValidation } from "../../Types";
import { Title } from "../StringLiteral/Title.type";

export class ProductName extends Title {
	constructor(value: string, label?: string, required?: boolean, language?: string, ...customValidators: GenericValidation[]) {
		super(value, label ?? 'ProductName', required ?? true, language ?? 'en-US', ...customValidators);
	}
}

export function createProductName(value: string, label?: string, required?: boolean, language?: string, ...customValidators: GenericValidation[]) {
	return new ProductName(value, label, required, language, ...customValidators);
}
