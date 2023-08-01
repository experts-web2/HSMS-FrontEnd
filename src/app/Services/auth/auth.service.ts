import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';
import { HttpClient } from '@angular/common/http';
import { BaseEndPoints } from '../../constants/enums/base-end-points';
import { ILoginUser } from 'src/app/models/interfaces/login-user';
import { UserStateService } from '../../State/user/user.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends HttpService {
  baseEndPoint = BaseEndPoints.Account

  constructor(private readonly http: HttpClient, private readonly userStateService: UserStateService, private readonly router: Router) {
    super(http)
  }

  login(loginModel: ILoginUser): Observable<any>{
    return this.post(`${this.baseEndPoint}/login`, loginModel);
  }

  logOut(): void{
    this.userStateService.destroyUserState();
    localStorage.clear();
    this.router.navigate(['/sign-in'])
  }
}
