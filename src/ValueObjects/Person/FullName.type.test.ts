import { describe, expect, test } from '@jest/globals';
import { FullName, createFullName } from './FullName.type';


describe('FullName value object', () => {
    test('Valid FullName Values.', () => {
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

        arrayOfValidNames.map(({ name, result, middleName }) => {

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
            expect(fullName.middleName).toEqual(middleName)
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

    test('Testing contrutor directly', () => {
        const result = new FullName('Ricardo', '')
        expect(result.value).toBe('Ricardo');
    })
})