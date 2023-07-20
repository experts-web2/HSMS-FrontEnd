import { Injectable } from '@angular/core';
import { BaseEndPoints } from '../constants/enums/base-end-points';
import { HttpClient } from '@angular/common/http';
import { HttpService } from './httpService/http.service';
import { IVital } from '../models/vitals';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VitalService extends HttpService {

  private baseEndpoint = BaseEndPoints.Vitals;

  constructor(private http: HttpClient) {
    super(http)
   }  


   addVitals(vital: IVital): Observable<any>{
    return this.post(`${this.baseEndpoint}/add`, vital);
  }

   getVitals(): Observable<any>{
    return this.get(`${this.baseEndpoint}/all`);
  }

   getPreviousVisits(): Observable<any>{
    return this.get(`${this.baseEndpoint}/all`);
  }
}
