import { describe, expect, test } from '@jest/globals';
import { InvalidValue } from '../Errors';
import { IsValidEmail } from './IsValidEmail.validation';

test.todo('convert test to test.each model');

describe('IsValidEmail', () => {

	test('Invalid values', () => {
		const invalidValues = [
			{ value: 'teste.com.br', label: 'email' },
			{ value: 'my&test@gmail.com', label: 'personal-email' },
			{ value: 'my_test@gmail.com', label: 'corporate_email' },
			{ value: 'mytest@gmail', label: 'corporate_email' },
			{ value: 'mytest@gmail.com.x.x', label: 'corporate_email' },
			{ value: 'my-test@gmail.com', label: 'corporate_email' },
			{ value: '123456', label: 'personalEmail' },
			{ value: 'word', label: 'corporateEmail' },
			{ value: 'color', label: 'email' },
			{ value: '\n', label: 'email' },
			{ value: '0RANGE', label: 'email' },
			{ value: null, label: 'code' },
			{ value: undefined, label: 'code' },
			{ value: 1, label: 'code' },
			{
				value: `
			`, label: 'name'
			}
		]

		invalidValues.map(({ value, label }) => {
			const result = IsValidEmail(value as string, label)
			expect(result).toBeInstanceOf(InvalidValue)
			expect(result?.message).toEqual(`${label} must be a valid e-mail.`)
		})
	})

	test('Valid values', () => {
		const validValues = [
			{ value: 'test@gmail.com', label: 'email' },
			{ value: 'test.email@gmail.com', label: 'personal-email' },
			{ value: 'test.email.123@gmail.com', label: 'corporate_email' },
			{ value: 'test.email.123@gmail.com.br', label: 'corporate_email' },
			{ value: '01.test.email.123@gmail.com.br', label: 'corporate_email' },
			{ value: 'M.Y.....E.M.A.I.L@gmail.com', label: 'corporateEmail' },
		]

		validValues.map(({ value, label }) => {
			const result = IsValidEmail(value, label)
			expect(result).toBeNull()
		})
	})

	test('Invalid label', () => {
		const labels = [
			null,
			undefined,
			0,
			'',
			'     '
		]

		labels.map(label => {
			const result = IsValidEmail('North', label as string)
			expect(result).toBeInstanceOf(InvalidValue)
			expect(result?.message).toEqual('Label cannot be empty.')
		})
	})

}) 