import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/services';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseEndPoints } from 'src/app/constants/enums/base-end-points';
import { IDropDown } from 'src/app/models/interfaces/Dropdown';
import { IPrescriptionRequest } from 'src/app/models/interfaces/PrescriptionRequest';
import { IPrescription } from 'src/app/models/interfaces/Prescription';


@Injectable({
  providedIn: 'root'
})
export class PrescriptionService extends HttpService {

  constructor(private readonly http: HttpClient) {
    super(http)
   }

  addPrescription(prescription: IPrescriptionRequest): Observable<any>{
    return this.post(`${BaseEndPoints.Prescription}`, prescription);
  }

  getPrescriptionById(id: string): Observable<IPrescription>{
    return this.get(`${BaseEndPoints.Prescription}/${id}`)
  }

  getPrescriptionByTokenId(tokenId: string): Observable<IPrescription>{
    return this.get(`${BaseEndPoints.Prescription}/getbytokenid/${tokenId}`)
  }

  updatePrescriptionById(id: string, prescription: IPrescriptionRequest): Observable<any>{
    return this.put(`${BaseEndPoints.Prescription}/${id}`, prescription)
  }
  
  getPrescriptionHistoryDropDown(patientId: string): Observable<Array<IDropDown>>{
    return this.get(`${BaseEndPoints.Prescription}/dropdownbypatientid/${patientId}`);
  }
}
