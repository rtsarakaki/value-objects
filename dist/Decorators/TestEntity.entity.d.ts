import { InvalidValue } from '../Errors/InvalidValue.error';
import { GenericEntity } from '../Types/RootTypes/GenericEntity.entity';
import { GenericType } from '../Types/RootTypes/GenericType.type';
export declare class TestEntity extends GenericEntity<TestModel> {
    _prop1: TestType;
    _prop2: TestType;
    constructor(model: TestModel);
    get prop1(): any;
    get prop2(): any;
}
export declare const TypeValidator: (value: string) => InvalidValue | null;
export declare class TestType extends GenericType {
    constructor(value: string);
}
export type TestModel = {
    id?: string;
    prop1: string;
    prop2: string;
};
export type TestModelDto = {
    id?: string;
    props: string[];
};
