import { InvalidValue } from "../../Errors";
export interface GenericValidation {
    (value: string, label: string, ...args: any[]): InvalidValue | null;
}
