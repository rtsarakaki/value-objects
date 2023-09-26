"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createShortDate = exports.shortDateFormat = exports.ShortDate = void 0;
const Types_1 = require("../../Types");
const Validations_1 = require("../../Validations");
class ShortDate extends Types_1.GenericType {
    constructor(value, label = null, outputFormat, required = true, ...customValidators) {
        super(value);
        const msg = label ?? 'Short Date';
        const defaultValidators = [
            () => (0, Validations_1.CannotBeBlank)(value, msg, required),
            () => (0, Validations_1.IsValidDate)(value, msg),
        ];
        const validators = customValidators.length > 0 ? [...defaultValidators, ...customValidators] : defaultValidators;
        this.validate(validators);
        if (this.errors.length === 0) {
            this.value = shortDateFormat(value, outputFormat);
        }
    }
}
exports.ShortDate = ShortDate;
function shortDateFormat(date, outputFormat) {
    const dateWithoutTime = date.replace(/T\d{2}:\d{2}:\d{2}\.\d{3}Z/, "T12:00:00.000Z");
    console.log('shortDateFormat dateWithoutTime', dateWithoutTime);
    const dateObj = new Date(dateWithoutTime.trim());
    console.log('shortDateFormat dateObj', dateObj);
    const day = (dateObj.getDate()).toString();
    console.log('shortDateFormat day', day);
    const month = (dateObj.getMonth() + 1).toString();
    console.log('shortDateFormat month', month);
    const year = dateObj.getFullYear().toString();
    console.log('shortDateFormat year', year);
    const dateReplacedDay = outputFormat.replace('dd', day.padStart(2, '0'));
    console.log('shortDateFormat dateReplacedDay', dateReplacedDay);
    const dateReplacedMonth = dateReplacedDay.replace('MM', month.padStart(2, '0'));
    console.log('shortDateFormat dateReplacedMonth', dateReplacedMonth);
    const formatedDate = dateReplacedMonth.replace('yyyy', year.padStart(4, '0'));
    console.log('shortDateFormat formatedDate', formatedDate);
    return formatedDate;
}
exports.shortDateFormat = shortDateFormat;
function createShortDate(value, label = null, outputFormat) {
    return new ShortDate(value, label, outputFormat);
}
exports.createShortDate = createShortDate;
