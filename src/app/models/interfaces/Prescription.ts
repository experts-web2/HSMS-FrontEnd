import { IBaseResponse } from "./BaseResponse";

export interface IPrescription extends IBaseResponse {
    doctorId: string;
    doctorName?: string;
    patientId: string;
    patientName?: string;
    medicalHistory?: string;
    complaint?: string;
    examination?: string;
    diagnosis?: string;
    clinicNotes?: string;
    advice?: string;
    investigation?: string;
    procedure?: number;
    followUpDate?: Date;
  }