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
      this.value = shortDateFormat(value, outputFormat);
    }
  }
}

export function shortDateFormat(date: string, outputFormat: string) {
  const dateWithoutTime = date.replace(/T\d{2}:\d{2}:\d{2}\.\d{3}Z/, "T12:00:00.000Z");
  console.log('shortDateFormat dateWithoutTime', dateWithoutTime)
  const dateObj = new Date(dateWithoutTime.trim())
  console.log('shortDateFormat dateObj', dateObj)
  const day = (dateObj.getDate()).toString()
  console.log('shortDateFormat day', day)
  const month = (dateObj.getMonth()+1).toString()
  console.log('shortDateFormat month', month)
  const year = dateObj.getFullYear().toString()
  console.log('shortDateFormat year', year)
  const dateReplacedDay = outputFormat.replace('dd', day.padStart(2, '0'))
  console.log('shortDateFormat dateReplacedDay', dateReplacedDay)
  const dateReplacedMonth = dateReplacedDay.replace('MM', month.padStart(2, '0'))
  console.log('shortDateFormat dateReplacedMonth', dateReplacedMonth)
  const formatedDate = dateReplacedMonth.replace('yyyy', year.padStart(4, '0'))
  console.log('shortDateFormat formatedDate', formatedDate)
  return formatedDate
}

export function createShortDate(value: string, label: string | null = null, outputFormat: string) {
  return new ShortDate(value, label, outputFormat);
}
