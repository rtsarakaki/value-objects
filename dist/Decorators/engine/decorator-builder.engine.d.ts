import { GenericType } from "../../Types";
export declare function typeConstructorFactory(typeConstructor: new (...args: any[]) => GenericType, ...args: any[]): (next: any) => GenericType;
export declare function buildGetterAndSetter(target: Record<string, any>, propertyKey: string | symbol, typeInstanceCreator: (next: any) => GenericType, property?: string): void;
export declare function registerDecoratorFunction(decoratorName: string, target: Record<string, any>, propertyKey: string | symbol, labelText: string, typeInstanceCreator: (value: any) => GenericType): void;
