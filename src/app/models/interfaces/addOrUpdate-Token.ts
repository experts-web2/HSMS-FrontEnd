export interface IAddOrUpdateToken{
    patientId: string,
    tokenDetails: Array<ITokenDetail>,
    doctorId?: string,
    patientCheckedIn?: true
  }

export interface ITokenDetail{
    tokenTypes: number;
    pulseHeartRate: number;
    temperature: number;
    bloodPressure: string;
    respiratoryRate: number;
    bloodSugar: number;
    height: number;
    weight: number;
    bodyMassIndex: number;
    bodySurfaceArea: number;
    oxygenSaturation: number;
}