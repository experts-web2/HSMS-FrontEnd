export interface ILabOrderRequest{
    doctorId: string;
    patientId: string;
    healthRecordId: string;
    labTestIds: Array<string>;
}