import { GenericType, GenericValidation } from '../../Types';
export declare function GenerateUUID(label: string): UUID;
export declare class UUID extends GenericType {
    constructor(value: string, label: string, required?: boolean, language?: string, ...customValidators: GenericValidation[]);
}
export declare function createUUID(value: string | null, label: string): UUID;
