"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MustHaveTheSameStructureThan = void 0;
const InvalidValue_error_1 = __importDefault(require("../Errors/InvalidValue.error"));
const Messages_resource_1 = require("../Resources/Messages.resource");
function MustHaveTheSameStructureThan(valor, label, language = 'en-US') {
    const replaceList = [
        { tag: '${label}', value: label },
        { tag: "${JSON.stringify('model')}", value: JSON.stringify('model') },
    ];
    const errorMessage = (0, Messages_resource_1.getResourceMessageByKey)(MustHaveTheSameStructureThan.name, language, replaceList);
    try {
        const resultado = JSON.parse(valor);
        const model = resultado;
        return model;
    }
    catch (e) {
        return new InvalidValue_error_1.default(errorMessage);
    }
}
exports.MustHaveTheSameStructureThan = MustHaveTheSameStructureThan;
