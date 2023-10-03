import { InvalidValue } from "../../Errors";
import { GenericType } from "../../Types";
import { CannotBeBlank, IsValidUrl } from "../../Validations";
import { isDataFormat, isFilePathFormat, isMailToFormat, validateProtocol } from "../../Validations/IsValidUrl.validation";

export class UrlAddress extends GenericType {

  private _urlObject: URL | null = null;

  constructor(url: string, label: string | null = null, required: boolean = true) {
    const msg = label ?? 'URL';
    super(url);
    const urlTrimmed =  (typeof url !== 'string') ? '' : url.trim()
    const sanitezedUrl = addDefaultProtocol(urlTrimmed)
    this.validate([
      () => CannotBeBlank(urlTrimmed, msg, required),
      () => IsValidUrl(sanitezedUrl, msg),
    ]);

    this.value = sanitezedUrl;
    if (this.errors.length === 0) {
      this._urlObject = new URL(this.value)
    }

  }

  public get hostname(): string {
    return this._urlObject?.hostname ?? ''
  }

  public get host(): string {
    return this._urlObject?.host ?? ''
  }

  public get pathname(): string {
    return this._urlObject?.pathname ?? ''
  }

  public get port(): string {
    return this._urlObject?.port ?? ''
  }

  public get protocol(): string {
    return this._urlObject?.protocol ?? ''
  }

  public get username(): string {
    return this._urlObject?.username ?? ''
  }

  public get password(): string {
    return this._urlObject?.password ?? ''
  }

  public get search(): string {
    return this._urlObject?.search ?? ''
  }

  public get params() {
    return this._urlObject?.searchParams
  }

}

export function createUrlAddress(value: string, label: string | null = null) {
  return new UrlAddress(value, label);
}

export function addDefaultProtocol(url: string): string {

  const commonProtocols = ['http', 'https', 'ftp', 'sftp']
  const protocolRegex = /^([a-z]+):\/\//i
  const protocolMatch = url.match(protocolRegex)

  if (protocolMatch) return url

  const isData = isDataFormat(url)
  if (isData) { return url }

  const isMailTo = isMailToFormat(url)
  if (isMailTo) { return `mailto:${url}` }

  const defaultProtocol = 'http'
  const protocol = commonProtocols.find(p => url.startsWith(p)) || defaultProtocol
  return `${protocol}://${url}`
}