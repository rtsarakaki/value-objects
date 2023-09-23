import InvalidValue from "../Errors/InvalidValue.error";
export declare function MustHaveTheSameStructureThan<T>(valor: string, label: string, language?: string): InvalidValue | T;
