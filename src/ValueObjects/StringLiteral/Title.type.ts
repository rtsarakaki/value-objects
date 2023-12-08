import { GenericType, GenericValidation } from "../../Types";
import { CannotBeBlank, MustHaveAtLeastXLetters } from "../../Validations";
import { CannotHaveMoreThanXCharacters } from "../../Validations/CannotHaveMoreThanXCharacters.validation";
import { CannotRepeatCharInSequenceFourTimes } from "../../Validations/CannotRepeatCharInSequenceFourTimes.validation";

export class Title extends GenericType {
	constructor(
		value: string,
		label: string,
		required = true,
		language: string = "en-US",
		...customValidators: GenericValidation[]
	) {
		const msg = label ?? "Title";
		super(value);
		const cleanedValue = value.trim();
		const defaultValidators = [
			() => CannotBeBlank(cleanedValue, msg, required, language),
			() => MustHaveAtLeastXLetters(cleanedValue, msg, 3, required, language),
			() =>
				CannotHaveMoreThanXCharacters(cleanedValue, msg, 50, required, language),
			() => CannotRepeatCharInSequenceFourTimes(cleanedValue, msg, required, language),
		];
		const validators =
			customValidators.length > 0
				? [...defaultValidators, ...customValidators]
				: defaultValidators;
		this.validate(validators);
		this.value = capitalizeText(cleanedValue);
	}
}

export function createTitle(
	value: string,
	label: string,
	required: boolean = true,
	language: string = "en-US",
	...customValidators: GenericValidation[]
) {
	return new Title(value, label, required, language, ...customValidators);
}

export function capitalizeText(value: string) {
	value = value.trim();
	value = value.toLowerCase().replace(/(?:^|\s)\S/g, function (capitalize) {
		return capitalize.toUpperCase();
	});

	var arrayOfPrepositionsWithFirstLetterCapitalized = [
		"Da",
		"Do",
		"Das",
		"Dos",
		"A",
		"E",
		"De",
		"La",
		"And",
		"Of",
	];
	var arrayOfPrepositionsWithFirstLetterLowerCase = [
		"da",
		"do",
		"das",
		"dos",
		"a",
		"e",
		"de",
		"la",
		"and",
		"of",
	];

	for (
		var i = arrayOfPrepositionsWithFirstLetterCapitalized.length - 1;
		i >= 0;
		i--
	) {
		value = value.replace(
			RegExp(
				"\\b" +
					arrayOfPrepositionsWithFirstLetterCapitalized[i].replace(
						/[-\/\\^$*+?.()|[\]{}]/g,
						"\\$&",
					) +
					"\\b",
				"g",
			),
			arrayOfPrepositionsWithFirstLetterLowerCase[i],
		);
	}

	let parts = value.split(" ");
	value = "";
	for (i = 0; i < parts.length; i++) {
		if (parts[i].trim().length > 0) {
			value = value + parts[i] + " ";
		}
	}

	return value.trim();
}
