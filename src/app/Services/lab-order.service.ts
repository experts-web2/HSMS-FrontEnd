import { Injectable } from '@angular/core';
import { HttpService } from './httpService/http.service';
import { HttpClient } from '@angular/common/http';
import { BaseEndPoints } from '../constants/enums/base-end-points';
import { ILabOrderRequest } from '../models/interfaces/LabOrder-Request';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class LabOrderService extends HttpService{

  constructor(private readonly http: HttpClient) {
    super(http)
  }

  private baseEndPoint = BaseEndPoints.LabOrder;

  addMedication(LabOrder: ILabOrderRequest): Observable<any>{
    return this.post(`${this.baseEndPoint}/add`, LabOrder);
  }

//   getMedicationHistoryDropDown(patientId: string): Observable<Array<IDropDown>>{
//     return this.get(`${this.baseEndPoint}/dropdownbypatientid/${patientId}`);
//   }

//   getMedicationById(medicationId: string): Observable<any>{
//     return this.get(`${this.baseEndPoint}/byid/${medicationId}`)
//   }
}
