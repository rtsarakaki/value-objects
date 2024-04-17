"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserServiceValueObjects = void 0;
const user_entity_1 = require("./user.entity");
class UserServiceValueObjects {
    create(user) {
        const userEntity = new user_entity_1.UserEntity(user);
        if (userEntity.isValid) {
        }
        return userEntity;
    }
}
exports.UserServiceValueObjects = UserServiceValueObjects;
