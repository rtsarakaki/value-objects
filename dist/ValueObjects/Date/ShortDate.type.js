"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createShortDate = exports.ShortDate = void 0;
const date_fns_1 = require("date-fns");
const Types_1 = require("../../Types");
const Validations_1 = require("../../Validations");
class ShortDate extends Types_1.GenericType {
    constructor(value, label = null, outputFormat, required = true, ...customValidators) {
        const msg = label ?? 'Short Date';
        super(value);
        const defaultValidators = [
            () => (0, Validations_1.CannotBeBlank)(value, msg, required),
            () => (0, Validations_1.IsValidDate)(value, msg),
        ];
        const validators = customValidators.length > 0 ? [...defaultValidators, ...customValidators] : defaultValidators;
        this.validate(validators);
        if (this.errors.length === 0) {
            this.value = (0, date_fns_1.format)(new Date(value.trim()), outputFormat);
        }
    }
}
exports.ShortDate = ShortDate;
function formatValue(value) {
    if (value === null)
        return '';
    if (value === undefined)
        return '';
    return value.toString().trim().toLowerCase();
}
function createShortDate(value, label = null, outputFormat) {
    return new ShortDate(value, label, outputFormat);
}
exports.createShortDate = createShortDate;
