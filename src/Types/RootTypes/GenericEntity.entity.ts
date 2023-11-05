import { GenericType } from './GenericType.type';

type basic = {
  id?: string
}

export class GenericEntity<TModel extends basic, TDto> extends GenericType {
  _json: TModel

  constructor(json: any) {
    super(null);
    this._json = json;
  }

  public initProp(object: any, value: GenericType, required: boolean = true): GenericType {
    if (!(value instanceof GenericType)) return value
    const isString = typeof value?.value === 'string';
    const isRequired = required === undefined || required;
    const hasValue = isString ? value?.value === undefined || value?.value.length > 0 : false;
    const needValidation = isRequired || hasValue;

    if (!needValidation) {
      return value;
    }

    if (!value.isValid) {
      object.errors = object.errors.concat(value.errors);
    }

    return value;
  }

  public get id() {
    return this._json?.id;
  }

  public toJson(callback?: (entity: this) => TDto): TDto {
    const processedEntity = callback ? callback(this) : this._json as unknown as TDto;
    return processedEntity;
  }

  static fromJson<TModel extends basic, TDto>(this: new (json: TModel) => GenericEntity<TModel, TDto>, json: TModel | TDto, callback?: (json: TDto) => TModel): GenericEntity<TModel, TDto> {
    if (callback && (json as TDto)) {
      const result = callback(json as any);
      if (result) {
        return new this(result);
      }
    }

    const entity = new this(json as TModel);
    return entity;
  }
}
