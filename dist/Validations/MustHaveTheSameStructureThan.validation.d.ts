import { InvalidValue } from "../Errors/InvalidValue.error";
export declare function MustHaveTheSameStructureThan<T>(value: string, label: string, required?: boolean, language?: string): null | InvalidValue;
