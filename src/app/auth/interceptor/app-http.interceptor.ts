import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { UserStateService } from 'src/app/State/user/user.service';

@Injectable()
export class AppHttpInterceptor implements HttpInterceptor {

  constructor(private readonly userStateService:UserStateService) {}
  
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.userStateService.User_State.subscribe((x: any)=>{
      if (x.user.token){
        request = request.clone({
          headers: request.headers.set('Authorization', `Bearer ${x.user.accessToken}`)         
        });
      }
    });

    return next.handle(request).pipe(
      tap((response: HttpEvent<any>) => {
        return response;
      }),
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
        } 
        return throwError(error);
      })
    );
  }
}
