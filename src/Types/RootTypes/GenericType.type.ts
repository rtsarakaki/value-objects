import { GenericError } from "../../Errors/GenericError.error";

export class GenericType {
	private _originalValue: any;
	private _value: any;
	[property: string]: any;
	errors: Array<GenericError>;

	constructor(value: any) {
		this._value = value;
		this._originalValue = value;
		this.errors = new Array();
	}

	public get originalValue(): any {
		return this._originalValue;
	}

	public get value(): any {
		return this._value;
	}

	protected set value(value: any) {
		this._value = value
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

	public addErrors(errors: GenericError[]) {
		this.errors = this.errors.concat(errors);
	}

	public clearErrors() {
		this.errors = [];
	}

  public validate(validationList: any[]) {
    if (
      validationList !== undefined &&
      validationList !== null &&
      validationList.length > 0
    ) {
      validationList.forEach((validation) => {
        if (typeof validation === 'function') {
          this.accumulateErrors(validation);
        }
      });
    }
  }
}
