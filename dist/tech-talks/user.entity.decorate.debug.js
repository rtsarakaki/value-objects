"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_entity_decorated_1 = require("./user.entity.decorated");
const class_validator_1 = require("class-validator");
const user = new user_entity_decorated_1.UserEntityDecorated();
user.fullname = 'ricardo    arakaki';
user.email = 'ricardo.arakaki@grupoboticario.com.br';
user.phone = '+5511987654321';
(0, class_validator_1.validate)(user).then(errors => {
    if (errors.length > 0) {
        console.log(errors);
        throw new Error('Invalid user');
    }
});
console.log(user.id);
console.log(user.fullname);
