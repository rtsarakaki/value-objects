import { GenericValidation } from "../../Types";
import { Title } from "../StringLiteral/Title.type";
export declare class SystemName extends Title {
    constructor(value: string, label?: string, required?: boolean, language?: string, ...customValidators: GenericValidation[]);
}
export declare function createSystemName(value: string, label?: string, required?: boolean, language?: string, ...customValidators: GenericValidation[]): SystemName;
