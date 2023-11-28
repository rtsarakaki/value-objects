import { validate } from 'class-validator';
import { IsValidFullName } from "../decorators/person/is-valid-full-name.decorator";

import { faker } from '@faker-js/faker';
import { IsValidEmail } from '../decorators/contact/is-valid-email.decorator';
import { IsValidPhoneNumberBR } from '../decorators/contact/is-valid-phone-number-br.decorator';
import { IsValidSlackChannelPattern } from '../decorators/contact/is-valid-slack-channel-pattern.decorator';
import { IsValidShortDate } from '../decorators/datatype/date/is-valid-short-date.decorator';
import { IsValidNumber } from '../decorators/datatype/number/is-valid-number.decorator';
import { IsValidPositiveInteger } from '../decorators/datatype/number/is-valid-positive-integer.decorator';
import { GenerateUUID } from '../decorators/datatype/string';
import { IsValidAcronym } from '../decorators/datatype/string/is-valid-acronym.decorator';
import { IsValidKebab } from '../decorators/datatype/string/is-valid-kebab.decorator';
import { IsValidLongDescription } from '../decorators/datatype/string/is-valid-long-description.decorator';
import { IsValidShortDescription } from '../decorators/datatype/string/is-valid-short-description.decorator';
import { IsValidSingleWord } from '../decorators/datatype/string/is-valid-single-word.decorator';
import { IsValidTitle } from '../decorators/datatype/string/is-valid-title.decorator';
import { IsValidUrlAddress } from '../decorators/internet';
import { IsValidAbbreviatedName, IsValidCardName } from '../decorators/person';
import { IsValidHashtag } from '../decorators/internet/is-valid-hashtag.decorator';

const name = faker.person.firstName() + ' ' + faker.person.lastName() + ' ' + faker.person.lastName()
const teste = {
	fullname: name,
	abbreviatedName: name,
	cardName: name,
	uuid: faker.string.uuid(),
	acronym: faker.location.state({ abbreviated: true }),
	kebab: faker.helpers.slugify(faker.lorem.words(2)),
	longDescription: faker.lorem.paragraph(),
	shortDescription: faker.lorem.sentence(),
	singleWord: faker.lorem.word(),
	title: faker.lorem.sentence(),
	number: faker.number.float(),
	positiveInteger: faker.number.int(),
	url: faker.internet.url(),
	date: faker.date.anytime(),
	email: faker.internet.email(),
	phone: faker.phone.number('(##) 9####-####'),
	slack: `#${faker.lorem.word()}`,
	hashtag: `#${faker.lorem.word()}`.toUpperCase(),
}

class TestClass {

	@GenerateUUID()
	uuid?: string;

	@IsValidFullName()
	fullName: string;

	@IsValidAbbreviatedName()
	abbreviatedName: string;

	@IsValidCardName()
	cardName: string;

	@IsValidAcronym()
	acronym?: string;

	@IsValidKebab()
	kebab?: string;

	@IsValidLongDescription()
	longDescription?: string;

	@IsValidShortDescription()
	shortDescription?: string;

	@IsValidSingleWord()
	singleWord?: string;

	@IsValidTitle()
	title?: string;

	@IsValidNumber(10001, 0)
	number?: number;

	@IsValidPositiveInteger(8799860830502912, 100000)
	positiveInteger?: number;

	@IsValidUrlAddress()
	url?: string;

	@IsValidShortDate('yyyy-MM-dd')
	date?: string;

	@IsValidEmail()
	email?: string;

	@IsValidPhoneNumberBR()
	phone?: string;

	@IsValidSlackChannelPattern()
	slack?: string;

	@IsValidHashtag()
	hashtag?: string;

	errors?: any[];

	constructor(teste: any) {
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

validate(sut).then(errors => {
	if (errors.length > 0) {
		console.log('Validation failed. errors: ', errors);
		const c = errors[0].target as TestClass;
		console.log('Validation failed. target: ', c.errors);
	} else {
		console.log('Validation succeeded.');
	}
});