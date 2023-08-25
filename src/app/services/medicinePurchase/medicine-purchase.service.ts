import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';
import { HttpClient } from '@angular/common/http';
import { BaseEndPoints } from 'src/app/constants/enums/base-end-points';
import { Observable } from 'rxjs';
import { IMedicinePurchaseRequest } from 'src/app/models/interfaces/MedicinePurchase-request';
import { IMedicinePurchase } from 'src/app/models/interfaces/MedicinePurchase';

@Injectable({
  providedIn: 'root'
})
export class MedicinePurchaseService extends HttpService {

  constructor(private readonly http: HttpClient) {
    super(http)
  }

  private baseEndPoint = BaseEndPoints.MeicinePurchase;

  addMedicinePurchaseInvoice(medicinePurchasePayload: IMedicinePurchaseRequest): Observable<IMedicinePurchase> {
    return this.post(`${this.baseEndPoint}`, medicinePurchasePayload);
  }


}
