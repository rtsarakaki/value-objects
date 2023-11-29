import { InvalidValue } from "../../Errors";
import { getResourceMessageByKey } from "../../Resources/Messages.resource";
import { GenericType } from "../../Types";

export class Collection<T extends object> extends GenericType {
	items: T[] = [];
	_label: string
	_language: string
	validationCallback: (item: T, items: T[]) => boolean;

	constructor(itemsToBeLoaded: T[], label: string, validationCallback: (item: T, items: T[]) => boolean, language: string = 'en-US') {
		super(itemsToBeLoaded)
		this._label = label;
		this._language = language;
		this.validationCallback = validationCallback;

		if (itemsToBeLoaded === null || itemsToBeLoaded === undefined) { return }
		if (itemsToBeLoaded.length === 0) { return }

		itemsToBeLoaded.forEach(item => this.add(item));
	}

	add(item: T) {
		if (this.validationCallback(item, this.items)) {
			const replaceList = [
				{ tag: '${label}', value: this._label }
			]
			const errorMessage = getResourceMessageByKey("Collection", this._language, replaceList)
			this.addError(new InvalidValue(errorMessage));
			return;
		}
		this.items.push(item);
		this.checkForDuplicates();
	}

	remove(index: number) {
		if (index < 0 || index >= this.items.length) { throw new Error("Index out of range") }

		this.items.splice(index, 1);
		this.checkForDuplicates();
	}

	update(index: number, newItem: T) {
		if (index < 0 || index >= this.items.length) { throw new Error("Index out of range") }

		this.items[index] = newItem;
		this.checkForDuplicates();
	}

	findByIndex(index: number): T {
		if (index < 0 || index >= this.items.length) { throw new Error("Index out of range") }

		return this.items[index];
	}

	checkForDuplicates() {
		this.clearErrors()

		const duplicates = this.items
			.map((item, index, final) => final.indexOf(item) !== index ? index : -1)
			.filter(index => index !== -1 && this.items.indexOf(this.items[index]) !== index);

		duplicates.forEach(duplicateIndex => {
			const replaceList = [
				{ tag: '${label}', value: this._label },
				{ tag: '${index}', value: duplicateIndex.toString() }
			];
			const errorMessage = getResourceMessageByKey("Collection", this._language, replaceList);
			this.addError(new InvalidValue(errorMessage));
		});
	}
}