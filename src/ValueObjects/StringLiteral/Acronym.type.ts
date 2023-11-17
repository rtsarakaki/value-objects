import { GenericType, GenericValidation } from "../../Types";
import { CannotBeBlank, CannotHaveMoreThanXCharacters, MustHaveAtLeastXCharacters, MustHaveOnlyOneWord } from "../../Validations";

export class Acronym extends GenericType {
  constructor(value: string, label: string | null = null, required = true, upper: boolean, language: string = 'en-US', ...customValidators: GenericValidation[]) {
    const msg = label ?? 'Acronym';
    super(value);
    const formatedValue = formatValue(value, upper)
    const defaultValidators = [
      () => CannotBeBlank(formatedValue, msg, required, language),
      () => MustHaveAtLeastXCharacters(formatedValue, msg, 2, required, language),
      () => CannotHaveMoreThanXCharacters(formatedValue, msg, 5, required, language),
      () => MustHaveOnlyOneWord(value, msg, required, language),
    ];
    const validators = customValidators.length > 0 ? [...defaultValidators, ...customValidators] : defaultValidators;
    this.validate(validators);
    if (this.errors.length === 0) {
      this.value = formatedValue;
    }
  }
}

function formatValue(value: string, upperCase: boolean) {
  if (value === null) return ''
  if (value === undefined) return ''
  return upperCase ? value.toString().trim().toUpperCase() : value.toString().trim().toLowerCase();
}

export function createAcronymCode(value: string, label: string | null = null, required: boolean = true, upper: boolean = true, language: string = 'en-US', ...customValidators: GenericValidation[]) {
  return new Acronym(value, label, required, upper, language, ...customValidators);
}
