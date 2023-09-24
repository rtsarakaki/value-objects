import { GenericType } from './GenericType.type';
export declare class GenericEntity extends GenericType {
    constructor();
    initProp(object: any, value: GenericType, required?: boolean): GenericType;
    get id(): string;
}
