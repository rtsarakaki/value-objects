import { GenericType, GenericValidation } from "../../Types";
import { CannotBeBlank } from "../../Validations/CannotBeBlank.validation";
import { CannotHaveMoreThanXCharacters } from "../../Validations/CannotHaveMoreThanXCharacters.validation";
import { MustHaveAtLeastXCharacters } from "../../Validations/MustHaveAtLeastXCharacters.validation";

export class ShortDescription extends GenericType {
  constructor(value: string, label: string, required = true, language: string = 'en-US', ...customValidators: GenericValidation[]) {
    const msg = label ?? 'Short Description';
    super(value);
    const defaultValidators = [
      () => CannotBeBlank(value, msg, required, language),
      () => MustHaveAtLeastXCharacters(value, msg, 2, required, language),
      () => CannotHaveMoreThanXCharacters(value, msg, 120, required, language),
    ]
    const validators = customValidators.length > 0 ? [...defaultValidators, ...customValidators] : defaultValidators;
    this.validate(validators);

    if (this.errors.length === 0) {
      this.value = value.trim();
    }

  }
}

export function createShortDescription(value: string, label: string) {
  return new ShortDescription(value, label);
}
