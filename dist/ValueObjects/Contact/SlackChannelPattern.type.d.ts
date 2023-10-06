import { GenericType, GenericValidation } from "../../Types";
export declare class SlackChannelPattern extends GenericType {
    constructor(value: string, label?: string | null, required?: boolean, language?: string, ...customValidators: GenericValidation[]);
}
export declare function createSlackChannelPattern(value: string, label?: string | null, required?: boolean, language?: string, ...customValidators: GenericValidation[]): SlackChannelPattern;
