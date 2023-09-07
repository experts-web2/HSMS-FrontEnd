import { IBaseResponse } from "./BaseResponse";

export interface ILabOrder extends IBaseResponse{
    patientId: string
    doctorId: string
    healthRecordId: string
    labOrderDetails: ILabOrderDetail[]
}
  
export interface ILabOrderDetail extends IBaseResponse {
    labOrderId: string
    labTestId: string
    labTestName: string
}