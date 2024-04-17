import { GenericType } from './GenericType.type';
type basic = {
    id?: string;
};
export declare class GenericEntity<TModel extends basic> extends GenericType {
    _json: TModel;
    constructor(json: any);
    protected initProps(user: TModel, mapping: Record<keyof TModel, (value: any, key: string) => any>): any;
    protected initProp(object: any, value: GenericType, required?: boolean): GenericType | any;
    get id(): string | undefined;
}
export {};
