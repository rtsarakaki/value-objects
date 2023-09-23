export default class GenericError extends Error {
    errors: Array<GenericError> | null;
    constructor(message: string, errors?: null);
}
