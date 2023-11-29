import { GenericValidation } from "../../Types";
import { Hashtag } from "../Digital/Hashtag.type";
export declare class SlackChannelPattern extends Hashtag {
    constructor(value: string, label?: string | null, required?: boolean, language?: string, ...customValidators: GenericValidation[]);
}
export declare function createSlackChannelPattern(value: string, label?: string | null, required?: boolean, language?: string, ...customValidators: GenericValidation[]): SlackChannelPattern;
