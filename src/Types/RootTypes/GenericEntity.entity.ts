import { GenericType } from './GenericType.type';

export class GenericEntity extends GenericType {
  constructor() {
    super(null);
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
    return '';
  }
}
