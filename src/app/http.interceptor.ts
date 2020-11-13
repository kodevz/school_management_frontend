import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from "@angular/core"
import { Router } from '@angular/router';
import { Observable, of } from "rxjs";
import { tap, catchError } from "rxjs/operators";
import { AuthService } from './shared/auth/auth.service';

@Injectable()
export class AppHttpInterceptor implements HttpInterceptor {
  constructor(private router: Router, private authService: AuthService) { }
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    return next.handle(req).pipe(
      tap(evt => {
        if (evt instanceof HttpResponse) {
          if (evt.body && evt.body.success) {
          }
        }
      }),
      catchError((err: any) => {
        if (err instanceof HttpErrorResponse) {
          console.log(err.error);
          if (err.error.message) {
            if (err.error.message === 'Unauthenticated.') {
              this.authService.logout();
            }
          }
        }
        return of(err);
      }));

  }

}