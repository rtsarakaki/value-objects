import { describe, expect, test } from '@jest/globals'; 
import { createContact } from './Contact.type';

describe('Contact', () => {
	describe('SlackChannel', () => {
		const validValues = ['#general', '#random', '#dev-team'];
		const invalidValues = ['general_', '_random_', '#dev-team#'];

		validValues.forEach((value) => {
			test(`should create a valid SlackChannel contact with value "${value}"`, () => {
				const contact = createContact(value, 'SlackChannel', 'A channel for team communication');
				expect(contact.value).toBe(value);
				expect(contact.type).toBe('SlackChannel');
				expect(contact.description).toBe('A channel for team communication');
				expect(contact.errors.length).toBe(0);
			});
		});

		invalidValues.forEach((value) => {
			test(`should return an error for an invalid SlackChannel contact with value "${value}"`, () => {
				const contact = createContact(value, 'SlackChannel', 'A channel for team communication');
				expect(contact.value).toBe(value);
				expect(contact.type).toBe('SlackChannel');
				expect(contact.description).toBe('A channel for team communication');
				expect(contact.errors.length).toBe(1);
			});
		});
	});

	describe('Email', () => {
		const validValues = ['john.doe@example.com', 'jane.doe@example.com', 'johndoe@example.com'];
		const invalidValues = ['john.doe', 'jane.doe@', '@example.com'];

		validValues.forEach((value) => {
			test(`should create a valid Email contact with value "${value}"`, () => {
				const contact = createContact(value, 'Email', 'An email address');
				expect(contact.value).toBe(value);
				expect(contact.type).toBe('Email');
				expect(contact.description).toBe('An email address');
				expect(contact.errors.length).toBe(0);
			});
		});

		invalidValues.forEach((value) => {
			test(`should return an error for an invalid Email contact with value "${value}"`, () => {
				const contact = createContact(value, 'Email', 'An email address');
				expect(contact.value).toBe(value);
				expect(contact.type).toBe('Email');
				expect(contact.description).toBe('An email address');
				expect(contact.errors.length).toBe(1);
			});
		});
	});

	describe('Phone', () => {
		const validValues = ['(21) 99999-9999', '(11) 9999-9999', '(31) 99999-9999'];
		const invalidValues = ['(21) 19999-9999', '(11) 99d9999', '2199999'];

		validValues.forEach((value) => {
			test(`should create a valid Phone contact with value "${value}"`, () => {
				const contact = createContact(value, 'Phone', 'A phone number');
				expect(contact.value).toBe(value);
				expect(contact.type).toBe('Phone');
				expect(contact.description).toBe('A phone number');
				expect(contact.errors.length).toBe(0);
			});
		});

		invalidValues.forEach((value) => {
			test(`should return an error for an invalid Phone contact with value "${value}"`, () => {
				const contact = createContact(value, 'Phone', 'A phone number');
				expect(contact.value).toBe(value);
				expect(contact.type).toBe('Phone');
				expect(contact.description).toBe('A phone number');
				expect(contact.errors.length).toBe(1);
			});
		});
	});
});