import { describe, expect, test } from '@jest/globals';
import { FullName, createFullName } from './FullName.type';

describe('Testing a list of valid names', () => {
    const arrayOfValidNames = [
        { name: 'Ricardo', result: 'Ricardo', middleName: '' },
        { name: 'Ricardo Arakaki', result: 'Ricardo Arakaki', middleName: '' },
        { name: 'ricardo    arakaki', result: 'Ricardo Arakaki', middleName: '' },
        { name: 'ed    carnieto', result: 'Ed Carnieto', middleName: '' },
        { name: 'Dom Pedro 1', result: 'Dom Pedro', middleName: '' },
        { name: 'Dom Pedro I', result: 'Dom Pedro I', middleName: 'Pedro' },
        { name: 'ricardo t. s. arakaki@', result: 'Ricardo T S Arakaki', middleName: 'T S' },
        { name: '    josé da silva e costa    ', result: 'José da Silva e Costa', middleName: 'da Silva e' },
    ]

    describe.each(arrayOfValidNames)('"$name" is a valid name.', ({ name, result, middleName }) => {
        const partsOfName = result?.split(' ') ?? [];

        if (partsOfName.length > 0) {
            const firstName = partsOfName[0];

            const fullName = createFullName(name, "Name")

            test(`Fullname formated is "${result}".`, () => {
                expect(fullName.value).toBe(result)
            });

            test(`Firstname is ${firstName}.`, () => {
                expect(fullName.firstName).toEqual(firstName)
            });

            if (partsOfName.length > 1) {
                const lastName = partsOfName.at(-1) ?? '';
                test(`LastName is ${lastName}.`, () => {
                    expect(fullName.lastName).toEqual(lastName)
                });
            }
            else {
                test(`There is no lastName.`, () => {
                    expect(partsOfName.length).toEqual(1)
                });

            }

            if (partsOfName.length > 2) {
                test(`MiddleName is ${middleName}.`, () => {
                    expect(fullName.middleName).toEqual(middleName)
                });
            }
            else {
                test(`There is no middleName.`, () => {
                    expect(fullName.middleName).toBe("")
                });
            }

            test(`No errors found, so the "${name}" is a valid name.`, () => {
                expect(fullName.errors.length).toBe(0)
            });

        }
    });
});

describe('Test a list of invalid names', () => {
    const arrayOfInvalidNames = [
        { name: '', errorsLenght: 2 },
        { name: 'R', errorsLenght: 1 },
        { name: 'R...', errorsLenght: 1 },
        { name: '......', errorsLenght: 2 },
        { name: '123456', errorsLenght: 2 },
        { name: ' . . . . . ', errorsLenght: 2 },
        { name: ' a ', errorsLenght: 1 },
        { name: 'aaaaaaaaaa aaaaaaaaaa aaaaaaaaaa aaaaaaaaa aaaaaaaaaa', errorsLenght: 1 },
    ]

    describe.each(arrayOfInvalidNames)('"$name" is invalid.', ({ name, errorsLenght }) => {
        const fullName = createFullName(name, "Name");
        test(`${fullName.errors.length} errors found, so the "${name}" is an invalid name.`, () => {
            expect(fullName.errors.length).toBeGreaterThan(0)
        });
        test(`${fullName.errors}`, () => {
            expect(fullName.errors.length).toBeGreaterThan(0)
        });
    });
});

test('Testing contrutor directly', () => {
    const result = new FullName('Ricardo', '')
    expect(result.value).toBe('Ricardo');
})
