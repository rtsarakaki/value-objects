import { InvalidValue } from "../../Errors";
import { getResourceMessageByKey } from "../../Resources/Messages.resource";
import { GenericType } from "../../Types";

export class CollectionThatDoesNotAllowDuplicates<T extends object> extends GenericType {
	items: T[] = [];
	keys: string[] = [];

	_label: string
	_language: string
	propertyUsedAsKeyToValidadeDuplicates: keyof T;

	constructor(itemsToBeLoaded: T[], propertyUsedAsKeyToValidadeDuplicates: keyof T, label: string, language: string = 'en-US') {
		super(null)
		this._label = label;
		this._language = language;

		this.propertyUsedAsKeyToValidadeDuplicates = propertyUsedAsKeyToValidadeDuplicates;

		if (itemsToBeLoaded.length > 0) {
			const keys: Array<keyof T> = Object.keys(itemsToBeLoaded[0]) as Array<keyof T>;
			const propertyExists = keys.includes(propertyUsedAsKeyToValidadeDuplicates);
			if (!propertyExists) {
				throw new Error(`The ${propertyUsedAsKeyToValidadeDuplicates as string} property does not exist in the object `)
			}
		}

		itemsToBeLoaded.reduce((_, item) => {
			this.add(item);
			return null;
		}, null);
	}

	add(item: T) {
		const key = (item[this.propertyUsedAsKeyToValidadeDuplicates] as string);
		if (this.keys.includes(key)) {
			const replaceList = [
				{ tag: '${key}', value: key },
				{ tag: '${label}', value: this._label }
			]
			const errorMessage = getResourceMessageByKey("CollectionThatDoesNotAllowDuplicates", this._language, replaceList)
		}
		this.items.push(item);
		this.keys.push(key);
		this.checkForDuplicates();
	}

	remove(item: T) {
		const newItems = this.items.filter((i) => i[this.propertyUsedAsKeyToValidadeDuplicates] !== item[this.propertyUsedAsKeyToValidadeDuplicates]);
		if (newItems.length === this.items.length) {
			throw new Error("Item not found");
		}
		this.items = newItems;
		this.keys = newItems.map((i) => i[this.propertyUsedAsKeyToValidadeDuplicates] as string);
		this.checkForDuplicates();
	}

	update(key: string, newItem: T) {
		const index = this.keys.indexOf(key);
		if (index === -1) {
			throw new Error("Key not found");
		}
		const newKey = (newItem[this.propertyUsedAsKeyToValidadeDuplicates] as string);
		this.items[index] = newItem;
		this.keys[index] = newKey;
		this.checkForDuplicates();
	}

	checkForDuplicates() {
		this.errors = [];

		type duplicatedItem = { key: string, index: number }

		function removeDuplicates(array: duplicatedItem[]): duplicatedItem[] {
			if (!array) { return [] }

			const uniqueItems: duplicatedItem[] = [];

			array.forEach((originalItem, index: number) => {
				const existingItem = uniqueItems.filter((duplicatedItem) => { return duplicatedItem.key === originalItem.key && duplicatedItem.index === originalItem.index })
				if (existingItem.length === 0) {
					uniqueItems.push(array[index]);
				}
			});

			return uniqueItems;
		}

		const duplicates: { [key: string]: number[] } = {};
		const duplicateItems: { key: string, index: number }[] = [];

		this.keys.forEach((key, index) => {
			const originalIndex = this.keys.findIndex((item, i) => item === key && i !== index);
			if (originalIndex === -1 || originalIndex === index) {
				return;
			}
			if (!duplicates[key]) {
				duplicates[key] = [];
			}
			duplicates[key].push(originalIndex);
			duplicates[key].push(index);
			duplicateItems.push({ key, index: originalIndex });
			duplicateItems.push({ key, index });
		});

		const duplicatesCleaned = removeDuplicates(duplicateItems)

		const errors = duplicatesCleaned.map((item) => {
			const indexList = duplicatesCleaned.filter((findIndex) => { return findIndex.key === item.key }).map(item => '#' + item.index)
			const replaceList = [
				{ tag: '${key}', value: item.key },
				{ tag: '${label}', value: this._label },
				{ tag: '${indexes}', value: indexList.join(', ') }
			];
			const errorMessage = getResourceMessageByKey("CollectionThatDoesNotAllowDuplicates", this._language, replaceList);
			const error = new InvalidValue(errorMessage)
			return error
		})

		this.errors.push(...errors);
	}
}