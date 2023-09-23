import { describe, expect, test } from '@jest/globals';
import InvalidValue from '../Errors/InvalidValue.error';
import { IsValidColor } from './IsValidColor.validation';

test.todo('convert test to test.each model');

describe('IsValidColor', () => {

	test('Invalid values', () => {
		const invalidValues = [
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

		invalidValues.map(({ value, label }) => {
			const result = IsValidColor(value as string, label)
			expect(result).toBeInstanceOf(InvalidValue)
			expect(result?.message).toEqual(`${label}  must be a valid color.`)
		})
	})

	test('Valid values', () => {
		const validValues = [
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

		validValues.map(({ value, label }) => {
			const result = IsValidColor(value, label)
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
			const result = IsValidColor('North', label as string)
			expect(result).toBeInstanceOf(InvalidValue)
			expect(result?.message).toEqual('Label cannot be empty.')
		})
	})

}) 