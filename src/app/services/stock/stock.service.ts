import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IDataSourceResponse } from 'src/app/models/interfaces/DataSourceResponse';
import { BaseEndPoints } from 'src/app/constants/enums/base-end-points';
import { IFetchRequest } from 'src/app/models/interfaces/fetchTableRequest';
import { IStock } from 'src/app/models/interfaces/stock';

@Injectable({
  providedIn: 'root'
})
export class StockService extends HttpService {
  constructor(private readonly http: HttpClient) {
    super(http);
  }
  private baseEndPoint = BaseEndPoints.Stock;

  getStockDetails(fetchRequest: IFetchRequest = {}): Observable<IDataSourceResponse<IStock>> {
    return this.post(`${this.baseEndPoint}/all`, fetchRequest);
  }

}
