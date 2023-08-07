import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseEndPoints } from 'src/app/constants/enums/base-end-points';
import { Endpoints } from 'src/app/constants/enums/endpoints';
import { IAddOrUpdateUser } from 'src/app/models/interfaces/addOrUpdate-User';
import { ILoginUser } from 'src/app/models/interfaces/login-user';
import { IUser } from 'src/app/models/interfaces/user';
import { HttpService } from 'src/app/services';

@Injectable({
  providedIn: 'root',
})
export class UserService extends HttpService {
  private baseEndpoint = BaseEndPoints.Account;

  constructor(private http: HttpClient) {
    super(http);
  }

  register(user: IAddOrUpdateUser): Observable<any> {
    return this.post(`${this.baseEndpoint}/${Endpoints.Register}`, user);
  }

  login(loginUser: ILoginUser) {
    return this.post(`${this.baseEndpoint}/${Endpoints.Login}`, loginUser);
  }

  addUser(user: IAddOrUpdateUser): Observable<any> {
    return this.post(`${this.baseEndpoint}/register/user`, user);
  }

  getUsers(): Observable<Array<IUser>> {
    return this.get(`${this.baseEndpoint}/byaccountid`);
  }

  updateUser(id: string, data: any): Observable<any> {
    return super.put(
      `${this.baseEndpoint}/update/${data.accountId}/${id}`,
      data
    );
  }
  updateUserData(id: string, data: any): Observable<any> {
    return super.put(
      `${this.baseEndpoint}/updateuser/${data.accountId}/${id}`,
      data
    );
  }

  deleteUser(user: IUser) {
    return this.delete(`${this.baseEndpoint}/delete/${user.id}`);
  }
}
