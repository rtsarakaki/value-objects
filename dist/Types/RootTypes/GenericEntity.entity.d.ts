import { GenericType } from './GenericType.type';
type basic = {
    id?: string;
};
export declare class GenericEntity<TModel extends basic, TDto> extends GenericType {
    _json: TModel;
    constructor(json: any);
    initProp(object: any, value: GenericType, required?: boolean): GenericType;
    get id(): string | undefined;
    toJson(callback?: (entity: this) => TDto): TDto;
    static fromJson<TModel extends basic, TDto>(this: new (json: TModel) => GenericEntity<TModel, TDto>, json: TModel | TDto, callback?: (json: TDto) => TModel): GenericEntity<TModel, TDto>;
}
export {};
