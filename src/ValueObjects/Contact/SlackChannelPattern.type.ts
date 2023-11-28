import { GenericValidation } from "../../Types";
import { Hashtag } from "../Digital/Hashtag.type";

export class SlackChannelPattern extends Hashtag {
	constructor(value: string, label: string | null = null, required: boolean = true, language: string = 'en-US', ...customValidators: GenericValidation[]) {
		super(value, label, required, language, ...customValidators);
	}
}

export function createSlackChannelPattern(value: string, label: string | null = null, required: boolean = true, language: string = 'en-US', ...customValidators: GenericValidation[]) {
	return new SlackChannelPattern(value, label, required, language, ...customValidators);
}
