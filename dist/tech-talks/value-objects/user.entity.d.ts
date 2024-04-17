import { AttributesEnforcement, GenericEntity, GettersEnforcement } from "../../Types";
import { Email, FullName, PhoneNumberBR, UUID } from "../../ValueObjects";
import { UserModel } from "./user.model";
export declare class UserEntity extends GenericEntity<UserModel> implements AttributesEnforcement<UserModel>, GettersEnforcement<UserModel> {
    readonly _id: UUID;
    readonly _fullname: FullName;
    readonly _email: Email;
    readonly _phone: PhoneNumberBR;
    constructor(user: UserModel);
    get id(): string;
    get fullname(): string;
    get email(): string;
    get phone(): string;
}
