import { GenericValidation } from "../../Types";
import { Title } from "../StringLiteral/Title.type";
export declare class CompanyName extends Title {
    constructor(value: string, label?: string, required?: boolean, language?: string, ...customValidators: GenericValidation[]);
}
export declare function createCompanyName(value: string, label?: string, required?: boolean, language?: string, ...customValidators: GenericValidation[]): CompanyName;
