import { GenericType, GenericValidation } from "../../Types";
import { CannotBeBlank, RegexMatch } from "../../Validations";
import { CannotHaveMoreThanXCharacters } from "../../Validations/CannotHaveMoreThanXCharacters.validation";
import { MustHaveAtLeastXCharacters } from "../../Validations/MustHaveAtLeastXCharacters.validation";
import { MustHaveOnlyOneWord } from "../../Validations/MustHaveOnlyOneWord.validation";
import { MustStartWithAlphaNumeric } from "../../Validations/MustStartWithAlphaNumeric.validation";

export class KebabCode extends GenericType {
  constructor(value: string, label: string | null = null, ...customValidators: GenericValidation[]) {
    const msg = label ?? 'Kebab Code';
    super(value);
    const formatedValue = formatValue(value)
    const defaultValidators = [
      () => CannotBeBlank(formatedValue, msg),
      () => MustHaveAtLeastXCharacters(formatedValue, msg, 1),
      () => CannotHaveMoreThanXCharacters(formatedValue, msg, 50),
      () => MustHaveOnlyOneWord(value, msg),
      () => MustStartWithAlphaNumeric(formatedValue, msg),
      () => RegexMatch(formatedValue, '^[a-z0-9]+(-[a-z0-9]+)*$', 'must contain only letters, numbers or non-consecutive dashes', 'kebab code'),
    ];
    const validators = customValidators.length > 0 ? [...defaultValidators, ...customValidators] : defaultValidators;
    this.validate(validators);
    if (this.errors.length === 0) {
      this.value = formatedValue;
    }
  }
}

function formatValue(value: string) {
  if (value === null) return ''
  if (value === undefined) return ''
  return value.toString().trim().toLowerCase();
}

export function createKebabCode(value: string, label: string | null = null) {
  return new KebabCode(value, label);
}
