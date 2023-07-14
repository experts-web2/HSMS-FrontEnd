export interface IAddOrUpdateDoctorRequest{
    name:string
    gender: number;
    opd:boolean;
    token:boolean;
    appointment:boolean
    consultationFee: number;
    sharePrice:number;
    speciality:string;
    biography:string;
    qualification:string;
    service:string;
    timings:string;
    userRequest:IUserRequest
}
export interface IAddOrUpdateDoctor{
    id:string;
    name:string;
    gender: number;
    opd:boolean;
    token:boolean;
    appointment:boolean
    consultationFee: number;
    sharePrice:number;
    speciality:string;
    biography:string;
    qualification:string;
    service:string;
    timings:string;
    userRequest:IUserRequest
}

export interface IUserRequest {
    firstName : string;
    lastName:string;
    email: string;
    password?: string;
    phoneNumber:string;
    photoPath:string;
    active:boolean;
    roles:Array<string>
}
