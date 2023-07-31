import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/services';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseEndPoints } from 'src/app/constants/enums/base-end-points';
import { IDropDown } from 'src/app/models/interfaces/Dropdown';
import { IMedicationRequest } from 'src/app/models/interfaces/MedicationRequest';
import { IMedication } from 'src/app/models/interfaces/Medication';

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

  getMedicationById(medicationId: string): Observable<IMedication>{
    return this.get(`${this.baseEndPoint}/byid/${medicationId}`)
  }

  getMedicationByTokenId(tokenId: string): Observable<IMedication>{
    return this.get(`${this.baseEndPoint}/getbytokenid/${tokenId}`)
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
