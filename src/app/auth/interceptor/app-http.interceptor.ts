import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { EncryptionService } from 'src/app/Services/encryption-service/encryption.service';
import { UserStateService } from '../../State/user/user.service';
import { AuthService } from 'src/app/Services/auth-service/auth.service';

@Injectable()
export class AppHttpInterceptor implements HttpInterceptor {

  constructor(private readonly encryptionService: EncryptionService, private readonly authService: AuthService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let loggedInUser = this.encryptionService.decryptFromLocalStorage('common');
    
    if (loggedInUser && loggedInUser.token) {
      request = request.clone({
        headers: request.headers.set('Authorization', `Bearer ${loggedInUser.token}`)
      });
    }

    return next.handle(request).pipe(
      tap((response: HttpEvent<any>) => {
        return response;
      }),
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          this.authService.logOut();
        }
        return throwError(error);
      })
    );
  }
}
