import { InvalidValue } from "../../Errors";
import { getResourceMessageByKey } from "../../Resources/Messages.resource";
import { GenericType } from "../../Types";

export class CollectionThatDoesNotAllowDuplicates<T> extends GenericType {
	items: T[] = [];
	keys: string[] = [];

	_label: string
	_language: string

	constructor(label: string, language: string = 'en-US') {
		super(null)
		this._label = label;
		this._language = language;
	}

	add(item: T, key: string) {
		if (this.keys.includes(key)) {
			const replaceList = [
				{ tag: '${key}', value: key }, 
				{ tag: '${label}', value: this._label }
			]
			const errorMessage = getResourceMessageByKey("CollectionThatDoesNotAllowDuplicates", this._language, replaceList)
			this.errors.push(new InvalidValue(errorMessage));
		} else {
			this.items.push(item);
			this.keys.push(key);
		}
	}
}