import { IVital } from "../vitals";
import { IBaseResponse } from "./BaseResponse";
import { IDoctor } from "./Doctor";
import { IMedication } from "./Medication";
import { IPrescription } from "./Prescription";
import { IToken } from "./Token";
import { IPatient } from "./patient-model";

export interface IHealthRecord extends IBaseResponse{
    doctorId: string;
    tokenId?: string;
    token?: IToken;
    patientId: string;
    doctor?: IDoctor;
    patient?: IPatient;
    medication?: IMedication;
    vital?: IVital;
    prescription?: IPrescription;
    labOrder?: {}
}