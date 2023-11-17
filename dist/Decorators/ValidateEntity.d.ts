import { GenericEntity } from "../Types";
export declare function ValidateEntity<T extends {
    new (...args: any[]): GenericEntity<any>;
}>(constructor: T): {
    new (...args: any[]): {
        [property: string]: any;
        init(): void;
        validate(): void;
        _json: any;
        initProp(object: any, value: import("../Types").GenericType, required?: boolean): import("../Types").GenericType;
        readonly id: string | undefined;
        value: any;
        errors: import("../Errors").GenericError[];
        readonly isValid: boolean;
        accumulateErrors(callback: any): void;
        addErrors(errors: import("../Errors").GenericError[]): void;
        clearErrors(): void;
    };
} & T;
