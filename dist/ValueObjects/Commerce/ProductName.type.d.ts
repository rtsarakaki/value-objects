import { GenericValidation } from "../../Types";
import { Title } from "../StringLiteral/Title.type";
export declare class ProductName extends Title {
    constructor(value: string, label?: string, required?: boolean, language?: string, ...customValidators: GenericValidation[]);
}
export declare function createProductName(value: string, label?: string, required?: boolean, language?: string, ...customValidators: GenericValidation[]): ProductName;
