import { GenericType, GenericValidation } from "../../Types";
export declare class FullName extends GenericType {
    constructor(name: string, label: string, required?: boolean, ...customValidators: GenericValidation[]);
    private get _nameParts();
    get firstName(): string;
    get lastName(): string;
    get middleName(): string;
}
export declare function createFullName(name: string, label: string, required?: boolean): FullName;
export declare function formatFullName(fullName: string): string;
