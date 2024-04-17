"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserServicePrimitiveTypes = void 0;
class UserServicePrimitiveTypes {
    create(user) {
        if (!this.fullNameIsValid(user.fullname)) {
            throw new Error('Invalid user');
        }
        if (!this.emailIsValid(user.email)) {
            throw new Error('Invalid user');
        }
        if (!this.phoneIsValid(user.phone)) {
            throw new Error('Invalid user');
        }
        user.id = (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        ;
        return user;
    }
    fullNameIsValid(fullName) {
        if (fullName.length < 5) {
            return false;
        }
        if (fullName.length > 100) {
            return false;
        }
        return true;
    }
    emailIsValid(email) {
        return email.includes('@');
    }
    phoneIsValid(phone) {
        if (phone.length < 10) {
            return false;
        }
        if (phone.length > 11) {
            return false;
        }
        return true;
    }
}
exports.UserServicePrimitiveTypes = UserServicePrimitiveTypes;
