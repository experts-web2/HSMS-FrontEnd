import { IBaseResponse } from "./BaseResponse";

export interface IPatientSample extends IBaseResponse{
    sampleId: string;
    patientId: string;
    testId: string;
}