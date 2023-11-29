import { describe, expect, test } from '@jest/globals';
import { InvalidValue } from "../Errors";
import { IsValidHashtag } from './IsValidHashtag.validation';

describe(`Testing valid channels`, () => {
	const arrayOfValidChannels = [
		{ channel: '#general' },
		{ channel: '#general-123' },
		{ channel: '#general_123' },
		{ channel: '#general-123_abc' },
		{ channel: '#general_123-abc' },
		{ channel: '#general-123_abc-def' },
	]

	describe.each(arrayOfValidChannels)(`Valid channel '%p' should return null.`, ({ channel }) => {
		const result = IsValidHashtag(channel, 'Channel', true, 'en-US');
		test(`IsValidSlackChannel tested and return no errors.`, () => {
			expect(result).toBeNull();
		});
	});
});

describe(`Testing invalid channels`, () => {
	const arrayOfInvalidChannels = [
		{ channel: '', errorMessage: 'Channel is not a valid slack channel format.' },
		{ channel: '#general!', errorMessage: 'Channel is not a valid slack channel format.' },
		{ channel: '#general ', errorMessage: 'Channel is not a valid slack channel format.' },
		{ channel: '#general#', errorMessage: 'Channel is not a valid slack channel format.' },
		{ channel: '#general-', errorMessage: 'Channel is not a valid slack channel format.' },
		{ channel: '#general_', errorMessage: 'Channel is not a valid slack channel format.' },

	]

	describe.each(arrayOfInvalidChannels)(`Invalid channel '%p' should return an InvalidValue with message '%p'.`, ({ channel, errorMessage }) => {
		const result = IsValidHashtag(channel, 'Channel', true, 'en-US');
		test(`IsValidSlackChannel tested and return an InvalidValue with message '${errorMessage}'.`, () => {
			expect(result).toBeInstanceOf(InvalidValue);
			expect(result?.message).toEqual(errorMessage);
		});
	});
});