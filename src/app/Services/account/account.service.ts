import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpService } from '../';
import { BaseEndPoints } from 'src/app/constants/enums/base-end-points';

@Injectable({
  providedIn: 'root'
})
export class AccountService extends HttpService {
  baseEndPoints: string = BaseEndPoints.Account;
  constructor(private readonly http: HttpClient) { 
    super(http)
  }

  getAccountByID(acccounId: string){
    return this.get(`${BaseEndPoints.Account}/${acccounId}`);
  }
}
