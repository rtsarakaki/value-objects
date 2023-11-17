import { GenericType } from './GenericType.type';
type basic = {
    id?: string;
};
export declare class GenericEntity<TModel extends basic> extends GenericType {
    _json: TModel;
    constructor(json: any);
    initProp(object: any, value: GenericType, required?: boolean): GenericType;
    get id(): string | undefined;
}
export {};
