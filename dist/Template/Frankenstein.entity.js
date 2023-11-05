"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const Decorators_1 = require("../Decorators");
const Types_1 = require("../Types");
const ValueObjects_1 = require("../ValueObjects");
let Frankenstein = class Frankenstein extends Types_1.GenericEntity {
    constructor(valores) {
        super();
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
};
__decorate([
    (0, Decorators_1.CannotBeBlank)('Required Property', true)
], Frankenstein.prototype, "_requiredProperty", void 0);
__decorate([
    (0, Decorators_1.CannotContainNumbers)('No Numbers')
], Frankenstein.prototype, "_noNumbers", void 0);
Frankenstein = __decorate([
    Decorators_1.ValidateEntity
], Frankenstein);
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
