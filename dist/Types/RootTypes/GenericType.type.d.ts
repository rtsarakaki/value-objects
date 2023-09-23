import { GenericError } from "../../Errors/GenericError.error";
export declare class GenericType {
    value: any;
    [property: string]: any;
    errors: Array<GenericError>;
    constructor(value: any);
    get isValid(): boolean;
    accumulateErrors(callback: any): void;
    validate(validationList: any[]): void;
    toJson(): {};
}
export type FromJsonFunc<M> = (data: any) => M;
