import { describe, expect, test } from '@jest/globals';
import { validateLabel } from './ValidationsTools';
import InvalidValue from '../Errors/InvalidValue.error';

describe('ValidationsTools', () => {

	test('validateLabel invalid values', () => {
		const labels = [
			null,
			undefined,
			0,
			'',
			'     '
		]

		labels.map(label => {
			const result = validateLabel(label as string)
			expect(result).toBeInstanceOf(InvalidValue)
			expect(result?.message).toEqual('Label cannot be empty.')
		})
	})

	test('validateLabel valid values', () => {
		const labels = [
			'name',
			'first name',
			'First Name',
			'LAST NAME',
			' LAST NAME ',
		]

		labels.map(label => {
			const result = validateLabel(label as string)
			expect(result).toBeNull()
		})
	})
})