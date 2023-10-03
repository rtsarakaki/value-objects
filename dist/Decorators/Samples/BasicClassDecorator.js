"use strict";
function BasicClassDecorator(label) {
    return (construtor) => {
        console.log(`BasicClassDecorator : target ${label}`, construtor);
    };
}
