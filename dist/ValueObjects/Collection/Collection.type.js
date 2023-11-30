"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Collection = void 0;
const Errors_1 = require("../../Errors");
const Messages_resource_1 = require("../../Resources/Messages.resource");
const Types_1 = require("../../Types");
class Collection extends Types_1.GenericType {
    constructor(itemsToBeLoaded, label, validationCallback, language = 'en-US') {
        super(itemsToBeLoaded);
        this.items = [];
        this._label = label;
        this._language = language;
        this.validationCallback = validationCallback;
        if (itemsToBeLoaded === null || itemsToBeLoaded === undefined) {
            return;
        }
        if (itemsToBeLoaded.length === 0) {
            return;
        }
        itemsToBeLoaded.forEach(item => this.add(item));
    }
    add(item) {
        if (this.validationCallback(item, this.items)) {
            const replaceList = [
                { tag: '${label}', value: this._label }
            ];
            const errorMessage = (0, Messages_resource_1.getResourceMessageByKey)("Collection", this._language, replaceList);
            this.addError(new Errors_1.InvalidValue(errorMessage));
            return;
        }
        this.items.push(item);
        this.checkForDuplicates();
    }
    remove(index) {
        if (index < 0 || index >= this.items.length) {
            throw new Error("Index out of range");
        }
        this.items.splice(index, 1);
        this.checkForDuplicates();
    }
    update(index, newItem) {
        if (index < 0 || index >= this.items.length) {
            throw new Error("Index out of range");
        }
        this.items[index] = newItem;
        this.checkForDuplicates();
    }
    findByIndex(index) {
        if (index < 0 || index >= this.items.length) {
            throw new Error("Index out of range");
        }
        return this.items[index];
    }
    checkForDuplicates() {
        this.clearErrors();
        const duplicates = this.items
            .map((item, index, final) => final.indexOf(item) !== index ? index : -1)
            .filter(index => index !== -1 && this.items.indexOf(this.items[index]) !== index);
        duplicates.forEach(duplicateIndex => {
            const replaceList = [
                { tag: '${label}', value: this._label },
                { tag: '${index}', value: duplicateIndex.toString() }
            ];
            const errorMessage = (0, Messages_resource_1.getResourceMessageByKey)("Collection", this._language, replaceList);
            this.addError(new Errors_1.InvalidValue(errorMessage));
        });
    }
}
exports.Collection = Collection;
