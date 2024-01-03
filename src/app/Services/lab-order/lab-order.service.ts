import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/services';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseEndPoints } from 'src/app/constants/enums/base-end-points';
import { ILabOrderRequest } from 'src/app/models/interfaces/LabOrder-Request';
import { IDataSourceResponse } from 'src/app/models/interfaces/DataSourceResponse';
import { ILabOrder } from 'src/app/models/interfaces/labOrder';
import { IFetchRequest } from 'src/app/models/interfaces/fetchTableRequest';


@Injectable({
  providedIn: 'root'
})
export class LabOrderService extends HttpService{

  constructor(private readonly http: HttpClient) {
    super(http)
  }

  private baseEndPoint = BaseEndPoints.LabOrder;

  addMedication(LabOrder: ILabOrderRequest): Observable<ILabOrder>{
    return this.post(`${this.baseEndPoint}`, LabOrder);
  }

  getLabOrderByTokenId(tokenId: string){
    return this.get(`${this.baseEndPoint}/getbytokenid/${tokenId}`)
  }

  updateLabOrder(laborderId: string, laborder: ILabOrderRequest): Observable<any>{
    return this.put(`${this.baseEndPoint}/${laborderId}`, laborder);
  }

  getLabOrders(fetchRequest: IFetchRequest = {}): Observable<IDataSourceResponse<ILabOrder>>{
    return this.post(`${this.baseEndPoint}/all`, fetchRequest);
  }

//   getMedicationById(medicationId: string): Observable<any>{
//     return this.get(`${this.baseEndPoint}/${medicationId}`)
//   }
}
