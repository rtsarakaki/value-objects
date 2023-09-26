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
    const dateObj = new Date(dateWithoutTime.trim());
    const day = (dateObj.getDate()).toString();
    const month = (dateObj.getMonth() + 1).toString();
    const year = dateObj.getFullYear().toString();
    const dateReplacedDay = outputFormat.replace('dd', day.padStart(2, '0'));
    const dateReplacedMonth = dateReplacedDay.replace('MM', month.padStart(2, '0'));
    const formatedDate = dateReplacedMonth.replace('yyyy', year.padStart(4, '0'));
    return formatedDate;
}
exports.shortDateFormat = shortDateFormat;
function createShortDate(value, label = null, outputFormat) {
    return new ShortDate(value, label, outputFormat);
}
exports.createShortDate = createShortDate;
