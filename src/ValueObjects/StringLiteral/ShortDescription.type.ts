import { GenericType } from "../../Types";
import { CannotBeBlank } from "../../Validations/CannotBeBlank.validation";
import { CannotHaveMoreThanXCharacters } from "../../Validations/CannotHaveMoreThanXCharacters.validation";
import { MustHaveAtLeastXCharacters } from "../../Validations/MustHaveAtLeastXCharacters.validation";

export class ShortDescription extends GenericType {
  constructor(value: string, label: string) {
    const msg = label ?? 'Short Description';
    super(value);

    this.validate([
      () => CannotBeBlank(value, msg),
      () => MustHaveAtLeastXCharacters(value, msg, 2),
      () => CannotHaveMoreThanXCharacters(value, msg, 120),
    ]);

    if (this.errors.length === 0) {
      this.value = value.trim();
    }

  }
}

export function createShortDescription(value: string, label: string) {
  return new ShortDescription(value, label);
}
