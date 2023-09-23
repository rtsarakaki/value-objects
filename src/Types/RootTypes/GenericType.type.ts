import { GenericError } from "../../Errors/GenericError.error";

export class GenericType {
  value: any;
  [property: string]: any;
  errors: Array<GenericError> = new Array();

  constructor(value: any) {
    this.value = value;
  }

  get isValid(): boolean {
    return this.errors?.length === 0;
  }

  accumulateErrors(callback: any) {
    const res = callback();
    if (res) {
      this.errors.push(res);
    }
  }

  validate(validationList: any[]) {
    validationList.forEach(validation => this.accumulateErrors(validation));
  }

  toJson() {
    return {};
  }
  
}

export type FromJsonFunc<M> = (data: any) => M;


