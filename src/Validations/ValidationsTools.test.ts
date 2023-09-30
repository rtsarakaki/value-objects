import { describe, expect, test } from '@jest/globals';
import { validateLabel } from './ValidationsTools';
import { InvalidValue } from '../Errors/InvalidValue.error';

describe('validateLabel invalid values', () => {
	const arrayOfInvalidLabels = [
		null,
		undefined,
		0,
		'',
		'     '
	]

	describe.each(arrayOfInvalidLabels)(`Label %p is invalid.`, (label) => {
		
		const result = validateLabel(label as string)
		test(`Label %p generate an InvalidValue error`, () => {
			expect(result).toBeInstanceOf(InvalidValue)
		})

		test(`Label %perror mesage is 'Label cannot be empty.'`, () => {
			expect(result?.message).toEqual('Label cannot be empty.')
		})
	})
})

describe('validateLabel valid values', () => {
	const arrayOfValidLabels = [
		'name',
		'first name',
		'First Name',
		'LAST NAME',
		' LAST NAME ',
	]

	describe.each(arrayOfValidLabels)(`Label %p is valid.`, (label) => {
		const result = validateLabel(label)
		expect(result).toBeNull()
	})
})

