import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ls_name } from 'src/environments/environment';
import { AuthService } from 'src/app/modules/auth/services/auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(
    private router: Router,
    private authService: AuthService,
  ) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${this.authService.getToken()}`
      }
    });
    return next.handle(request).pipe(
      tap(
        () => { },
        (error: HttpErrorResponse) => {
          if (error.status !== 401) return;
          this.router.navigate(['/auth/login']);
          localStorage.removeItem(ls_name.TOKEN);
        }
      )
    )
  }
}
