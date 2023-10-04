import { GenericType, GenericValidation } from "../../Types";
import { CannotBeBlank, IsValidDate } from "../../Validations";

export class ShortDate extends GenericType {

  constructor(value: string, label: string | null = null, outputFormat: string, required = true, language: string = 'en-US', ...customValidators: GenericValidation[]) {
    super(value);

    const msg = label ?? 'Short Date';

    const defaultValidators = [
      () => CannotBeBlank(value, msg, required, language),
      () => IsValidDate(value, msg, required, language),
    ];
    const validators = customValidators.length > 0 ? [...defaultValidators, ...customValidators] : defaultValidators;
    this.validate(validators);
    if (this.errors.length === 0) {
      this.value = shortDateFormat(value, outputFormat);
    }
  }
}

export function shortDateFormat(date: string, outputFormat: string) {
  const dateWithoutTime = date.replace(/T\d{2}:\d{2}:\d{2}\.\d{3}Z/, "T00:00:00.000Z");
  const dateObj = new Date(dateWithoutTime.trim())
  const day = (dateObj.getUTCDate()).toString()
  const month = (dateObj.getUTCMonth()+1).toString()
  const year = dateObj.getUTCFullYear().toString()
  const dateReplacedDay = outputFormat.replace('dd', day.padStart(2, '0'))
  const dateReplacedMonth = dateReplacedDay.replace('MM', month.padStart(2, '0'))
  const formatedDate = dateReplacedMonth.replace('yyyy', year.padStart(4, '0'))
  return formatedDate
}

export function createShortDate(value: string, label: string | null = null, outputFormat: string) {
  return new ShortDate(value, label, outputFormat);
}
