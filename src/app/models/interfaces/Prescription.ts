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
    healthRecordId: string;
    reason?: string
    startDate?: Date;
    endDate?: Date;
    continue?: boolean;
    days?: number;
    hours?: number;
    positiveFindings?: string;
    otherExaminations?: string;
    provisionalDiagnosis?: string;
    finalDiagnosis?: string;
  }