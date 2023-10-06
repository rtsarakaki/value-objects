import { describe, expect, test } from '@jest/globals';
import { InvalidValue } from '../Errors';
import { IsValidEmail } from './IsValidEmail.validation';

describe('IsValidEmail', () => {
	test.each([
		['teste.com.br', 'email'],
		['my&test@gmail.com', 'personal-email'],
		['mytest@gmail', 'corporate_email'],
		['mytest@gmail.com.x.x', 'corporate_email'],
		['123456', 'personalEmail'],
		['word', 'corporateEmail'],
		['color', 'email'],
		['\n', 'email'],
		['0RANGE', 'email'],
		[null, 'code'],
		[undefined, 'code'],
		[1, 'code'],
		['\n\n\n', 'name'],
	])('Invalid value %p with label %p', (value, label) => {
		const result = IsValidEmail(value as string, label);
		expect(result).toBeInstanceOf(InvalidValue);
		expect(result?.message).toEqual(`${label} must be a valid e-mail.`);
	});

	test.each([
		['test@gmail.com', 'email'],
		['test.email@gmail.com', 'personal-email'],
		['test.email.123@gmail.com', 'corporate_email'],
		['test.email.123@gmail.com.br', 'corporate_email'],
		['01.test.email.123@gmail.com.br', 'corporate_email'],
	])('Valid value %p with label %p', (value, label) => {
		const result = IsValidEmail(value, label);
		expect(result).toBeNull();
	});

	test.each([null, undefined, 0, '', '     '])('Invalid label %p', (label) => {
		const result = IsValidEmail('North', label as string);
		expect(result).toBeInstanceOf(InvalidValue);
		expect(result?.message).toEqual('Label cannot be empty.');
	});
});