import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';
import { HttpClient } from '@angular/common/http';
import { BaseEndPoints } from 'src/app/constants/enums/base-end-points';
import { IFetchRequest } from 'src/app/models/interfaces/fetchTableRequest';
import { ObserversModule } from '@angular/cdk/observers';
import { Observable } from 'rxjs';
import { IHealthRecordRequest } from 'src/app/models/interfaces/healthRecordRequest';

@Injectable({
  providedIn: 'root'
})
export class HealtRecordService extends HttpService {

  private baseEndPoint = BaseEndPoints.HealthRecord;


  constructor(private readonly http: HttpClient) {
    super(http)
  }

  addHealthRecoed(healthRecordRequest: IHealthRecordRequest){
    return super.post(`${this.baseEndPoint}`, healthRecordRequest);
  }

  getAllHealthRecords(fetchRequest: IFetchRequest = {}){
    return super.post(`${this.baseEndPoint}/all`, fetchRequest);
  }

  deleteFetchRequest(healthRecordId: string): Observable<any>{
    return super.delete(`${this.baseEndPoint}/${healthRecordId}`);
  }

  getHealthRecordById(healthRecordId: string): Observable<any>{
    return super.get(`${this.baseEndPoint}/${healthRecordId}`);
  }

  getHealthRecordByTokenId(tokenId: string): Observable<any>{
    return this.get(`${this.baseEndPoint}/getbytokenid/${tokenId}`);
  }
}
