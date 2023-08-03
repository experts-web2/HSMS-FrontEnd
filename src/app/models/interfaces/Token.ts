export interface IToken {
    id: string;
    createdAt: string;
    modifiedAt: string;
    createdById: string;
    createdBy: string;
    modifiedById: string;
    modifiedBy: string;
    doctorId: string;
    doctorName: string;
    patientId: string;
    patientName: string;
    tokenNo: number;
    patientCheckedIn: boolean;
    isViewed: boolean;
    tokenDetail?: ITokenDetail;
  }

  
  export interface ITokenDetail {
    tokenId?: string;
    tokenTypes?: number;
    pulseHeartRate?: number;
    temperature?: number;
    bloodPressure?: string;
    respiratoryRate?: number;
    bloodSugar?: number;
    height?: number;
    weight?: number;
    bodyMassIndex?: number;
    bodySurfaceArea?: number;
    oxygenSaturation?: number;
    diastolicBloodPressure?: number;
    id: string;
    createdAt: Date;
    modifiedAt?: Date;
    createdById?: string;
    createdBy?: string;
    modifiedById?: string;
    modifiedBy?: string;
  }