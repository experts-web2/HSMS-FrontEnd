import { IMedicine } from "./Medicine";

export interface IMedication {
    id: string;
    createdAt: Date;
    modifiedAt: Date;
    createdById: string;
    createdBy: string;
    modifiedById: string;
    modifiedBy: string;
    doctorId: string;
    patientId: string;
    medicationNotes: string;
    medicationDetails: IMedicationDetail[];
    healthRecordId: string;
  }
  
  export interface IMedicationDetail {
    id: string;
    createdAt: Date;
    modifiedAt: Date;
    createdById: string;
    createdBy: string;
    modifiedById: string;
    modifiedBy: string;
    medicationId: string;
    medicineId: string;
    durationValue: number;
    duration: number;
    dosageValue: number;
    dosage: number;
    route: number;
    frequency: number;
    insturction: number;
    medicineName: string;
    medicineResponse: IMedicine
  }