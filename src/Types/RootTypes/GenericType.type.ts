import { GenericError } from "../../Errors/GenericError.error";

export class GenericType {
  value: any;
  [property: string]: any;
  errors: Array<GenericError> = new Array();

  constructor(value: any) {
    this.value = value;
  }

  public get isValid(): boolean {
    return this.errors?.length === 0;
  }

  public accumulateErrors(callback: any) {
    const res = callback();
    if (res) {
      this.errors.push(res);
    }
  }

  public validate(validationList: any[]) {
    validationList.forEach(validation => this.accumulateErrors(validation));
  }

  public toJson() {
    return {};
  }
  
}

export type FromJsonFunc<M> = (data: any) => M;


