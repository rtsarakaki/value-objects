import { format } from 'date-fns';
import { GenericType, GenericValidation } from "../../Types";
import { CannotBeBlank, IsValidDate } from "../../Validations";

export class ShortDate extends GenericType {
  constructor(value: string, label: string | null = null, outputFormat: string, required = true, ...customValidators: GenericValidation[]) {
    const msg = label ?? 'Short Date';
    super(value);
    const defaultValidators = [
      () => CannotBeBlank(value, msg, required),
      () => IsValidDate(value, msg),
    ];
    const validators = customValidators.length > 0 ? [...defaultValidators, ...customValidators] : defaultValidators;
    this.validate(validators);
    if (this.errors.length === 0) {
      this.value = format(new Date(value.trim()), outputFormat);
    }
  }
}

function formatValue(value: string) {
  if (value === null) return ''
  if (value === undefined) return ''
  return value.toString().trim().toLowerCase();
}

export function createShortDate(value: string, label: string | null = null, outputFormat: string) {
  return new ShortDate(value, label, outputFormat);
}
