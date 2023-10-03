"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidateEntity = void 0;
function ValidateEntity(constructor) {
    return class extends constructor {
        constructor(...args) {
            super(...args);
            this.init();
        }
        init() {
            Object.getOwnPropertyNames(this)
                .filter(property => property !== 'errors')
                .forEach(property => this.initProp(this, this[property]));
        }
        validate() {
            const errors = this.errors;
            if (Object.keys(errors).length > 0) {
                throw new Error(JSON.stringify(errors));
            }
        }
    };
}
exports.ValidateEntity = ValidateEntity;
