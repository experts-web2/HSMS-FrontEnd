import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';
import { HttpClient } from '@angular/common/http';
import { BaseEndPoints } from 'src/app/constants/enums/base-end-points';
import { IMedicationRequest } from 'src/app/models/interfaces/MedicationRequest';
import { IPrescriptionRequest } from 'src/app/models/interfaces/PrescriptionRequest';
import { IVitalRequest } from 'src/app/models/interfaces/vitalsRequest';
import { Observable } from 'rxjs';
import { ILabOrderRequest } from 'src/app/models/interfaces/LabOrder-Request';
import { IPatientVisitRequest } from 'src/app/models/interfaces/patientVisitRequest';

@Injectable({
  providedIn: 'root'
})
export class PatientVisitService extends HttpService{

  private baseEndPoint = BaseEndPoints.PatientVisit;


  constructor(private readonly http: HttpClient) {
    super(http)
  }

  addPatientVisit(patientVisit: IPatientVisitRequest): Observable<any>{
    return this.post(`${this.baseEndPoint}`, patientVisit);
  }

}
