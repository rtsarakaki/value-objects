import { InvalidValue } from "../../Errors";

export interface GenericValidation {
	(value: string, label: string): InvalidValue | null;
}


