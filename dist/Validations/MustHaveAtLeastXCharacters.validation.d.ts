import { InvalidValue } from "../Errors/InvalidValue.error";
export declare const MustHaveAtLeastXCharacters: (value: string, label: string, charactersNumber: number, language?: string) => InvalidValue | null;
