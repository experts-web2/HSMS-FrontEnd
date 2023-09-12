import { IBaseResponse } from "./BaseResponse"

export interface ITestSample extends IBaseResponse {
    sampleId: string
    patientId: string
    testId: string
  }