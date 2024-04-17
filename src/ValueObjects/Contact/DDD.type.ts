import { GenericType, GenericValidation } from "../../Types";
import { CannotBeBlank } from "../../Validations";
import { IsValidDDD, normalizeDDD } from "../../Validations/IsValidDDD.validation";

export type DDDList = [string, number[]][];

const dddList: DDDList = [
	['RS', [51, 53, 54, 55]],
	['SC', [47, 48, 49]],
	['PR', [41, 42, 43, 44, 45, 46]],
	['SP', [11, 12, 13, 14, 15, 16, 17, 18, 19]],
	['RJ', [21, 22, 24]],
	['ES', [27, 28]],
	['MG', [31, 32, 33, 34, 35, 37, 38]],
	['GO', [62, 64, 61]],
	['DF', [61]],
	['MT', [65, 66]],
	['MS', [67]],
	['AC', [68]],
	['RO', [69]],
	['AM', [92, 97]],
	['RR', [95]],
	['PA', [91, 93, 94]],
	['AP', [96]],
	['TO', [63]],
	['MA', [98, 99]],
	['PI', [86, 89]],
	['CE', [85, 88]],
	['RN', [84]],
	['PB', [83]],
	['PE', [81, 87]],
	['AL', [82]],
	['SE', [79]],
	['BA', [71, 73, 74, 75, 77]]
]

export class DDD extends GenericType {
	constructor(value: string, label: string | null = null, required: boolean = true, language: string = 'en-US', ...customValidators: GenericValidation[]) {
		super(value);

		const msg = label ?? 'DDD';

		const normalizedDDD = normalizeDDD(value)

		const defaultValidators = [
			() => CannotBeBlank(value, msg, required, language),
			() => IsValidDDD(normalizedDDD as string, msg, dddList, required, language),
		];
		const validators = customValidators.length > 0 ? [...defaultValidators, ...customValidators] : defaultValidators;
		this.validate(validators);

		if(this.errors.length > 0) {
			this.value = null
		}
	}

	static getDDDList(): DDDList {
		return dddList;
	}

	getState(): string | null {
		if (!this.value) return null
		for (const [state, ddds] of dddList) {
			console.log(state, this.value, ddds)
			if (ddds.includes(parseInt(this.value))) {
				return state;
			}
		}
		return null;
	}

	getFormated(): string | null {
		if (!this.value) return null
		return formatDDD(this.value);
	}
}

export function createDDD(value: string, label: string | null = null, required: boolean = true, language: string = 'en-US', ...customValidators: GenericValidation[]) {
	return new DDD(value, label, required, language, ...customValidators);
}

export function formatDDD(DDD: string): string {
	const DDDRegex = /^(\d{2})$/;
	const matches = DDD.match(DDDRegex);
	if (matches) {
		return `(${matches[1]})`;
	}
	return DDD;
}

// const ddd = new DDD('10', 'ddd')
// console.log(ddd, ddd.getState(), ddd.getFormated())

const result = IsValidDDD('11', 'DDD', dddList);
console.log(result)