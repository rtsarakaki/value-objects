import { GenericType, GenericValidation } from "../../Types";
export declare class Title extends GenericType {
    constructor(value: string, label: string, required?: boolean, ...customValidators: GenericValidation[]);
}
export declare function createTitle(value: string, label: string): Title;
export declare function capitalizeText(value: string): string;
