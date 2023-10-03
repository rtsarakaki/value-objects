import { GenericEntity, GenericType, GenericValidation, initializeClass } from "../../Types";
import { CannotBeBlank, CannotHaveMoreThanXCharacters, MustEndWithAlphaNumeric, MustHaveAtLeastXCharacters, MustHaveOnlyOneWord, MustStartWithAlphaNumeric, RegexMatch } from "../../Validations";

export class KebabCode extends GenericType {
  constructor(value: string, label: string | null = null, required = true, ...customValidators: GenericValidation[]) {
    const msg = label ?? 'Kebab Code';
    super(value);
    const formatedValue = this.formatValue(value)
    const defaultValidators = [
      () => CannotBeBlank(formatedValue, msg, required),
      () => MustHaveAtLeastXCharacters(formatedValue, msg, 1),
      () => CannotHaveMoreThanXCharacters(formatedValue, msg, 50),
      () => MustHaveOnlyOneWord(value, msg),
      () => MustStartWithAlphaNumeric(formatedValue, msg),
      () => MustEndWithAlphaNumeric(formatedValue, msg),
      () => RegexMatch(formatedValue, '^[a-z0-9]+(-[a-z0-9]+)*$', 'must contain only letters, numbers or non-consecutive dashes', msg),
    ];
    const validators = customValidators.length > 0 ? [...defaultValidators, ...customValidators] : defaultValidators;
    this.validate(validators);
    if (this.errors.length === 0) {
      this.value = formatedValue;
    }
  }

  formatValue(value: string) {
    if (value === null) return ''
    if (value === undefined) return ''
    return value.toString().trim().toLowerCase();
  }
}


export function createKebabCode(value: string, label: string | null = null) {
  return new KebabCode(value, label);
}
