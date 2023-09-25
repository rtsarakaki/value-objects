import { GenericType, GenericValidation } from "../../Types";
import { CannotBeBlank } from "../../Validations/CannotBeBlank.validation";
import { CannotHaveMoreThanXCharacters } from "../../Validations/CannotHaveMoreThanXCharacters.validation";
import { MustHaveAtLeastXCharacters } from "../../Validations/MustHaveAtLeastXCharacters.validation";

export class ShortDescription extends GenericType {
  constructor(value: string, label: string, ...customValidators: GenericValidation[]) {
    const msg = label ?? 'Short Description';
    super(value);
    const defaultValidators = [
      () => CannotBeBlank(value, msg),
      () => MustHaveAtLeastXCharacters(value, msg, 2),
      () => CannotHaveMoreThanXCharacters(value, msg, 120),
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
