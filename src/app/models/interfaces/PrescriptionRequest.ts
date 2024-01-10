import {Procedure} from 'src/app/constants/enums/Procedures';

export interface IPrescriptionRequest {
    doctorId: string;
    patientId: string;
    medicalHistory?: string;
    startDate?: Date;
    endDate?: Date;
    continue?: boolean;
    complaint?: string;
    days?: number;
    hours?: number;
    examination?: string;
    positiveFindings?: string;
    otherExaminations?: string;
    diagnosis?: string;
    provisionalDiagnosis?: string;
    finalDiagnosis?: string;
    clinicNotes?: string;
    advice?: string;
    investigation?: string;
    procedure?: Procedure;
    followUpDate?: Date;
    healthRecordId: string;
}