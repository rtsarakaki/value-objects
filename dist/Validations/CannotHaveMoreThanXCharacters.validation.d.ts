import InvalidValue from "../Errors/InvalidValue.error";
export declare const CannotHaveMoreThanXCharacters: (value: string, label: string, charactersNumber: number, language?: string) => InvalidValue | null;
