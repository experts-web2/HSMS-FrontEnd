import { Injectable } from '@angular/core';
import { HttpService } from './httpService/http.service';
import { HttpClient } from '@angular/common/http';
import { IPrescriptionRequest } from '../models/interfaces/PrescriptionRequest';
import { Observable } from 'rxjs';
import { BaseEndPoints } from '../constants/enums/base-end-points';
import { IDropDown } from '../models/interfaces/Dropdown';

@Injectable({
  providedIn: 'root'
})
export class PrescriptionService extends HttpService {

  constructor(private readonly http: HttpClient) {
    super(http)
   }

  addPrescription(prescription: IPrescriptionRequest): Observable<any>{
    return this.post(`${BaseEndPoints.Prescription}/add`, prescription);
  }

  getPrescriptionById(id: string): Observable<any>{
    return this.get(`${BaseEndPoints.Prescription}/${id}`)
  }

  updatePrescriptionById(id: string, prescription: IPrescriptionRequest): Observable<any>{
    return this.post(`${BaseEndPoints.Prescription}/${id}`, prescription)
  }
  
  getPrescriptionHistoryDropDown(patientId: string): Observable<Array<IDropDown>>{
    return this.get(`${BaseEndPoints.Prescription}/dropdownbypatientid/${patientId}`);
  }
}
