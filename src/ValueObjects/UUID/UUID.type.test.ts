import { describe, expect, test } from '@jest/globals';
import { createUUID } from './UUID.type';

test('Generate 1000 different IDs.', () => {

	function generateUniqueUUIDs(count: number) {
		const uuids = new Set<string>();
		while (uuids.size < count) {
			const newID = createUUID(null, "test label")
			uuids.add(newID.value);
		}
		return uuids;
	}

	const uuids = generateUniqueUUIDs(1000);
	expect(uuids.size).toBe(1000);
});

const arrayOfValues = [
	"1", 'a', '#FFFFFF'
]

describe.each(arrayOfValues)('Se for passado um ID o objeto deve assumir este id como valor', (value) => {

	test(`The value ${value} returns an InvalidValue error.`, () => {
		const result = createUUID(value, "test label")
		expect(result.value).toEqual(value)
	})

})