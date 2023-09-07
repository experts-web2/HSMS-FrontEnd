  export interface IVitalRequest {
    pulseHeartRate?: number;
    temperature?: number;
    bloodPressure?: string;
    diastolicBloodPressure?: number;
    respiratoryRate?: number;
    bloodSugar?: number;
    weight?: number;
    height?: number;
    bodyMassIndex?: number;
    oxygenSaturation?: number;
    bodySurfaceArea?: number;
    reason?: string;
    patientId: string;
    doctorId: string;
    healthRecordId: string;
  }