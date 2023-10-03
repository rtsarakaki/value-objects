"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addDefaultProtocol = exports.createUrlAddress = exports.UrlAddress = void 0;
const Types_1 = require("../../Types");
const Validations_1 = require("../../Validations");
const IsValidUrl_validation_1 = require("../../Validations/IsValidUrl.validation");
class UrlAddress extends Types_1.GenericType {
    constructor(url, label = null, required = true) {
        const msg = label ?? 'URL';
        super(url);
        this._urlObject = null;
        const urlTrimmed = (typeof url !== 'string') ? '' : url.trim();
        const sanitezedUrl = addDefaultProtocol(urlTrimmed);
        this.validate([
            () => (0, Validations_1.CannotBeBlank)(urlTrimmed, msg, required),
            () => (0, Validations_1.IsValidUrl)(sanitezedUrl, msg),
        ]);
        this.value = sanitezedUrl;
        if (this.errors.length === 0) {
            this._urlObject = new URL(this.value);
        }
    }
    get hostname() {
        return this._urlObject?.hostname ?? '';
    }
    get host() {
        return this._urlObject?.host ?? '';
    }
    get pathname() {
        return this._urlObject?.pathname ?? '';
    }
    get port() {
        return this._urlObject?.port ?? '';
    }
    get protocol() {
        return this._urlObject?.protocol ?? '';
    }
    get username() {
        return this._urlObject?.username ?? '';
    }
    get password() {
        return this._urlObject?.password ?? '';
    }
    get search() {
        return this._urlObject?.search ?? '';
    }
    get params() {
        return this._urlObject?.searchParams;
    }
}
exports.UrlAddress = UrlAddress;
function createUrlAddress(value, label = null) {
    return new UrlAddress(value, label);
}
exports.createUrlAddress = createUrlAddress;
function addDefaultProtocol(url) {
    const commonProtocols = ['http', 'https', 'ftp', 'sftp'];
    const protocolRegex = /^([a-z]+):\/\//i;
    const protocolMatch = url.match(protocolRegex);
    if (protocolMatch)
        return url;
    const isData = (0, IsValidUrl_validation_1.isDataFormat)(url);
    if (isData) {
        return url;
    }
    const isMailTo = (0, IsValidUrl_validation_1.isMailToFormat)(url);
    if (isMailTo) {
        return `mailto:${url}`;
    }
    const defaultProtocol = 'http';
    const protocol = commonProtocols.find(p => url.startsWith(p)) || defaultProtocol;
    return `${protocol}://${url}`;
}
exports.addDefaultProtocol = addDefaultProtocol;
