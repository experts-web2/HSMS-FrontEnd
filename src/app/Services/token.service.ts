import { Injectable } from '@angular/core';
import { HttpService } from './httpService/http.service';
import { HttpClient } from '@angular/common/http';
import { IAddOrUpdateToken } from '../models/interfaces/addOrUpdate-Token';
import { Observable } from 'rxjs';
import { BaseEndPoints } from '../constants/enums/base-end-points';
import { IToken } from '../models/interfaces/Token';

@Injectable({
  providedIn: 'root'
})
export class TokenService extends HttpService{

  constructor(private readonly http: HttpClient) { 
    super(http)
  }

  private baseEndPoint = BaseEndPoints.Token;


  addToken(token: IAddOrUpdateToken): Observable<IToken>{
    return this.post(`${this.baseEndPoint}/add`, token);
  }
  addPatientTest(token: any): Observable<IToken>{
    return this.post(`${this.baseEndPoint}/add`, token);
  }

  getTokensByViewd(isViewd: boolean): Observable<Array<IToken>>{
    return this.get(`${this.baseEndPoint}/getbyisviewed/${isViewd}`);
  }

  getTokenById(tokenId: string): Observable<IToken>{
    return this.get(`${this.baseEndPoint}/byid/${tokenId}`)
  }

}
