import { GenericType, GenericValidation } from "../../Types";
import { CannotBeBlank, MustHaveAtLeastXLetters } from "../../Validations";
import { CannotHaveMoreThanXCharacters } from "../../Validations/CannotHaveMoreThanXCharacters.validation";
import { MustHaveOnlyOneWord } from "../../Validations/MustHaveOnlyOneWord.validation";


export class SingleWord extends GenericType {
  constructor(value: string, label: string | null = null, required = true, language: string = 'en-US', ...customValidators: GenericValidation[]) {
    const msg = label ?? 'One Word';
    super(value);
    const defaultValidators = [
      () => CannotBeBlank(value, msg, required, language),
      () => MustHaveAtLeastXLetters(value, msg, 3, required, language),
      () => CannotHaveMoreThanXCharacters(value, msg, 50, required, language),
      () => MustHaveOnlyOneWord(value, msg, required, language),
    ];
    const validators = customValidators.length > 0 ? [...defaultValidators, ...customValidators] : defaultValidators;
    this.validate(validators);
    if (this.errors.length === 0) {
      this.value = value?.trim().toLowerCase();
    }
  }
}

export function createSingleWord(value: string, label: string | null = null, required: boolean = true, language: string = 'en-US', ...customValidators: GenericValidation[]) {
  return new SingleWord(value, label, required, language, ...customValidators);
}
