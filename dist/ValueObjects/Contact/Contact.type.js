"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createContact = exports.Contact = void 0;
const Errors_1 = require("../../Errors");
const Messages_resource_1 = require("../../Resources/Messages.resource");
const Types_1 = require("../../Types");
const ShortDescription_type_1 = require("../StringLiteral/ShortDescription.type");
const Email_type_1 = require("./Email.type");
const PhoneNumberBR_type_1 = require("./PhoneNumberBR.type");
const SlackChannelPattern_type_1 = require("./SlackChannelPattern.type");
class Contact extends Types_1.GenericType {
    constructor(value, type, description, label = null, required = true, emailDomainBlackList = [], emailDomainWhiteList = [], language = 'en-US', ...customValidators) {
        super(value);
        const msg = label ?? 'Contact';
        switch (type) {
            case 'SlackChannel':
                const slackChannel = new SlackChannelPattern_type_1.SlackChannelPattern(value, msg, required, language, ...customValidators);
                this.errors = slackChannel.errors.length > 0 ? slackChannel.errors : [];
                this.value = slackChannel.value;
                break;
            case 'Email':
                const email = new Email_type_1.Email(value, msg, required, emailDomainBlackList, emailDomainWhiteList, language, ...customValidators);
                this.errors = email.errors.length > 0 ? email.errors : [];
                this.value = email.value;
                break;
            case 'Phone':
                const phone = new PhoneNumberBR_type_1.PhoneNumberBR(value, msg, required, language, ...customValidators);
                this.errors = phone.errors.length > 0 ? phone.errors : [];
                this.value = phone.value;
                break;
            default:
                const errorMessage = (0, Messages_resource_1.getResourceMessageByKey)("ContactWithoutType", language);
                this.errors.push(new Errors_1.InvalidValue(errorMessage, null));
                break;
        }
        this._description = new ShortDescription_type_1.ShortDescription(description, msg, false, language, ...customValidators);
        this._type = type;
    }
    get description() {
        return this._description.value;
    }
    get type() {
        return this._type;
    }
}
exports.Contact = Contact;
function createContact(value, type, description, label = null, required = true, emailDomainBlackList = [], emailDomainWhiteList = [], language = 'en-US', ...customValidators) {
    return new Contact(value, type, description, label, required, emailDomainBlackList, emailDomainWhiteList, language, ...customValidators);
}
exports.createContact = createContact;
