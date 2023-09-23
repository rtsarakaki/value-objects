import { InvalidValue } from "../Errors/InvalidValue.error";
export declare const MustBeContainedInEnum: (value: string, label: string, enumeration: any, language?: string) => InvalidValue | null;
