import { ILabOrderRequest } from "./LabOrder-Request";
import { IMedicationRequest } from "./MedicationRequest";
import { IPrescriptionRequest } from "./PrescriptionRequest";
import { IVitalRequest } from "./vitalsRequest";

export interface IPatientVisitRequest{
    medicationRequest?: IMedicationRequest, 
    prescriptionRequest?: IPrescriptionRequest, 
    vitalRequest?: IVitalRequest, 
    labOrderRequest?: ILabOrderRequest
}