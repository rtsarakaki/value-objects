"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestType = exports.TypeValidator = exports.TestEntity = void 0;
const ValidateEntity_1 = require("../Decorators/ValidateEntity");
const Errors_1 = require("../Errors");
const Types_1 = require("../Types");
let TestEntity = class TestEntity extends Types_1.GenericEntity {
    constructor(model) {
        super(model);
        this._prop1 = this.initProp(this, new TestType(model.prop1));
        this._prop2 = this.initProp(this, new TestType(model.prop2));
    }
    get prop1() {
        return this._prop1.value;
    }
    get prop2() {
        return this._prop2.value;
    }
};
exports.TestEntity = TestEntity;
exports.TestEntity = TestEntity = __decorate([
    ValidateEntity_1.ValidateEntity
], TestEntity);
const TypeValidator = (value) => {
    if (value !== 'GenericType Test') {
        return new Errors_1.InvalidValue('test not ok');
    }
    return null;
};
exports.TypeValidator = TypeValidator;
class TestType extends Types_1.GenericType {
    constructor(value) {
        super(value);
        if (value !== undefined) {
            this.validate([
                () => (0, exports.TypeValidator)(value),
            ]);
            this.value = value;
        }
    }
}
exports.TestType = TestType;
const m = {
    id: "1",
    prop1: "GenericType Test",
    prop2: "GenericType Test"
};
const t = new TestEntity(m);
console.log(t.isValid);
console.log(t.errors);
