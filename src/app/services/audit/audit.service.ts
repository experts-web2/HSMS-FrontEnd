import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';
import { HttpClient } from '@angular/common/http';
import { BaseEndPoints } from 'src/app/constants/enums/base-end-points';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuditService extends  HttpService{
  private baseEndPoint = BaseEndPoints.Audit;

  constructor(private readonly http: HttpClient) { 
    super(http)
  }

  getEntityAudit<T = any>(entityId: string): Observable<Array<T>>{
    return this.get(`${this.baseEndPoint}/${entityId}`)
  }

}
