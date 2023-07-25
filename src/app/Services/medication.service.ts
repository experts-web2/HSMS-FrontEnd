import { Injectable } from '@angular/core';
import { HttpService } from './httpService/http.service';
import { HttpClient } from '@angular/common/http';
import { BaseEndPoints } from '../constants/enums/base-end-points';
import { IMedicationRequest } from '../models/interfaces/MedicationRequest';
import { Observable } from 'rxjs';
import { IDropDown } from '../models/interfaces/Dropdown';

@Injectable({
  providedIn: 'root'
})
export class MedicationService extends HttpService {

  constructor(private readonly http: HttpClient) {
    super(http)
  }

  private baseEndPoint = BaseEndPoints.Medication;

  addMedication(medication: IMedicationRequest): Observable<any>{
    return this.post(`${this.baseEndPoint}/add`, medication);
  }

  getMedicationHistoryDropDown(patientId: string): Observable<Array<IDropDown>>{
    return this.get(`${this.baseEndPoint}/dropdownbypatientid/${patientId}`);
  }

  getMedicationById(medicationId: string): Observable<any>{
    return this.get(`${this.baseEndPoint}/byid/${medicationId}`)
  }

  // deleteMedicine(deleteMedicine: any){
  //   return this.delete(`${this.baseEndPoint}/delete/${deleteMedicine.id}`)
  // }

  // updateMedicine(id: string, medicine: IMedicinerequest){
  //   return this.put(`${this.baseEndPoint}/update/${id}`, medicine)
  // }

  // getMedicineDropDown(): Observable<Array<IDropDown>>{
  //   return this.get(`${this.baseEndPoint}/dropdown`);
  // }
}
