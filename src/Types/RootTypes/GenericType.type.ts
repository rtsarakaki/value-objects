import { GenericError } from "../../Errors/GenericError.error";

export class GenericType {
  value: any;
  [property: string]: any;
  errors: Array<GenericError>;

  constructor(value: any) {
    this.value = value;
    this.errors = new Array();
  }

  public get isValid(): boolean {
    return this?.errors?.length === 0;
  }

  public accumulateErrors(callback: any) {
    const res = callback();
    if (res) {
      this.errors.push(res);
    }
  }

  public validate(validationList: any[]) {
    if (validationList !== undefined && validationList !== null && validationList.length > 0) {
      validationList.forEach(validation => this.accumulateErrors(validation));
    }
  }

  public toJson() {
    return {};
  }

}

export type FromJsonFunc<M> = (data: any) => M;




