"use strict";
function ExtendsClassDecorator(value) {
    return (construtor) => {
        return class extends construtor {
            constructor() {
                super(...arguments);
                this.InjectedProperty = value;
            }
        };
    };
}
