import GenericType from './GenericType.type';
export default class GenericEntity extends GenericType {
    constructor();
    initProp: (object: any, value: GenericType, required?: boolean) => GenericType;
    get id(): string;
}
