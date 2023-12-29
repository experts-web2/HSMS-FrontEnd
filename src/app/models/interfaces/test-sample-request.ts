export interface IPatientSampleRequest {
    patientId: string;
    testItems: IPatientSampleItem[];
}

export interface IPatientSampleItem {
    sampleId: string;
    sample: string;
    testId: string;
    patientTestInvoiceItemId: string;
}