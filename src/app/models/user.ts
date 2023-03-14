export interface IUser {
    firstName: string,
    lastName: string,
    password: string,
    phoneNumber: string,
    email: string,
    photoPath?: string,
    active: boolean,
    roles: string[]
}
