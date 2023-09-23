import GenericError from './GenericError.error';
export default class InvalidValue extends GenericError {
    constructor(message: string, erros?: any);
}
