import { IBaseResponse } from "./BaseResponse";
import { IDoctor } from "./Doctor";
import { IPatient } from "./patient-model";

export interface ILabOrder extends IBaseResponse{
    patientId: string
    doctorId: string
    healthRecordId: string
    labOrderDetails: ILabOrderDetail[]
    doctor?: IDoctor;
    patient?: IPatient;
}
  
export interface ILabOrderDetail extends IBaseResponse {
    labOrderId: string
    labTestId: string
    labTestName: string
}