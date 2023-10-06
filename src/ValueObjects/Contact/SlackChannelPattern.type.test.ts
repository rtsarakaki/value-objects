import { describe, expect, test } from '@jest/globals';
import { SlackChannelPattern } from './SlackChannelPattern.type';
import { GenericError } from '../../Errors';

describe(`Testing valid Slack channels`, () => {
	const arrayOfValidChannels = [
		{ value: '#general' },
		{ value: 'random' },
		{ value: 'my-channel' },
		{ value: 'mychannel' },
		{ value: 'my_channel' },
		{ value: 'mychannel123' },
		{ value: 'mychannel_123' },
		{ value: 'mychannel-123' },
		{ value: 'mychannel.123' },
		{ value: 'mychannel1234' },
		{ value: 'a' },
		{ value: 'a'.repeat(80) },
	]

	describe.each(arrayOfValidChannels)(`%p is a valid Slack channel.`, ({ value }) => {
		const result = new SlackChannelPattern(value, 'fix label', true)

		test(`No errors found.`, () => {
			expect(result.errors.length).toEqual(0)
		})

		if (result.errors.length > 0) {
			test.each(result.errors)(`Errors that should not have happened: %p`, (error: GenericError) => {
				expect(true).toBeTruthy()
			});
		}
	});
});

describe(`Testing invalid Slack channels`, () => {
	const arrayOfInvalidChannels = [
		{ value: '', label: '' },
		{ value: ' ', label: '' },
		{ value: 'a'.repeat(81), label: '' },
		{ value: 'my channel', label: '' },
		{ value: 'my/channel', label: '' },
		{ value: 'my\\channel', label: '' },
		{ value: 'my channel 123', label: '' },
		{ value: 'my/channel/123', label: '' },
		{ value: 'my\\channel\\123', label: '' },
	];

	describe.each(arrayOfInvalidChannels)(`%p is an invalid Slack channel.`, ({ value, label }) => {
		const result = new SlackChannelPattern(value, 'fix label', true)

		test(`${result.errors.length} errors found.`, () => {
			expect(result.errors.length).toBeGreaterThan(0)
		})

		if (result.errors.length > 0) {
			test.each(result.errors)(`Errors that should not have happened: %p`, (error: GenericError) => {
				expect(true).toBeTruthy()
			});
		}
	});
});