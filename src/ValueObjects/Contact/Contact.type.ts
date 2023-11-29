import { GenericError, InvalidValue } from "../../Errors";
import { getResourceMessageByKey } from "../../Resources/Messages.resource";
import { GenericType, GenericValidation } from "../../Types";
import { ShortDescription } from "../StringLiteral/ShortDescription.type";
import { Email } from "./Email.type";
import { PhoneNumberBR } from "./PhoneNumberBR.type";
import { SlackChannelPattern } from "./SlackChannelPattern.type";

export type ContactType = 'SlackChannel' | 'Email' | 'Phone';

export class Contact extends GenericType {
	_type: ContactType
	_description: ShortDescription

	constructor(value: string, type: ContactType, description: string, label: string | null = null, required: boolean = true, emailDomainBlackList: string[] = [], emailDomainWhiteList: string[] = [], language: string = 'en-US', ...customValidators: GenericValidation[]) {
		super(value);

		const msg = label ?? 'Contact';

		switch (type) {
			case 'SlackChannel':
				const slackChannel = new SlackChannelPattern(value, msg, required, language, ...customValidators);
				this.errors = slackChannel.errors.length > 0 ? slackChannel.errors : [];
				this.value = slackChannel.value;
				break;
			case 'Email':
				const email = new Email(value, msg, required, emailDomainBlackList, emailDomainWhiteList, language, ...customValidators);
				this.errors = email.errors.length > 0 ? email.errors : [];
				this.value = email.value;
				break;
			case 'Phone':
				const phone = new PhoneNumberBR(value, msg, required, language, ...customValidators);
				this.errors = phone.errors.length > 0 ? phone.errors : [];
				this.value = phone.value;
				break;
			default:
				const errorMessage = getResourceMessageByKey("ContactWithoutType", language)
				this.errors.push(new InvalidValue(errorMessage, null))
				break;
		}

		this._description = new ShortDescription(description, msg, false, language, ...customValidators);
		
		this._type = type;
	}

	get description() {
		return this._description.value
	}

	get type() {
		return this._type
	}

}

export function createContact(value: string, type: ContactType, description: string, label: string | null = null, required: boolean = true, emailDomainBlackList: string[] = [], emailDomainWhiteList: string[] = [], language: string = 'en-US', ...customValidators: GenericValidation[]) {
	return new Contact(value, type, description, label, required, emailDomainBlackList, emailDomainWhiteList, language, ...customValidators);
}