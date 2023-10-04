import { InvalidValue } from "../Errors/InvalidValue.error";
import { GenericValidation } from "../Types";
import { validationAcceleratorSuggestion } from "./ValidationsTools";

interface IsValidNumberInterface extends GenericValidation {
	(value: number | string, label: string, required?: boolean, language?: string): InvalidValue | null;
}

export const IsValidNumber: IsValidNumberInterface = (value: number | string, label: string, required: boolean = true, language: string = 'en-US') => {

	const numberToString = value?.toString() ?? undefined;
	
	function validate(value: number | string, errorMessage: string) {

		const convertedToNumber = convertStringToNumber(value);

		if (convertedToNumber instanceof InvalidValue) return new InvalidValue(errorMessage, convertedToNumber) 

		return null
	}

	const replaceList = [{ tag: '${label}', value: label }]
	return validationAcceleratorSuggestion(validate, numberToString, label, required, "IsPositiveInteger", language, replaceList)
};


export function convertStringToNumber(value: string | number | null | undefined): number | InvalidValue {
	const regexNumberValidation = /^\d+$/

	if (value === null || value === undefined) return new InvalidValue(`Value '${value}' is null or undefined`)

	const { integerPart, decimalPart, thousandSeparator, negativeSignal, error } = decomposeIntegerAndDecimalsParts(value)
	if (error) return new InvalidValue(`Value '${value}' is not a valid number.`)

	if (!validateDecimalPart(decimalPart)) return new InvalidValue(`Value '${value}' is not a valid number.`)

	const validatedIntegerPart = validateIntegerPart(integerPart, thousandSeparator)
	if (validatedIntegerPart === null) return new InvalidValue(`Value '${value}' is not a valid number.`)

	const sanitizedValue = `${negativeSignal ? '-' : ''}${validatedIntegerPart}.${decimalPart}`

	const convertedToFloat = Number.parseFloat(sanitizedValue)

	if (convertedToFloat === -0) return 0

	return convertedToFloat
}

function validateIntegerPart(integerPart: string, thousandSeparator: string) {
	const regexNumberValidation = /^\d+$/

	const arrayOfThousandParts = integerPart.split(thousandSeparator)

	if (arrayOfThousandParts.length <= 1) {
		// must contain only numbers
		const regexSingleIntegerPartResult = regexNumberValidation.test(integerPart)
		if (!regexSingleIntegerPartResult) return null
	}
	else {
		const errorsInThousandParts = validateIntegerPartWhenHasThousandSeparator(arrayOfThousandParts, regexNumberValidation)
		if (errorsInThousandParts.length > 0) return null
	}

	return arrayOfThousandParts.join('')
}

function validateIntegerPartWhenHasThousandSeparator(arrayOfThousandParts: string[], regexNumberValidation: RegExp): string[] {
	return arrayOfThousandParts.filter((thousandPart, index) => {

		if (thousandPart.length < 3 && index !== 0) return true
		if (thousandPart.length > 3) return true

		// must contain only numbers
		const regexThousandPartResult = regexNumberValidation.test(thousandPart)
		if (!regexThousandPartResult) return true

		return false
	})
}

function validateDecimalPart(decimalPart: string) {
	const regexNumberValidation = /^\d+$/

	if (decimalPart !== undefined) {
		// must contain only numbers
		const regexDecimalPartResult = regexNumberValidation.test(decimalPart)
		if (!regexDecimalPartResult) return false
	}

	return true
}

function decomposeIntegerAndDecimalsParts(value: string | number) {
	const timmedValue = value.toString().trim();
	const valueSignal = timmedValue[0]
	const hasSignal = valueSignal === '+' || valueSignal === '-'
	const negativeSignal = valueSignal === "-"
	const cleanedValue = hasSignal ? timmedValue.substring(1) : timmedValue

	const firstCommaIndex = cleanedValue.indexOf(",")
	const firstDotIndex = cleanedValue.indexOf(".")
	const decimalSeparator = firstCommaIndex > firstDotIndex ? ',' : '.'
	const thousandSeparator = firstCommaIndex > firstDotIndex ? '.' : ','

	const arrayDivideStringInIntegerPartAndDecimalPart = cleanedValue.split(decimalSeparator)
	const error = (arrayDivideStringInIntegerPartAndDecimalPart.length > 2)

	const decimalPart = arrayDivideStringInIntegerPartAndDecimalPart[1]
	const integerPart = arrayDivideStringInIntegerPartAndDecimalPart[0]

	return {
		integerPart: integerPart
		, decimalPart: decimalPart
		, firstDotIndex: firstDotIndex
		, decimalSeparator: decimalSeparator
		, thousandSeparator: thousandSeparator
		, negativeSignal: negativeSignal
		, error: error
	}
}


