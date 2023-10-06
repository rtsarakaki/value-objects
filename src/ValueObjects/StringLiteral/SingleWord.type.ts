import { GenericType, GenericValidation } from "../../Types";
import { CannotBeBlank } from "../../Validations";
import { CannotHaveMoreThanXCharacters } from "../../Validations/CannotHaveMoreThanXCharacters.validation";
import { MustHaveAtLeastXCharacters } from "../../Validations/MustHaveAtLeastXCharacters.validation";
import { MustHaveOnlyOneWord } from "../../Validations/MustHaveOnlyOneWord.validation";


export class SingleWord extends GenericType {
  constructor(value: string, label: string | null = null, required = true, language: string = 'en-US', ...customValidators: GenericValidation[]) {
    const msg = label ?? 'One Word';
    super(value);
    const defaultValidators = [
      () => CannotBeBlank(value, msg, required, language),
      () => MustHaveAtLeastXCharacters(value, msg, 1, required, language),
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
