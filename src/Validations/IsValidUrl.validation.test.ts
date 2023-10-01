import { describe, expect, test } from '@jest/globals';
import { InvalidValue } from '../Errors/InvalidValue.error';
import { IsValidUrl } from './IsValidUrl.validation';

describe('Invalid values', () => {
	const invalidValues = [
		{ value: 'teste', label: 'text' },
		{ value: 'https://www.mydomain.org//', label: 'double /' },
		{ value: 'www.mydomain.org/', label: 'www' },
		{ value: 'myname@mydomain.org', label: 'email' },
		{ value: null, label: 'code' },
		{ value: undefined, label: 'code' },
		{ value: 1, label: 'code' },
	]
	test.each(invalidValues)(`%p is invalid url.`, ({ value, label }) => {
		const result = IsValidUrl(value as string, label)
		expect(result).toBeInstanceOf(InvalidValue)
	});
})

describe('Valid values', () => {
	const arrayOfValidURL = [
		{ value: 'https://www.mydomain.org/', label: 'https' },
		{ value: 'https://www.mydomain.org', label: 'https' },
		{ value: 'http://www.mydomain.org/123', label: 'http' },
		{ value: 'http://www.mydomain.org/123', label: 'http' },
		{ value: 'http://www.mydomain/', label: 'http' },
		{ value: 'https://www.mydomain.com/template/AppDef?appName=app-876599309&appId=439c386f-00c6-4ca6-b66b-6aea9028c4cc&quickStart=False#Data.Columns._tb_sap_test', label: 'http' },
		{ value: 'mailto://mail@mydomain.org/', label: 'email' },
		{ value: 'ftp://mydomain.org/', label: 'ftp' },
	]

	test.each(arrayOfValidURL)(`$value is valid URL.`, ({ value }) => {
		const result = IsValidUrl(value, "validURL");
		expect(result).toBeNull()
	})
})


describe('Invalid label', () => {
	const labels = [
		null,
		undefined,
		0,
		'',
		'     '
	]

	test.each(labels)(``, (label) => {
		const result = IsValidUrl('North', label as string)
		expect(result?.message).toEqual('Label cannot be empty.')
	});
})

