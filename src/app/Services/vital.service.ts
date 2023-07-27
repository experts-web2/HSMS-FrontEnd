import { Injectable } from '@angular/core';
import { BaseEndPoints } from '../constants/enums/base-end-points';
import { HttpClient } from '@angular/common/http';
import { HttpService } from './httpService/http.service';
import { IVital } from '../models/vitals';
import { Observable } from 'rxjs';
import { IDropDown } from '../models/interfaces/Dropdown';
import { IVitalRequest } from '../models/interfaces/vitalsRequest';

@Injectable({
  providedIn: 'root'
})
export class VitalService extends HttpService {

  private baseEndpoint = BaseEndPoints.Vitals;

  constructor(private http: HttpClient) {
    super(http)
   }  


   addVitals(vital: IVitalRequest): Observable<IVital>{
    return this.post(`${this.baseEndpoint}/add`, vital);
  }

   getVitals(): Observable<any>{
    return this.get(`${this.baseEndpoint}/all`);
  }

   getPreviousVisits(): Observable<any>{
    return this.get(`${this.baseEndpoint}/all`);
   }
  getVitalsHistoryDropDown(patientId: string): Observable<Array<IDropDown>>{
    return this.get(`${this.baseEndpoint}/dropdownbypatientid/${patientId}`);
  }

  getVitalsById(vitalsId: string): Observable<any>{
    return this.get(`${this.baseEndpoint}/byid/${vitalsId}`);
  }
}
