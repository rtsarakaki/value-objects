"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserEntityDecorated = void 0;
const ValueObjects_1 = require("../ValueObjects");
const contact_1 = require("../decorators/contact");
const string_1 = require("../decorators/datatype/string");
const person_1 = require("../decorators/person");
class UserEntityDecorated {
    constructor() {
        this.id = (0, ValueObjects_1.createUUID)(null, 'id').value;
        this.fullname = '';
        this.email = '';
        this.phone = '';
    }
}
exports.UserEntityDecorated = UserEntityDecorated;
__decorate([
    (0, string_1.GenerateUUID)()
], UserEntityDecorated.prototype, "id", void 0);
__decorate([
    (0, person_1.IsValidFullName)()
], UserEntityDecorated.prototype, "fullname", void 0);
__decorate([
    (0, contact_1.IsValidEmail)()
], UserEntityDecorated.prototype, "email", void 0);
__decorate([
    (0, contact_1.IsValidPhoneNumberBR)()
], UserEntityDecorated.prototype, "phone", void 0);
