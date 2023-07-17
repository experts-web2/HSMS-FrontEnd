import {Procedure} from 'src/app/constants/enums/Procedures';

export interface IPrescriptionRequest {
    doctorId: string;
    patientId: string;
    medicalHistory?: string;
    complaint?: string;
    examination?: string;
    diagnosis?: string;
    clinicNotes?: string;
    advice?: string;
    investigation?: string;
    procedure?: Procedure;
    followUpDate?: Date;
}