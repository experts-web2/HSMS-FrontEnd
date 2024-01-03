import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, finalize, tap, throwError } from 'rxjs';
import { EncryptionService, LoaderService } from 'src/app/services';
import { AuthService } from 'src/app/services';

@Injectable()
export class AppHttpInterceptor implements HttpInterceptor {

  constructor(private readonly encryptionService: EncryptionService, private readonly authService: AuthService, private readonly loaderService: LoaderService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let loggedInUser = this.encryptionService.decryptFromLocalStorage('common');
    this.loaderService.show()
    
    if (loggedInUser && loggedInUser.token) {
      request = request.clone({
        headers: request.headers.set('Authorization', `Bearer ${loggedInUser.token}`)
      });
    }
    return next.handle(request).pipe(
      tap((response: HttpEvent<any>) => {
        return response;
      }),
      finalize(() => {
        this.loaderService.hide();        
      }),
      catchError((error: HttpErrorResponse) => {
        this.loaderService.hide();        
        if (error.status === 401) {
          this.authService.logOut();
        }
        return throwError(error);
      })
    );
  }
}
