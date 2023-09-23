import { InvalidValue } from "../Errors";
export declare const CannotHaveMoreThanXCharacters: (value: string, label: string, charactersNumber: number, language?: string) => InvalidValue | null;
