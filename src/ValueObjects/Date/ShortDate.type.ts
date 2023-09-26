import { format } from 'date-fns';
import { GenericType, GenericValidation } from "../../Types";
import { CannotBeBlank, IsValidDate } from "../../Validations";

export class ShortDate extends GenericType {

  constructor(value: string, label: string | null = null, outputFormat: string, required = true, ...customValidators: GenericValidation[]) {
    super(value);

    const msg = label ?? 'Short Date';

    const defaultValidators = [
      () => CannotBeBlank(value, msg, required),
      () => IsValidDate(value, msg),
    ];
    const validators = customValidators.length > 0 ? [...defaultValidators, ...customValidators] : defaultValidators;
    this.validate(validators);
    if (this.errors.length === 0) {
      this.value = formatDate(value, outputFormat);
    }
  }
}

export function formatDate(date: string, outputFormat: string) {
  return format(new Date(date.trim()), outputFormat);
}

export function createShortDate(value: string, label: string | null = null, outputFormat: string) {
  return new ShortDate(value, label, outputFormat);
}
