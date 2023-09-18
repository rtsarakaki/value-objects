import GenericType from "../../Types/RootTypes/GenericType.type";
import { CannotBeBlank } from "../../Validations/CannotBeBlank.validation";
import { CannotHaveMoreThanXCharacters } from "../../Validations/CannotHaveMoreThanXCharacters.validation";
import { MustHaveAtLeastXCharacters } from "../../Validations/MustHaveAtLeastXCharacters.validation";
import { MustHaveOnlyOneWord } from "../../Validations/MustHaveOnlyOneWord.validation";


export class SingleWord extends GenericType {
  constructor(value: string, label: string | null = null) {
    const msg = label ?? 'One Word';
    super(value);
    this.validate([
      () => CannotBeBlank(value, msg),
      () => MustHaveAtLeastXCharacters(value, msg, 1),
      () => CannotHaveMoreThanXCharacters(value, msg, 50),
      () => MustHaveOnlyOneWord(value, msg),
    ]);
    if (this.errors.length === 0) {
      this.value = value?.trim().toLowerCase();
    }
  }
}

export function createSingleWord(value: string, label: string | null = null) {
  return new SingleWord(value, label);
}
