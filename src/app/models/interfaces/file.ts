import { IBaseResponse } from "./BaseResponse";

export interface IFile extends IBaseResponse{
    name: string;
    path: string;
    patientId: string;
}