import { Injectable } from '@angular/core';
import { HttpService } from './httpService/http.service';
import { HttpClient } from '@angular/common/http';
import { BaseEndPoints } from '../models/enums/base-end-points';
import { Endpoints } from '../models/enums/endpoints'; 
import { IUser } from '../models/user';
import { Observable } from 'rxjs';
import { ILoginUser } from '../models/login-user';
@Injectable({
  providedIn: 'root'
})
export class UserService extends HttpService {

  private baseEndpoint = BaseEndPoints.Account;

  constructor(private http: HttpClient) {
    super(http)
   }   

  register(user: IUser): Observable<any>{
   return this.post(`${this.baseEndpoint}/${Endpoints.Register}`, user);
  }

  login(loginUser: ILoginUser){
    return this.post(`${this.baseEndpoint}/${Endpoints.Login}`, loginUser);
  }

}
