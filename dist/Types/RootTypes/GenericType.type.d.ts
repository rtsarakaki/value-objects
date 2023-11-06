import { GenericError } from "../../Errors/GenericError.error";
export declare class GenericType {
    value: any;
    [property: string]: any;
    errors: Array<GenericError>;
    constructor(value: any);
    get isValid(): boolean;
    accumulateErrors(callback: any): void;
    addErrors(errors: GenericError[]): void;
    clearErrors(): void;
    validate(validationList: any[]): void;
}
