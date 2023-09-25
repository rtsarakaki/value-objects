import { GenericType, GenericValidation } from "../../Types";
import { CannotBeBlank } from "../../Validations/CannotBeBlank.validation";
import { MustHaveAtLeastXCharacters } from "../../Validations/MustHaveAtLeastXCharacters.validation";

export class LongDescription extends GenericType {
  constructor(value: string, label: string, ...customValidators: GenericValidation[]) {
    const msg = label ?? 'Long Description';
    super(value);
    const defaultValidators = [
      () => CannotBeBlank(value, msg),
      () => MustHaveAtLeastXCharacters(value, msg, 2),
    ]
    const validators = customValidators.length > 0 ? [...defaultValidators, ...customValidators] : defaultValidators;
    this.validate(validators);
    if (this.errors.length === 0) {
      this.value = value.trim();
    }
  }
}

export function createLongDescription(value: string, label: string) {
  return new LongDescription(value, label);
}
