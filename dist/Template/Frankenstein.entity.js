"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Frankenstein = void 0;
const Types_1 = require("../Types");
const ValueObjects_1 = require("../ValueObjects");
class Frankenstein extends Types_1.GenericEntity {
    constructor(valores) {
        super(valores);
        this._requiredProperty = valores.requiredProperty;
        this._noNumbers = valores.noNumbers;
        this._kebabCode = new ValueObjects_1.KebabCode(valores.kebabCode, 'No Numbers', true);
        this._fullName = new ValueObjects_1.FullName(valores.fullName, 'Name', true);
        this.errors = [];
    }
    get requiredProperty() {
        return this._requiredProperty;
    }
    get noNumbers() {
        return this._noNumbers;
    }
    get kebabCode() {
        return this._kebabCode.value;
    }
}
exports.Frankenstein = Frankenstein;
const valores = {
    requiredProperty: 'ok',
    noNumbers: 'Do not allow numbers',
    kebabCode: 'kebab-code'
};
try {
    const frank = new Frankenstein(valores);
    console.log(' --- RESULTADO --- ', frank.isValid, frank.errors.length, JSON.stringify(frank), frank.requiredProperty, frank.noNumbers, frank.kebabCode);
    frank.errors.forEach((error) => {
        console.log('InvalidValue: ', error.message);
    });
}
catch (err) {
    console.log('catch: ', err.message);
}
