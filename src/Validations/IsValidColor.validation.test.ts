import { describe, expect, test } from '@jest/globals';
import { InvalidValue } from '../Errors';
import { IsValidColor } from './IsValidColor.validation';

describe('Test a list of valid colors', () => {
	const arrayOfValidColors = [
		{ value: 'BLUE', label: 'bgcolor' },
		{ value: 'OrAnGe', label: 'bgcolor' },
		{ value: 'green', label: 'foreColor' },
		{ value: '#FFFFFF', label: 'backGround' },
		{ value: ' black ', label: 'color' },
		{ value: 'rgb(0 0 0)', label: 'rgb' },
		{ value: '#bada55', label: 'hex' },
		{ value: 'LightGoldenrodYellow', label: 'name' },
		{ value: 'currentColor', label: 'special name' },
		{ value: 'rgba(0, 0, 0, .45)', label: 'rgba' },
		{ value: 'hsl(4.71239rad, 60%, 70%)', label: 'hsl' },
		{ value: 'hsla(180deg 100% 50% / .8)', label: 'hsla' },
		{ value: 'hwb(180deg 0% 0% / 100%)', label: 'hwb' },
		{ value: 'lch(54.292% 106.839 40.853)', label: 'lch' },
	]

	test.each(arrayOfValidColors)('$value is a valid color.', ({ value, label }) => {
		const result = IsValidColor(value, label)
		expect(result).toBeNull()
	});
});

describe('Test a list of invalid labels.', () => {
	const arrayOfInvalidLabels = [
		null,
		undefined,
		0,
		'',
		'     '
	]

	describe.each(arrayOfInvalidLabels)('"%s" is an invalid label.', (label) => {

		const result = IsValidColor('North', label as string)
		test(`Returns an invalid value error.`, () => {
			expect(result).toBeInstanceOf(InvalidValue)
		});

		test(`Returned error message is "Label cannot be empty.".`, () => {
			expect(result?.message).toEqual('Label cannot be empty.')
		});
	})
})


describe('Test a list of invalid colors', () => {
	const arrayOfInvalidColors = [
		{ value: 'amarelo', label: 'name' },
		{ value: ' ', label: 'name' },
		{ value: '      ', label: 'name' },
		{ value: '123456', label: 'name' },
		{ value: 'word', label: 'name' },
		{ value: 'color', label: 'name' },
		{ value: '\n', label: 'name' },
		{ value: '0RANGE', label: 'name' },
		{ value: null, label: 'code' },
		{ value: undefined, label: 'code' },
		{ value: 1, label: 'code' },
		{
			value: `
			`, label: 'name'
		}
	]

	describe.each(arrayOfInvalidColors)('$value is invalid.', ({ value, label }) => {

		const result = IsValidColor(value as string, label)
		test(`The value ${value} returns an InvalidValue error.`, () => {
			expect(result).toBeInstanceOf(InvalidValue)
		})

		test(`Error returned is ${result?.message}.`, () => {
			expect(result?.message).toEqual(`${label} must be a valid color.`)
		})
	})

});
