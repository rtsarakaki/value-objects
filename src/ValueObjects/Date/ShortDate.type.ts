import { GenericType, GenericValidation } from "../../Types";
import { CannotBeBlank, IsValidDate } from "../../Validations";

type inputAccepted = string | Date;

export class ShortDate extends GenericType {

  constructor(value: inputAccepted, label: string | null = null, outputFormat: string = 'yyyy-MM-dd', required = true, language: string = 'en-US', ...customValidators: GenericValidation[]) {
    super(value);

    const convertedToString = value instanceof Date ? value.toISOString() : value.toString()

    const msg = label ?? 'Short Date';

    const defaultValidators = [
      () => CannotBeBlank(convertedToString, msg, required, language),
      () => IsValidDate(convertedToString, msg, required, language),
    ];
    const validators = customValidators.length > 0 ? [...defaultValidators, ...customValidators] : defaultValidators;
    this.validate(validators);
    if (this.errors.length === 0) {
      this.value = shortDateFormat(convertedToString, outputFormat);
    }
  }
}

export function shortDateFormat(value: inputAccepted, outputFormat: string = 'yyyy-MM-dd') {
  const convertedToString = value instanceof Date ? value.toISOString() : value.toString()

  const dateWithoutTime = convertedToString.replace(/T\d{2}:\d{2}:\d{2}\.\d{3}Z/, "T00:00:00.000Z");
  const dateObj = new Date(dateWithoutTime.trim())
  const day = (dateObj.getUTCDate()).toString()
  const month = (dateObj.getUTCMonth()+1).toString()
  const year = dateObj.getUTCFullYear().toString()
  const dateReplacedDay = outputFormat.replace('dd', day.padStart(2, '0'))
  const dateReplacedMonth = dateReplacedDay.replace('MM', month.padStart(2, '0'))
  const formatedDate = dateReplacedMonth.replace('yyyy', year.padStart(4, '0'))
  return formatedDate
}

export function createShortDate(value: inputAccepted, label: string | null = null, outputFormat: string) {
  return new ShortDate(value, label, outputFormat);
}
