import { GenericType } from "../../Types";
import { CannotBeBlank } from "../../Validations/CannotBeBlank.validation";
import { CannotHaveMoreThanXCharacters } from "../../Validations/CannotHaveMoreThanXCharacters.validation";
import { MustHaveAtLeastXCharacters } from "../../Validations/MustHaveAtLeastXCharacters.validation";

export class FullName extends GenericType {
  constructor(name: string, label: string, required = true) {
    const msg = label ?? 'Name';
    super(name);
    if (name !== undefined) {
      const formatedName = formatFullName(name);
      this.validate([
        () => CannotBeBlank(formatedName, msg, required),
        () => MustHaveAtLeastXCharacters(formatedName, msg, 2),
        () => CannotHaveMoreThanXCharacters(formatedName, msg, 50),
      ]);
      this.value = formatedName;
    }
  }

  private get _nameParts(): string[] {
    return this.value?.split(' ') ?? [];
  }

  get firstName(): string {
    if (this._nameParts.length === 0) return ''
    return this._nameParts[0];
  }

  get lastName(): string {
    if (this._nameParts.length <= 1) return ''
    return this._nameParts.at(-1) ?? '';
  }

  get middleName(): string {
    if (this._nameParts.length < 3) return ''
    return this._nameParts.slice(1, this._nameParts.length -1).join(' ') ?? '';
  }
}

export function createFullName(name: string, label: string, required = true) {
  return new FullName(name, label, required);
}

export function formatFullName(fullName: string) {
  fullName = fullName.trim();
  fullName = fullName.replace(/[^\w\sÀ-ú]/gi, '');
  fullName = fullName.replace(/\d+/g, '');
  fullName = fullName.toLowerCase().replace(/(?:^|\s)\S/g, function (capitalize) {
    return capitalize.toUpperCase();
  });

  var arrayOfPrepositionsWithFirstLetterCapitalized = ['Da', 'Do', 'Das', 'Dos', 'A', 'E', 'De', 'La'];
  var arrayOfPrepositionsWithFirstLetterLowerCase = ['da', 'do', 'das', 'dos', 'a', 'e', 'de', 'la'];

  for (var i = arrayOfPrepositionsWithFirstLetterCapitalized.length - 1; i >= 0; i--) {
    fullName = fullName.replace(
      RegExp(
        '\\b' + arrayOfPrepositionsWithFirstLetterCapitalized[i].replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&') + '\\b',
        'g',
      ),
      arrayOfPrepositionsWithFirstLetterLowerCase[i],
    );
  }
  let parts = fullName.split(' ');
  fullName = '';
  for (i = 0; i < parts.length; i++) {
    if (parts[i].trim().length > 0) {
      fullName = fullName + parts[i] + ' ';
    }
  }

  return fullName.trim();
}

