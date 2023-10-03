export declare function ValidateEntity<T extends {
    new (...args: any[]): {
        initProp: (instance: any, value: any) => any;
        errors: any;
    };
}>(constructor: T): {
    new (...args: any[]): {
        init(): void;
        validate(): void;
        initProp: (instance: any, value: any) => any;
        errors: any;
    };
} & T;
