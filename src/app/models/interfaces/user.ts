import { Genders } from "src/app/constants/enums/Gender-enum";

export interface IUser {
    id:string;
    firstName: string;
    lastName: string;
    gender: Genders;
    password: string;
    phoneNumber: string;
    email: string;
    photoPath?: string;
    active: boolean;
    roles: string[];
    accountId: string;
}
