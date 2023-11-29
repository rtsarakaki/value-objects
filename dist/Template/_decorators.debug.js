"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const class_validator_1 = require("class-validator");
const is_valid_full_name_decorator_1 = require("../decorators/person/is-valid-full-name.decorator");
const faker_1 = require("@faker-js/faker");
const is_valid_email_decorator_1 = require("../decorators/contact/is-valid-email.decorator");
const is_valid_phone_number_br_decorator_1 = require("../decorators/contact/is-valid-phone-number-br.decorator");
const is_valid_slack_channel_pattern_decorator_1 = require("../decorators/contact/is-valid-slack-channel-pattern.decorator");
const is_valid_short_date_decorator_1 = require("../decorators/datatype/date/is-valid-short-date.decorator");
const is_valid_number_decorator_1 = require("../decorators/datatype/number/is-valid-number.decorator");
const is_valid_positive_integer_decorator_1 = require("../decorators/datatype/number/is-valid-positive-integer.decorator");
const string_1 = require("../decorators/datatype/string");
const is_valid_acronym_decorator_1 = require("../decorators/datatype/string/is-valid-acronym.decorator");
const is_valid_kebab_decorator_1 = require("../decorators/datatype/string/is-valid-kebab.decorator");
const is_valid_long_description_decorator_1 = require("../decorators/datatype/string/is-valid-long-description.decorator");
const is_valid_short_description_decorator_1 = require("../decorators/datatype/string/is-valid-short-description.decorator");
const is_valid_single_word_decorator_1 = require("../decorators/datatype/string/is-valid-single-word.decorator");
const is_valid_title_decorator_1 = require("../decorators/datatype/string/is-valid-title.decorator");
const internet_1 = require("../decorators/internet");
const person_1 = require("../decorators/person");
const is_valid_hashtag_decorator_1 = require("../decorators/internet/is-valid-hashtag.decorator");
const name = faker_1.faker.person.firstName() + ' ' + faker_1.faker.person.lastName() + ' ' + faker_1.faker.person.lastName();
const teste = {
    fullname: name,
    abbreviatedName: name,
    cardName: name,
    uuid: faker_1.faker.string.uuid(),
    acronym: faker_1.faker.location.state({ abbreviated: true }),
    kebab: faker_1.faker.helpers.slugify(faker_1.faker.lorem.words(2)),
    longDescription: faker_1.faker.lorem.paragraph(),
    shortDescription: faker_1.faker.lorem.sentence(),
    singleWord: faker_1.faker.lorem.word(),
    title: faker_1.faker.lorem.sentence(),
    number: faker_1.faker.number.float(),
    positiveInteger: faker_1.faker.number.int(),
    url: faker_1.faker.internet.url(),
    date: faker_1.faker.date.anytime(),
    email: faker_1.faker.internet.email(),
    phone: faker_1.faker.phone.number('(##) 9####-####'),
    slack: `#${faker_1.faker.lorem.word()}`,
    hashtag: `#${faker_1.faker.lorem.word()}`.toUpperCase(),
};
class TestClass {
    constructor(teste) {
        this.fullName = teste.fullname;
        this.abbreviatedName = teste.abbreviatedName;
        this.cardName = teste.cardName;
        this.uuid = teste.uuid;
        this.acronym = teste.acronym;
        this.kebab = teste.kebab;
        this.longDescription = teste.longDescription;
        this.shortDescription = teste.shortDescription;
        this.singleWord = teste.singleWord;
        this.title = teste.title;
        this.number = teste.number;
        this.positiveInteger = teste.positiveInteger;
        this.url = teste.url;
        this.date = teste.date;
        this.email = teste.email;
        this.phone = teste.phone;
        this.slack = teste.slack;
        this.hashtag = teste.hashtag;
    }
}
__decorate([
    (0, string_1.GenerateUUID)()
], TestClass.prototype, "uuid", void 0);
__decorate([
    (0, is_valid_full_name_decorator_1.IsValidFullName)()
], TestClass.prototype, "fullName", void 0);
__decorate([
    (0, person_1.IsValidAbbreviatedName)()
], TestClass.prototype, "abbreviatedName", void 0);
__decorate([
    (0, person_1.IsValidCardName)()
], TestClass.prototype, "cardName", void 0);
__decorate([
    (0, is_valid_acronym_decorator_1.IsValidAcronym)()
], TestClass.prototype, "acronym", void 0);
__decorate([
    (0, is_valid_kebab_decorator_1.IsValidKebab)()
], TestClass.prototype, "kebab", void 0);
__decorate([
    (0, is_valid_long_description_decorator_1.IsValidLongDescription)()
], TestClass.prototype, "longDescription", void 0);
__decorate([
    (0, is_valid_short_description_decorator_1.IsValidShortDescription)()
], TestClass.prototype, "shortDescription", void 0);
__decorate([
    (0, is_valid_single_word_decorator_1.IsValidSingleWord)()
], TestClass.prototype, "singleWord", void 0);
__decorate([
    (0, is_valid_title_decorator_1.IsValidTitle)()
], TestClass.prototype, "title", void 0);
__decorate([
    (0, is_valid_number_decorator_1.IsValidNumber)(10001, 0)
], TestClass.prototype, "number", void 0);
__decorate([
    (0, is_valid_positive_integer_decorator_1.IsValidPositiveInteger)(8799860830502912, 100000)
], TestClass.prototype, "positiveInteger", void 0);
__decorate([
    (0, internet_1.IsValidUrlAddress)()
], TestClass.prototype, "url", void 0);
__decorate([
    (0, is_valid_short_date_decorator_1.IsValidShortDate)('yyyy-MM-dd')
], TestClass.prototype, "date", void 0);
__decorate([
    (0, is_valid_email_decorator_1.IsValidEmail)()
], TestClass.prototype, "email", void 0);
__decorate([
    (0, is_valid_phone_number_br_decorator_1.IsValidPhoneNumberBR)()
], TestClass.prototype, "phone", void 0);
__decorate([
    (0, is_valid_slack_channel_pattern_decorator_1.IsValidSlackChannelPattern)()
], TestClass.prototype, "slack", void 0);
__decorate([
    (0, is_valid_hashtag_decorator_1.IsValidHashtag)()
], TestClass.prototype, "hashtag", void 0);
const sut = new TestClass(teste);
console.log('uuid', sut.uuid);
console.log('fullName', sut.fullName);
console.log('abbreviatedName', sut.abbreviatedName);
console.log('cardName', sut.cardName);
console.log('acronym', sut.acronym);
console.log('kebab', sut.kebab);
console.log('longDescription', sut.longDescription);
console.log('shortDescription', sut.shortDescription);
console.log('singleWord', sut.singleWord);
console.log('title', sut.title);
console.log('number', sut.number);
console.log('positiveInteger', sut.positiveInteger);
console.log('url', sut.url);
console.log('date', sut.date);
console.log('email', sut.email);
console.log('phone', sut.phone);
console.log('slack', sut.slack);
console.log('hashtag', sut.hashtag);
(0, class_validator_1.validate)(sut).then(errors => {
    if (errors.length > 0) {
        console.log('Validation failed. errors: ', errors);
        const c = errors[0].target;
        console.log('Validation failed. target: ', c.errors);
    }
    else {
        console.log('Validation succeeded.');
    }
});
