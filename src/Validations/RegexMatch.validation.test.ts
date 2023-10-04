import { describe, expect, test } from '@jest/globals';
import { RegexMatch } from './RegexMatch.validation';
import { InvalidValue } from '../Errors';

describe(`List of valid values and expressions regex.`, () => {
	const arrayOfValidValuesAndRegex = [
		{ value: 'smart-value-objects', regex: '^[a-z0-9]+(-[a-z0-9]+)*$', label: 'Lib name', explanation: 'must contain only lowercase letters, numbers or dashes ' },
		{ value: 'one-note', regex: '^[a-z0-9]+(-[a-z0-9]+)*$', label: 'Lib name', explanation: 'must contain only lowercase letters, numbers or dashes ' },
		{ value: '1-1', regex: '^[a-z0-9-]+$', label: 'Lib name', explanation: 'must contain only lowercase letters, numbers or dashes ' },
		{ value: '0-0', regex: '^[a-z0-9-]+$', label: 'Lib name', explanation: 'must contain only lowercase letters, numbers or dashes ' },
		{ value: '0-1-2-3-4-5-6-7-8-9-0', regex: '^[a-z0-9-]+$', label: 'Lib name', explanation: 'must contain only lowercase letters, numbers or dashes ' },
		{ value: 'a-b-c-d-e-f-g', regex: '^[a-z0-9-]+$', label: 'Lib name', explanation: 'must contain only lowercase letters, numbers or dashes ' },
		{ value: '----a', regex: '^[a-z0-9-]+$', label: 'Lib name', explanation: 'must contain only lowercase letters, numbers or dashes ' },
	]
	describe.each(arrayOfValidValuesAndRegex)(`%j is valid.`, ({ value, regex, label, explanation }) => {

		const result = RegexMatch(value, label, regex, explanation)

		test(`Regex '${regex}' is valid.`, () => {
			expect(result?.message).not.toBe(`Regex '${regex}' is invalid.`)
		});

		test(`Value '${value}' meet the standard '${regex}' - ${result}.`, () => {
			expect(result).toBeNull()
		});

	});
});

describe(`List of invalid values and expressions regex.`, () => {
	const arrayOfInvalidValuesAndRegex = [
		{ value: 'smart--value-objects', regex: '^[a-z0-9]+(-[a-z0-9]+)*$', label: 'Lib name', explanation: 'must contain only lowercase letters, numbers or dashes ' },
		{ value: 'one--note', regex: '^[a-z0-9]+(-[a-z0-9]+)*$', label: 'Lib name', explanation: 'must contain only lowercase letters, numbers or dashes ' },
		{ value: 'A1', regex: '^[a-z0-9-]+$', label: 'Lib name', explanation: 'must contain only lowercase letters, numbers or dashes ' },
		{ value: '0 - 0', regex: '^[a-z0-9-]+$', label: 'Lib name', explanation: 'must contain only lowercase letters, numbers or dashes ' },
		{ value: ' 0-1-2-3-4-5-6-7-8-9-0', regex: '^[a-z0-9-]+$', label: 'Lib name', explanation: 'must contain only lowercase letters, numbers or dashes ' },
		{ value: 'a-b-c-d-e-f-g ', regex: '^[a-z0-9-]+$', label: 'Lib name', explanation: 'must contain only lowercase letters, numbers or dashes ' },
		{ value: '', regex: '^[a-z0-9-]+$', label: 'Lib name', explanation: 'must contain only lowercase letters, numbers or dashes ' },
	]
	describe.each(arrayOfInvalidValuesAndRegex)(`%j is invalid.`, ({ value, regex, label, explanation }) => {

		const result = RegexMatch(value, label, regex, explanation)

		test(`Regex '${regex}' is valid.`, () => {
			expect(result?.message).not.toBe(`Regex '${regex}' is invalid.`)
		});

		test(`Value '${value}' meet the standard '${regex}' - ${result}.`, () => {
			expect(result).toBeInstanceOf(InvalidValue)
		});

		test(`Error message is $message.`, () => {
			expect(result?.message).toEqual(`${label} ${explanation}.`);
		})

	});
});

describe('Invalid regex.', () => {
	const arrayOfInvalidRegex = [
		'(a - z]',
		'][',
		'(9-8\ ~&/ ))',
	]

	test.each(arrayOfInvalidRegex)(`%p is invalid.`, (regex) => {
		const result = RegexMatch('smart-valueobjects', 'my lib', regex, 'North')
		expect(result).toBeInstanceOf(InvalidValue)
		expect(result?.message).toBe(`Regex '${regex}' is invalid.`)
	})
})

describe('Invalid label', () => {
	const arrayOfInvalidLabels = [
		null,
		undefined,
		0,
		'',
		'     '
	]

	test.each(arrayOfInvalidLabels)(`%p is valid.`, (label) => {
		const result = RegexMatch('smart-valueobjects', label as string, '^[a-z0-9-]+$', 'North')
		expect(result).toBeInstanceOf(InvalidValue)
		expect(result?.message).toEqual('Label cannot be empty.')
	})
})