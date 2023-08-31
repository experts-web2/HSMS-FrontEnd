import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/services';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseEndPoints } from 'src/app/constants/enums/base-end-points';
import { ILabOrderRequest } from 'src/app/models/interfaces/LabOrder-Request';


@Injectable({
  providedIn: 'root'
})
export class LabOrderService extends HttpService{

  constructor(private readonly http: HttpClient) {
    super(http)
  }

  private baseEndPoint = BaseEndPoints.LabOrder;

  addMedication(LabOrder: ILabOrderRequest): Observable<any>{
    return this.post(`${this.baseEndPoint}`, LabOrder);
  }

  getLabOrderByTokenId(tokenId: string){
    return this.get(`${this.baseEndPoint}/getbytokenid/${tokenId}`)
  }
//   getMedicationHistoryDropDown(patientId: string): Observable<Array<IDropDown>>{
//     return this.get(`${this.baseEndPoint}/dropdownbypatientid/${patientId}`);
//   }

//   getMedicationById(medicationId: string): Observable<any>{
//     return this.get(`${this.baseEndPoint}/${medicationId}`)
//   }
}
