import { GenericError } from "../Errors";
import { GenericEntity } from "../Types";
import { FullName, KebabCode } from "../ValueObjects";
export declare class Frankenstein extends GenericEntity<any> {
    _requiredProperty: string;
    _noNumbers: string;
    errors: GenericError[];
    _kebabCode: KebabCode;
    _fullName: FullName;
    constructor(valores: any);
    get requiredProperty(): string;
    get noNumbers(): string;
    get kebabCode(): any;
}
