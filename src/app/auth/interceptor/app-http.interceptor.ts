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

@Injectable()
export class AppHttpInterceptor implements HttpInterceptor {

  constructor(private readonly encryptionService: EncryptionService) { }

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
        }
        return throwError(error);
      })
    );
  }
}
