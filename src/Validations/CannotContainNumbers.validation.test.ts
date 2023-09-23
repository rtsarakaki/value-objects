import { describe, expect, test } from '@jest/globals';
import InvalidValue from '../Errors/InvalidValue.error';
import { CannotContainNumbers } from './CannotContainNumbers.validation';

const arrayOfInvalidValues = [
	{ value: '0123456789', label: 'name' },
	{ value: '0', label: 'label zero' },
	{ value: '1', label: 'label one' },
	{ value: '2', label: 'label two' },
	{ value: '3', label: 'label three' },
	{ value: '4', label: 'label four' },
	{ value: '5', label: 'label five' },
	{ value: '6', label: 'label six' },
	{ value: '7', label: 'label seven' },
	{ value: '8', label: 'label eight' },
	{ value: '9', label: 'label nine' },
	{ value: '1 de maio', label: 'text' },
]

describe('Test a list of invalid values', () => {
	describe.each(arrayOfInvalidValues)('"$value" is invalid.', ({ value, label }) => {
		const result = CannotContainNumbers(value as string, label)
		test('Returns an invalid value error.', () => {
			expect(result).toBeInstanceOf(InvalidValue)
		});

		const errorMessage = `${label}  cannot contain numbers.`
		test(`Returned error message is "${errorMessage}"`, () => {
			expect(result?.message).toEqual(errorMessage)
		});

	});
});

const arrayOfValidValues = [
	{ value: 'a', label: 'name' },
	{ value: 'text without numbers', label: 'label zero' },
	{ value: 'primeiro de maio', label: 'text' },
	{ value: 'texto com acentuação e pontuação!', label: 'text' },
	{ value: 'Texto com caracteres especiais! @#$%^&*()[]{}<>| \/?,.', label: 'text' },
]

describe('Test a list of valid values', () => {
	test.each(arrayOfValidValues)('"$value" is valid.', ({ value, label }) => {
		const result = CannotContainNumbers(value as string, label)
		expect(result).toBeNull()
	});
});


const arrayOfInvalidLabels = [
	null,
	undefined,
	0,
	'',
	'     '
]

describe('Test a list of invalid labels.', () => {
	describe.each(arrayOfInvalidLabels)('"%s" is an invalid label.', (label) => {
		
		const result = CannotContainNumbers('North', label as string)
		test(`Returns an invalid value error.`, () => {
			expect(result).toBeInstanceOf(InvalidValue)
		});

		test(`Returned error message is "Label cannot be empty.".`, () => {
			expect(result?.message).toEqual('Label cannot be empty.')
		});
	})
})
