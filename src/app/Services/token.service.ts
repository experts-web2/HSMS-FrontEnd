import { Injectable } from '@angular/core';
import { HttpService } from './httpService/http.service';
import { HttpClient } from '@angular/common/http';
import { IAddOrUpdateToken } from '../models/interfaces/addOrUpdate-Token';
import { Observable } from 'rxjs';
import { BaseEndPoints } from '../constants/enums/base-end-points';

@Injectable({
  providedIn: 'root'
})
export class TokenService extends HttpService{

  constructor(private readonly http: HttpClient) { 
    super(http)
  }

  private baseEndPoint = BaseEndPoints.Token;


  addToken(token: IAddOrUpdateToken): Observable<any>{
    return this.post(`${this.baseEndPoint}/add`, token);
  }
}
