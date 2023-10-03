import { describe, expect, test } from '@jest/globals';
import { InvalidValue } from '../Errors';
import { CannotContainSpecialCharacters } from './CannotContainSpecialCharacters.validation';

test.todo('convert test to test.each model');

describe('CannotHaveSpecialCharacters', () => {

	test('Invalid values', () => {
		const invalidValues = [
			{ value: '123456*', label: 'name' },
			{ value: 'unit-test', label: 'name' },
			{ value: 'unit_test', label: 'name' },
			{ value: '0123456789 _+-.,!@#$%^&*();/|<>"', label: 'code' },
			{ value: 'https://marketplace.visualstudio.com/items?itemName=chrmarti.regex', label: 'url' },
			{ value: 'bar.ba@test.co.uk', label: 'email' },
			{ value: '+1-(800)-555-2468', label: 'phone' },
			{ value: '@', label: 'char' },
			{ value: '!', label: 'char' },
			{ value: '[', label: 'char' },
			{ value: ']', label: 'char' },
			{ value: '*', label: 'char' },
			{ value: '#', label: 'char' },
			{ value: '$', label: 'char' },
			{ value: '^', label: 'char' },
			{ value: '&', label: 'char' },
			{ value: '(', label: 'char' },
			{ value: ')', label: 'char' },
			{ value: '\\', label: 'char' },
			{ value: '/', label: 'char' },
			{ value: '%', label: 'char' },
			{ value: '-', label: 'char' },
			{ value: '=', label: 'char' },
			{ value: '+', label: 'char' },
			{ value: '?', label: 'char' },
			{ value: '<', label: 'char' },
			{ value: '>', label: 'char' },
			{ value: '{', label: 'char' },
			{ value: '}', label: 'char' },
			{ value: '|', label: 'char' },
			{ value: '"', label: 'char' },
			{ value: "'", label: 'char' },
			{ value: ';', label: 'char' },
			{ value: ':', label: 'char' },
			{ value: ',', label: 'char' },
			{ value: '.', label: 'char' },
			{ value: '_', label: 'char' },
			{ value: null, label: 'code' },
			{ value: undefined, label: 'code' },
			{ value: 1, label: 'code' },
		]

		invalidValues.map(({ value, label }) => {
			const result = CannotContainSpecialCharacters(value as string, label)
			expect(result).toBeInstanceOf(InvalidValue)
			expect(result?.message).toEqual(`${label} cannot contain special characters.`)
		})
	})

	test('Valid values', () => {
		const validValues = [
			{ value: 'abcdefghijklmnopqrstuvwxyz', label: 'name' },
			{ value: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz', label: 'name' },
			{ value: '0123456789', label: 'name' },
			{ value: 'value123', label: 'name' },
			{ value: 'ãéíóúêâàçÜüÃÉÊ', label: 'name' },
			{
				value: `Lorem ipsum dolor sit amet consectetur adipiscing elit
sed do eiusmod tempor incididunt ut labore et dolore magna
aliqua Ut enim ad minim veniam quis nostrud exercitation
ullamco laboris nisi ut aliquip ex ea commodo consequat
Duis aute irure dolor in reprehenderit in voluptate velit
esse cillum dolore eu fugiat nulla pariatur Excepteur sint
occaecat cupidatat non proident sunt in culpa qui officia
deserunt mollit anim id est laborum`, label: 'name'
			},
		]

		validValues.map(({ value, label }) => {
			const result = CannotContainSpecialCharacters(value, label)
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
			const result = CannotContainSpecialCharacters('North', label as string)
			expect(result).toBeInstanceOf(InvalidValue)
			expect(result?.message).toEqual('Label cannot be empty.')
		})
	})

}) 