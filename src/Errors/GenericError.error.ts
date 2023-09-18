export default class GenericError extends Error {
    errors: Array<GenericError> | null = new Array();

    constructor(message: string, errors = null) {
        super(message);
        this.errors = errors;

        // Set the prototype explicitly.
        Object.setPrototypeOf(this, GenericError.prototype);
    }
}
