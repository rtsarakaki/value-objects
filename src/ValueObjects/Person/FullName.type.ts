import { GenericType, GenericValidation } from "../../Types";
import { MustHaveAtLeastXLetters } from "../../Validations";
import { CannotBeBlank } from "../../Validations/CannotBeBlank.validation";
import { CannotHaveMoreThanXCharacters } from "../../Validations/CannotHaveMoreThanXCharacters.validation";
import { CannotRepeatCharInSequenceFourTimes } from "../../Validations/CannotRepeatCharInSequenceFourTimes.validation";

export class FullName extends GenericType {
  constructor(name: string, label: string, required = true, language: string = 'en-US', ...customValidators: GenericValidation[]) {
    const msg = label ?? 'Name';
    super(name);
    if (name !== undefined) {
      const formatedName = formatFullName(name);
      const defaultValidators = [
        () => CannotBeBlank(formatedName, msg, required, language),
        () => MustHaveAtLeastXLetters(formatedName, msg, 2, required, language),
        () => CannotHaveMoreThanXCharacters(formatedName, msg, 50, required, language),
        () => CannotRepeatCharInSequenceFourTimes(formatedName, msg, required, language),
      ]
      const validators = customValidators.length > 0 ? [...defaultValidators, ...customValidators] : defaultValidators;
      this.validate(validators);
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
    return this._nameParts.slice(1, this._nameParts.length - 1).join(' ') ?? '';
  }

  get abbreviatedName(): string {
    if (this._nameParts.length < 3) return this.value ?? '';
    const middleInitials = this._nameParts.slice(1, this._nameParts.length - 1).map(name => `${name.charAt(0)}.`).join(' ');
    return `${this.firstName} ${middleInitials} ${this.lastName}`;
  }

  get cardName(): string {
    return this.abbreviatedName.toUpperCase();
  }

}

export function createFullName(name: string, label: string, required = true) {
  return new FullName(name, label, required);
}

type Prepositions = {
  'Da': string;
  'Do': string;
  'Das': string;
  'Dos': string;
  'A': string;
  'E': string;
  'De': string;
  'La': string;
};

const removeSpecialCharacters = (str: string) => str.replace(/[^a-zA-ZÀ-ú-\s'-]/gi, '');
const capitalizeFirstLetter = (str: string) => str.toLowerCase().replace(/(?:^|\s|-|')\S/g, (capitalize) => capitalize.toUpperCase());
const replacePrepositions = (str: string) => {
  const prepositions: Prepositions = {
    'Da': 'da',
    'Do': 'do',
    'Das': 'das',
    'Dos': 'dos',
    'A': 'a',
    'E': 'e',
    'De': 'de',
    'La': 'la'
  };
  return str.split(' ').map(word => prepositions[word as keyof Prepositions] || word).join(' ');
};
const removeExtraSpaces = (str: string) => str.trim().replace(/\s+/g, ' ');
const removeConsecutiveHyphensAndSpaces = (str: string) => str.replace(/(-\s|\s-|--|\s\s)+/g, ' ');
const removeHyphenAtStartAndEnd = (str: string) => str.replace(/^-|-$/g, '');


export const formatFullName = (fullName: string) => {
  return removeExtraSpaces(
    removeHyphenAtStartAndEnd(
      removeConsecutiveHyphensAndSpaces(
        replacePrepositions(
          capitalizeFirstLetter(
            removeSpecialCharacters(fullName)
          )
        )
      )
    )
  );
};

console.log(formatFullName("João d'avila 111"))
