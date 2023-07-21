import { Injectable } from '@angular/core';
import { BaseEndPoints } from '../constants/enums/base-end-points';
import { HttpClient } from '@angular/common/http';
import { HttpService } from './httpService/http.service';
import { IVital } from '../models/vitals';
import { Observable } from 'rxjs';
import { IDropDown } from '../models/interfaces/Dropdown';

@Injectable({
  providedIn: 'root'
})
export class VitalService extends HttpService {

  private baseEndpoint = BaseEndPoints.Vital;

  constructor(private http: HttpClient) {
    super(http)
   }  


   addVitals(vital: IVital): Observable<any>{
    return this.post(`${this.baseEndpoint}/add`, vital);
  }

  getVitalsHistoryDropDown(patientId: string): Observable<Array<IDropDown>>{
    return this.get(`${BaseEndPoints.Prescription}/dropdownbypatientid/${patientId}`);
  }

  getVitalsById(vitalsId: string): Observable<any>{
    return this.get(`${BaseEndPoints.Prescription}/byid/${vitalsId}`);
  }
}
