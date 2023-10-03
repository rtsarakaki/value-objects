// import { addDefaultProtocol } from "../ValueObjects/Digital/Url.type";

import { createUrlAddress } from "../ValueObjects";
import { validateProtocol } from "../Validations/IsValidUrl.validation";

// console.log(addDefaultProtocol("data:text/plain;base64,SGVsbG8sIFdvcmxkIQ%3D%3D"))

//const urlDecomposed = new URL('https://www.appsheet.com/start/9ccc83f5-c9f1-430b-9699-ae0119457b75?platform=desktop#viewStack[0][identifier][Type]=Control&viewStack[0][identifier][Name]=conteudos&viewStack[0][mutableState][filterDefaults][0][ColumnName]=categoria_id&viewStack[0][mutableState][filterDefaults][0][ColumnValue]=b674a870&appName=Catalogo-876599309');
const url = createUrlAddress('https://www.mydomain.org/', 'debug');
console.log(url)

// console.log(validateProtocol(url.protocol, url.value))
