import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/services';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseEndPoints } from 'src/app/constants/enums/base-end-points';
import { IDropDown } from 'src/app/models/interfaces/Dropdown';
import { IPrescriptionRequest } from 'src/app/models/interfaces/PrescriptionRequest';


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
    return this.get(`${BaseEndPoints.Prescription}/byid/${id}`)
  }

  updatePrescriptionById(id: string, prescription: IPrescriptionRequest): Observable<any>{
    return this.post(`${BaseEndPoints.Prescription}/${id}`, prescription)
  }
  
  getPrescriptionHistoryDropDown(patientId: string): Observable<Array<IDropDown>>{
    return this.get(`${BaseEndPoints.Prescription}/dropdownbypatientid/${patientId}`);
  }
}
