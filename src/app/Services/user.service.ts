import { Injectable } from '@angular/core';
import { HttpService } from './httpService/http.service';
import { HttpClient } from '@angular/common/http';
import { BaseEndPoints } from '../constants/enums/base-end-points';
import { Endpoints } from '../constants/enums/endpoints'; 
import { IUser } from '../models/interfaces/user';
import { Observable } from 'rxjs';
import { ILoginUser } from '../models/interfaces/login-user';
import { IFetchRequest } from '../models/interfaces/fetchTableRequest';
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

  addUser(user: IUser): Observable<any>{
    return this.post(`${this.baseEndpoint}/register/user`, user)
  }

  getUsers(fetchRequest: IFetchRequest): Observable<any>{
    return this.post(`${this.baseEndpoint}`, fetchRequest)
  }

  getUsersByAccount(): Observable<any>{
    return this.get(`${this.baseEndpoint}/byaccountid`)
  }

}
