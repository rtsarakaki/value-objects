import { GenericType } from '../../Types';
import { CannotBeBlank, MustHaveOnlyOneWord } from '../../Validations';

function S4() {
  return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
}

export function GenerateUUID(label: string) {
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
    label,
  );
}

export class UUID extends GenericType {
  constructor(value: string, label: string) {
    const msg = label ?? 'Id';
    super(value);
    if (value !== null) {
      this.validate([
        () => CannotBeBlank(value, msg),
        () => MustHaveOnlyOneWord(value, msg),
      ]);
    } else {
      this.valor = GenerateUUID(label);
    }
  }
}

// why?
export function createUUID(value: string | null, label: string) {
  if (!value || value.trim() === '') {
    return GenerateUUID(label);
  } else {
    return new UUID(value, label);
  }
}
