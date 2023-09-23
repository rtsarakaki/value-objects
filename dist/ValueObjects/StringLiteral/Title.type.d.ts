import { GenericType } from "../../Types";
export declare class Title extends GenericType {
    constructor(value: string, label: string);
}
export declare function createTitle(value: string, label: string): Title;
export declare function capitalizeText(value: string): string;
