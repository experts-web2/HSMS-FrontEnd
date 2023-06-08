export interface ILogedInUser{
    accountId: string;
    active: boolean;
    createdAt: string;
    createdBy: string;
    email: string;
    filePath: string;
    firstName: string;
    id: string;
    lastName: string;
    modifiedAt: Date;
    modifiedBy: Date;
    phoneNumber: string;
    roles: string[];
    username: string;
    token: string;
}