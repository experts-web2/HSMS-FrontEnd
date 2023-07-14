export interface IAddOrUpdatePatient{
    doctorId?: string;
    mrNo: number;
    name: string;
    phoneNumber: string;
    relation: number;
    gender: number;
    age: string;
    registrationDate: Date;
    photoPath?: string;
    tagIds?: Array<string>;
    inDoor?: boolean;
    outDoor?: boolean;
}
