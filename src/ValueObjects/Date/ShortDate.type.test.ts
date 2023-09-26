import { describe, expect, test } from '@jest/globals';
import { ShortDate, createShortDate, shortDateFormat } from './ShortDate.type';
import { InvalidValue } from '../../Errors';

describe('Testing a list of valid dates', () => {
    const arrayOfValidDates = [
        { date: ' 2023-09-01T00:00:00.000Z', format: 'dd/MM/yyyy', expected: '01/09/2023' },
        { date: '2023-10-26T00:00:00.000Z', format: 'yyyy-MM-dd', expected: '2023-10-26' },
        { date: '2023-10-26T01:00:00.000Z', format: 'yyyy-MM-dd', expected: '2023-10-26' },
        { date: '2023-10-26T02:00:00.000Z', format: 'yyyy-MM-dd', expected: '2023-10-26' },
        { date: '2023-10-26T03:00:00.000Z', format: 'yyyy-MM-dd', expected: '2023-10-26' },
        { date: '2023-10-26T04:00:00.000Z', format: 'yyyy-MM-dd', expected: '2023-10-26' },
        { date: '2023-09-01T14:55:00.000Z', format: 'MM/dd/yyyy', expected: '09/01/2023' },
        { date: '2023-09-01T14:55:00.000Z', format: 'yyyy-MM-dd', expected: '2023-09-01' },
        { date: '2023-09-28T14:55:00.000Z', format: 'dd/MM/yyyy', expected: '28/09/2023' },
        { date: '2023-09-28T14:55:00.000Z', format: 'MM/dd/yyyy', expected: '09/28/2023' },
        { date: '2023-09-28T14:55:00.000Z', format: 'yyyy-MM-dd', expected: '2023-09-28' },
        { date: '09/28/2023', format: 'MM/dd/yyyy', expected: '09/28/2023' },
        { date: '09/28/2023 ', format: 'yyyy-MM-dd', expected: '2023-09-28' },
        { date: '09/28/553', format: 'dd/MM/yyyy', expected: '28/09/0553' },
        { date: '09/28/553', format: 'MM/dd/yyyy', expected: '09/28/0553' },
        { date: '09/28/553', format: 'yyyy-MM-dd', expected: '0553-09-28' },
        { date: '02/28/3553', format: 'dd/MM/yyyy', expected: '28/02/3553' },
        { date: '02/28/3553', format: 'MM/dd/yyyy', expected: '02/28/3553' },
        { date: '02/28/3553', format: 'yyyy-MM-dd', expected: '3553-02-28' },
    ]

    describe.each(arrayOfValidDates)('"$date" is a valid date.', ({ date, format, expected }) => {

        const shortDate = createShortDate(date, "date", format)

        test(`No errors found, so the "${date}" is a valid date.`, () => {
            expect(shortDate.errors.length).toBe(0)
        });

        if (shortDate.errors.length > 0) {
            describe('Listing errors', () => {
                test.each(shortDate.errors)(`%p`, (error) => {
                    const result = true
                    expect(result).toBeTruthy()
                });
            });
        }

        test(`${date} formated is "${shortDate.value}" and the expected is "${expected}".`, () => {
            expect(shortDate.value).toBe(expected)
        });

        const firstReleaseDate = new ShortDate(date, 'first release date', 'yyyy-MM-dd')
        const formatedDate = firstReleaseDate.isValid ? shortDateFormat(date, 'yyyy-MM-dd') : ''
        const dateDay = new Date(date.trim()).getUTCDate()
        const firstReleaseDateDay = new Date(firstReleaseDate.value).getUTCDate()
        const formatedDateDay = new Date(formatedDate).getUTCDate()

        test(`Initial value were ${new Date(date)}, then after convert to shortDate goes to ${firstReleaseDate.value} and at the end was formated to ${formatedDate}`, () => {
            expect(firstReleaseDate.value).toBe(formatedDate)
        });

        test(`firstReleaseDate ${firstReleaseDate.value} - dateDay ${dateDay} = firstReleaseDateDay ${firstReleaseDateDay}`, () => {
            expect(dateDay).toEqual(firstReleaseDateDay)
        });

        test(`formatedDate ${formatedDate} - dateDay ${dateDay} = formatedDateDay ${formatedDateDay}`, () => {
            expect(dateDay).toEqual(formatedDateDay)
        });

    })
})

describe('Testing a list of invalid dates', () => {
    const arrayOfInvalidDates = [
        { date: 'abc', format: 'dd/MM/yyyy', expected: '01/09/2023' },
        // { date: '13/28/2023', format: 'dd/MM/yyyy', expected: '28/09/2023' },
    ]

    describe.each(arrayOfInvalidDates)('"$date" is a invalid date.', ({ date, format, expected }) => {

        const shortDate = createShortDate(date, "date", format)

        test(`${shortDate.errors.length} errors found, so the "${date}" is an invalid date.`, () => {
            expect(shortDate.errors.length).toBeGreaterThan(0)
        });

    })
})

