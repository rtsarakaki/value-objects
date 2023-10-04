"use strict";
function ValidationPropertyDecorator() {
    return (classRef, propertyName) => {
        let property = classRef[propertyName];
        const getter = () => property;
        const setter = (value) => {
            if (value === '') {
                property = '1234';
            }
            else {
                property = value;
            }
        };
        Object.defineProperty(classRef, propertyName, { get: getter, set: setter });
    };
}
