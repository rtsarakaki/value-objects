import { UserModel } from "./user.model";
export declare class UserServicePrimitiveTypes {
    create(user: UserModel): UserModel;
    fullNameIsValid(fullName: string): boolean;
    emailIsValid(email: string): boolean;
    phoneIsValid(phone: string): boolean;
}
