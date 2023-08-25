import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';
import { HttpClient } from '@angular/common/http';
import { BaseEndPoints } from 'src/app/constants/enums/base-end-points';
import { IMedicineSale } from 'src/app/models/interfaces/MedicineSale';
import { Observable } from 'rxjs';
import { IMedicineSaleRequest } from 'src/app/models/interfaces/MedicineSale-Request';

@Injectable({
  providedIn: 'root'
})
export class MedicineSaleService extends HttpService {

  constructor(private readonly http: HttpClient) {
    super(http)
  }

  private baseEndPoint = BaseEndPoints.MeicineSale;

  addMedicineSaleInvoice(medicineSalePayload: IMedicineSaleRequest): Observable<IMedicineSale> {
    return this.post(`${this.baseEndPoint}`, medicineSalePayload);
  }
}
