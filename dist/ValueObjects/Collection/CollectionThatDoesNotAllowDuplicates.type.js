"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CollectionThatDoesNotAllowDuplicates = void 0;
const Errors_1 = require("../../Errors");
const Messages_resource_1 = require("../../Resources/Messages.resource");
const Types_1 = require("../../Types");
class CollectionThatDoesNotAllowDuplicates extends Types_1.GenericType {
    constructor(itemsToBeLoaded, propertyUsedAsKeyToValidadeDuplicates, label, language = 'en-US') {
        super(null);
        this.items = [];
        this.keys = [];
        this._label = label;
        this._language = language;
        this.propertyUsedAsKeyToValidadeDuplicates = propertyUsedAsKeyToValidadeDuplicates;
        if (itemsToBeLoaded.length > 0) {
            const keys = Object.keys(itemsToBeLoaded[0]);
            const propertyExists = keys.includes(propertyUsedAsKeyToValidadeDuplicates);
            if (!propertyExists) {
                throw new Error(`The ${propertyUsedAsKeyToValidadeDuplicates} property does not exist in the object `);
            }
        }
        itemsToBeLoaded.reduce((_, item) => {
            this.add(item);
            return null;
        }, null);
    }
    add(item) {
        const key = item[this.propertyUsedAsKeyToValidadeDuplicates];
        if (this.keys.includes(key)) {
            const replaceList = [
                { tag: '${key}', value: key },
                { tag: '${label}', value: this._label }
            ];
            const errorMessage = (0, Messages_resource_1.getResourceMessageByKey)("CollectionThatDoesNotAllowDuplicates", this._language, replaceList);
        }
        this.items.push(item);
        this.keys.push(key);
        this.checkForDuplicates();
    }
    remove(item) {
        const newItems = this.items.filter((i) => i[this.propertyUsedAsKeyToValidadeDuplicates] !== item[this.propertyUsedAsKeyToValidadeDuplicates]);
        if (newItems.length === this.items.length) {
            throw new Error("Item not found");
        }
        this.items = newItems;
        this.keys = newItems.map((i) => i[this.propertyUsedAsKeyToValidadeDuplicates]);
        this.checkForDuplicates();
    }
    update(key, newItem) {
        const index = this.keys.indexOf(key);
        if (index === -1) {
            throw new Error("Key not found");
        }
        const newKey = newItem[this.propertyUsedAsKeyToValidadeDuplicates];
        this.items[index] = newItem;
        this.keys[index] = newKey;
        this.checkForDuplicates();
    }
    checkForDuplicates() {
        this.errors = [];
        function removeDuplicates(array) {
            if (!array) {
                return [];
            }
            const uniqueItems = [];
            array.forEach((originalItem, index) => {
                const existingItem = uniqueItems.filter((duplicatedItem) => { return duplicatedItem.key === originalItem.key && duplicatedItem.index === originalItem.index; });
                if (existingItem.length === 0) {
                    uniqueItems.push(array[index]);
                }
            });
            return uniqueItems;
        }
        const duplicates = {};
        const duplicateItems = [];
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
        const duplicatesCleaned = removeDuplicates(duplicateItems);
        const errors = duplicatesCleaned.map((item) => {
            const indexList = duplicatesCleaned.filter((findIndex) => { return findIndex.key === item.key; }).map(item => '#' + item.index);
            const replaceList = [
                { tag: '${key}', value: item.key },
                { tag: '${label}', value: this._label },
                { tag: '${indexes}', value: indexList.join(', ') }
            ];
            const errorMessage = (0, Messages_resource_1.getResourceMessageByKey)("CollectionThatDoesNotAllowDuplicates", this._language, replaceList);
            const error = new Errors_1.InvalidValue(errorMessage);
            return error;
        });
        this.errors.push(...errors);
    }
}
exports.CollectionThatDoesNotAllowDuplicates = CollectionThatDoesNotAllowDuplicates;
