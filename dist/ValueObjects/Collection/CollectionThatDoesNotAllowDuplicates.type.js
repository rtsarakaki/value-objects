"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CollectionThatDoesNotAllowDuplicates = void 0;
const Errors_1 = require("../../Errors");
const Messages_resource_1 = require("../../Resources/Messages.resource");
const Types_1 = require("../../Types");
class CollectionThatDoesNotAllowDuplicates extends Types_1.GenericType {
    constructor(label, language = 'en-US') {
        super(null);
        this.items = [];
        this.keys = [];
        this._label = label;
        this._language = language;
    }
    add(item, key) {
        if (this.keys.includes(key)) {
            const replaceList = [
                { tag: '${key}', value: key },
                { tag: '${label}', value: this._label }
            ];
            const errorMessage = (0, Messages_resource_1.getResourceMessageByKey)("CollectionThatDoesNotAllowDuplicates", this._language, replaceList);
            this.errors.push(new Errors_1.InvalidValue(errorMessage));
        }
        else {
            this.items.push(item);
            this.keys.push(key);
        }
    }
}
exports.CollectionThatDoesNotAllowDuplicates = CollectionThatDoesNotAllowDuplicates;
