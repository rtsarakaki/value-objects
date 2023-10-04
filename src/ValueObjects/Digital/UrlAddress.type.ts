import { GenericType, GenericValidation } from "../../Types";
import { CannotBeBlank, IsValidUrl } from "../../Validations";
import { isDataFormat, isMailToFormat } from "../../Validations/IsValidUrl.validation";

export class UrlAddress extends GenericType {

  private _urlObject: URL | null = null;

  constructor(url: string, label: string | null = null, required: boolean = true, language: string = 'en-US', ...customValidators: GenericValidation[]) {
    const msg = label ?? 'URL';
    super(url);

    const urlTrimmed = (typeof url !== 'string') ? '' : url.trim()
    const isEmpty = (urlTrimmed.length === 0 || urlTrimmed === 'http://')
    if (!required && isEmpty) {
      this.value = '';
      this._urlObject = null
      return
    }
    
    const sanitezedUrl = addDefaultProtocol(urlTrimmed)

    const defaultValidators = [
      () => CannotBeBlank(urlTrimmed, msg, required, language),
      () => IsValidUrl(sanitezedUrl, msg, required, language),
    ];
    const validators = customValidators.length > 0 ? [...defaultValidators, ...customValidators] : defaultValidators;
    this.validate(validators);

    if (this.errors.length === 0) {
      this.value = sanitezedUrl;
      this._urlObject = new URL(this.value)
    }
    else {
      this.value = '';
      this._urlObject = null
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
