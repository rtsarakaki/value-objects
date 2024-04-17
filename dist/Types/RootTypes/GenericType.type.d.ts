import { GenericError } from "../../Errors/GenericError.error";
export declare class GenericType {
    private _originalValue;
    private _value;
    [property: string]: any;
    errors: Array<GenericError>;
    constructor(value: any);
    get originalValue(): any;
    get value(): any;
    protected set value(value: any);
    get isValid(): boolean;
    accumulateErrors(callback: any): void;
    addErrors(errors: GenericError[]): void;
    clearErrors(): void;
    validate(validationList: any[]): void;
}
