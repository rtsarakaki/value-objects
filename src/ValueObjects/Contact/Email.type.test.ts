import { describe, expect, test } from '@jest/globals';
import { Email } from './Email.type'
import { GenericError } from '../../Errors';

describe(`Testing valid emails`, () => {
	const arrayOfValidEmails = [
		{ value: 'teste@exemple.com.br', label: '' },
		{ value: 'firstname.lastname@exemple.com.br', label: '' },
		{ value: 'firstname.m.i.d.d.l.e.lastname@exemple.com.br', label: '' },
		{ value: 'test@example.com', label: '' },
		{ value: 'firstname.lastname@example.com', label: '' },
		{ value: 'firstname.m.i.d.d.l.e.lastname@example.com', label: '' },
		{ value: 'test123@example.com', label: '' },
		{ value: 'test+123@example.com', label: '' },
		{ value: 'test-123@example.com', label: '' },
		{ value: 'test.123@example.com', label: '' },
		{ value: 'test_123@example.com', label: '' },
		{ value: 'test@example.co.uk', label: '' },
		{ value: 'test@example.com.br', label: '' },
		{ value: 'test@example.io', label: '' },
		{ value: 'test@example.info', label: '' },
		{ value: 'test@example.net', label: '' },
		{ value: 'test@example.org', label: '' },
		{ value: 'test@example.xyz', label: '' },
	]
	
	describe.each(arrayOfValidEmails)(`%p is a valid email.`, ({ value, label }) => {
		const result = new Email(value, 'fix label', true)
		
		test(`Nenhum erro encontrado`, () => {
			expect(result.errors.length).toEqual(0)
		})
		
		if (result.errors.length > 0) {
			test.each(result.errors)(`Errors that should not have happened: %p`, (error: GenericError) => {
				expect(true).toBeTruthy()
			});
		}
	});
});

describe(`Testing invalid emails`, () => {
	const arrayOfInvalidEmails = [
		{ value: 'test........@example.xyz', label: '' },
		{ value: 'test@example', label: '' },
		{ value: 'test@example.', label: '' },
		{ value: 'test@.com', label: '' },
		{ value: 'test@example..com', label: '' },
		{ value: 'test@example.com.', label: '' },
		{ value: 'test@example-.com', label: '' },
		{ value: 'test@example.c', label: '' },
		{ value: 'test@example.12', label: '' },
		{ value: 'test@example.1234', label: '' },
		{ value: 'test@example.com@', label: '' },
		{ value: 'test@example.com@domain.com', label: '' },
		{ value: 'test@example.com@.com', label: '' },
		{ value: 'test@example.com@.example.com', label: '' },
	];

	describe.each(arrayOfInvalidEmails)(`%p is an invalid email.`, ({ value, label }) => {
		const result = new Email(value, 'fix label', true)

		test(`${result.errors.length} errors found.`, () => {
			expect(result.errors.length).toBeGreaterThan(0)
		})

		if (result.errors.length > 0) {
			test.each(result.errors)(`Errors that should not have happened: %p`, (error: GenericError) => {
				expect(true).toBeTruthy()
			});
		}
	});
});