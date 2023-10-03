import { GenericValidation } from "../Types/RootTypes/GenericValidation.validation";
export interface ValidationDecoratorInterface {
    (label: string, required: boolean, validation: GenericValidation): (target: any, key: string) => void;
}
export declare const ValidationDecorator: ValidationDecoratorInterface;
