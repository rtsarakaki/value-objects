import GenericType from "../../Types/RootTypes/GenericType.type";
import { CannotBeBlank } from "../../Validations/CannotBeBlank.validation";
import { MustHaveAtLeastXCharacters } from "../../Validations/MustHaveAtLeastXCharacters.validation";

export class LongDescription extends GenericType {
  constructor(value: string, label: string) {
    const msg = label ?? 'Long Description';
    super(value);
    this.validate([
      () => CannotBeBlank(value, msg),
      () => MustHaveAtLeastXCharacters(value, msg, 2),
    ]);
    if (this.errors.length === 0) {
      this.value = value.trim();
    }
  }
}

export function createLongDescription(value: string, label: string) {
  return new LongDescription(value, label);
}
