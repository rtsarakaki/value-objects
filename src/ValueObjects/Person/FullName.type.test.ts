import { describe, expect, test } from '@jest/globals';
import { createFullName } from './FullName.type';


describe('FullName value object', () => {
    test('Valid FullName Values.', () => {
        const arrayOfValidNames = [
            { name: 'Ricardo', result: 'Ricardo' },
            { name: 'Ricardo Arakaki', result: 'Ricardo Arakaki' },
            { name: 'ricardo    arakaki', result: 'Ricardo Arakaki' },
            { name: 'ed    carnieto', result: 'Ed Carnieto' },
            { name: 'Dom Pedro 1', result: 'Dom Pedro' },
            { name: 'Dom Pedro I', result: 'Dom Pedro I' },
            { name: 'ricardo t. s. arakaki@', result: 'Ricardo T S Arakaki' },
            { name: '    josé da silva e costa    ', result: 'José da Silva e Costa' },
        ]

        arrayOfValidNames.map(({ name, result }) => {

            const partsOfName = result?.split(' ') ?? [];
            if (partsOfName.length === 0) return ''
            const firstName = partsOfName[0];

            if (partsOfName.length <= 1) return ''
            const lastName = partsOfName.at(-1) ?? '';

            const fullName = createFullName(name, "Name")
            expect(fullName.value).toBe(result)
            expect(fullName.errors.length).toBe(0)
            expect(fullName.firstName).toEqual(firstName)
            expect(fullName.lastName).toEqual(lastName)
        })
    })

    test('Invalid FullName Values', () => {
        const arrayOfInvalidNames = [
            { name: '', result: 2 },
            { name: 'R', result: 1 },
            { name: 'R...', result: 1 },
            { name: '......', result: 2 },
            { name: '123456', result: 2 },
            { name: ' . . . . . ', result: 2 },
            { name: ' a ', result: 1 },
            { name: 'aaaaaaaaaa aaaaaaaaaa aaaaaaaaaa aaaaaaaaa aaaaaaaaaa', result: 1 },
        ]

        arrayOfInvalidNames.map(({ name, result }) => {
            const fullName = createFullName(name, "Name")
            expect(fullName.errors.length).toBe(result)
        })
    })
})