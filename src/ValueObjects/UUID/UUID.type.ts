import { GenericType, GenericValidation } from '../../Types';
import { CannotBeBlank, MustHaveOnlyOneWord } from '../../Validations';

function S4() {
  return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
}

export function GenerateUUID(label: string, required: boolean = true, language: string = 'en-US', ...customValidators: GenericValidation[]) {
  return new UUID(
    (
      S4() +
      S4() +
      '-' +
      S4() +
      '-4' +
      S4().substr(0, 3) +
      '-' +
      S4() +
      '-' +
      S4() +
      S4() +
      S4()
    ).toLowerCase(),
    label, required, language, ...customValidators
  );
}

export class UUID extends GenericType {
  constructor(value: string, label: string, required: boolean = true, language: string = 'en-US', ...customValidators: GenericValidation[]) {
    if (!!!value) {
      const generatedUUID =  GenerateUUID(label, required, language, ...customValidators);
      super(generatedUUID.value);
    }
    else {
      super(value);
    }
    const msg = label ?? 'Id';
    if (value !== null) {
      const defaultValidators = [
        () => CannotBeBlank(value, msg, required, language),
        () => MustHaveOnlyOneWord(value, msg, required, language),
      ]
      const validators = customValidators.length > 0 ? [...defaultValidators, ...customValidators] : defaultValidators;
      this.validate(validators);
    } else {
      this.value = GenerateUUID(label).value;
    }
  }
}

// why?
export function createUUID(value: string | null, label: string, required: boolean = true, language: string = 'en-US', ...customValidators: GenericValidation[]) {
  if (!value || value.trim() === '') {
    return GenerateUUID(label, required, language, ...customValidators);
  } else {
    return new UUID(value, label, required, language, ...customValidators);
  }
}
