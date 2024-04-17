"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserEntity = void 0;
const Types_1 = require("../../Types");
const ValueObjects_1 = require("../../ValueObjects");
class UserEntity extends Types_1.GenericEntity {
    constructor(user) {
        super(user);
        Object.assign(this, this.initProps(user, {
            id: ValueObjects_1.createUUID,
            fullname: ValueObjects_1.createFullName,
            email: ValueObjects_1.createEmail,
            phone: ValueObjects_1.createPhoneNumberBR
        }));
    }
    get id() {
        return this._id.value;
    }
    get fullname() {
        return this._fullname.value;
    }
    get email() {
        return this._email.value;
    }
    get phone() {
        return this._phone.value;
    }
}
exports.UserEntity = UserEntity;
