import { GenericType, GenericValidation } from "../../Types";
import { CannotBeBlank } from "../../Validations";
import { CannotHaveMoreThanXCharacters } from "../../Validations/CannotHaveMoreThanXCharacters.validation";
import { MustHaveAtLeastXCharacters } from "../../Validations/MustHaveAtLeastXCharacters.validation";

export class Title extends GenericType {
  constructor(value: string, label: string, ...customValidators: GenericValidation[]) {
    const msg = label ?? 'Title';
    super(value);
    const defaultValidators = [
      () => CannotBeBlank(value, msg),
      () => MustHaveAtLeastXCharacters(value, msg, 2),
      () => CannotHaveMoreThanXCharacters(value, msg, 50),
    ]
    const validators = customValidators.length > 0 ? [...defaultValidators, ...customValidators] : defaultValidators;
    this.validate(validators);
    this.value = capitalizeText(value.trim());;
  }
}

export function createTitle(value: string, label: string) {
  return new Title(value, label);
}

export function capitalizeText(value: string) {
  value = value.trim();
  value = value.toLowerCase().replace(/(?:^|\s)\S/g, function (capitalize) {
    return capitalize.toUpperCase();
  });

  var arrayOfPrepositionsWithFirstLetterCapitalized = ['Da', 'Do', 'Das', 'Dos', 'A', 'E', 'De', 'La', 'And', 'Of'];
  var arrayOfPrepositionsWithFirstLetterLowerCase = ['da', 'do', 'das', 'dos', 'a', 'e', 'de', 'la', 'and', 'of'];

  for (var i = arrayOfPrepositionsWithFirstLetterCapitalized.length - 1; i >= 0; i--) {
    value = value.replace(
      RegExp(
        '\\b' + arrayOfPrepositionsWithFirstLetterCapitalized[i].replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&') + '\\b',
        'g',
      ),
      arrayOfPrepositionsWithFirstLetterLowerCase[i],
    );
  }

  let parts = value.split(' ');
  value = '';
  for (i = 0; i < parts.length; i++) {
    if (parts[i].trim().length > 0) {
      value = value + parts[i] + ' ';
    }
  }

  return value.trim();
}

