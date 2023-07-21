export interface ILabOrderRequest{
    doctorId: string;
    patientId: string;
    labTestIds: Array<string>;
}