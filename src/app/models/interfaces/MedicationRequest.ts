import { IMedicine } from "./Medicine";

export interface IMedicationRequest {
    doctorId: string;
    patientId: string;
    medicationDetails: IMedicationDetail[];
    medicationNotes: string;
    healthRecordId: string;
  }
  
  export interface IMedicationDetail {
    medicineId: string
    durationValue: number
    duration: number
    dosageValue: number
    dosage: number
    route: number
    frequency: number
    insturction: number
    medicineResponse?: IMedicine
  }