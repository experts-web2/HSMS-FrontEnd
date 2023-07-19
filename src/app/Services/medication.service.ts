import { Injectable } from '@angular/core';
import { HttpService } from './httpService/http.service';
import { HttpClient } from '@angular/common/http';
import { BaseEndPoints } from '../constants/enums/base-end-points';
import { IMedicationRequest } from '../models/interfaces/MedicationRequest';
import { Observable } from 'rxjs';

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

  // getMedicine(fetchRequest: IFetchRequest = {}){
  //   return this.post(`${this.baseEndPoint}/all`, fetchRequest)
  // }

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
