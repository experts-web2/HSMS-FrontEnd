export interface IHealthRecordRequest{
    doctorId: string;
    patientId: string;
    tokenId?: string;
    vitalId?: string;
    medicationId?: string;
    prescriptionId?: string;
    labOrderId?: string;
}