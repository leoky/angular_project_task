import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment, ls_name } from 'src/environments/environment';

import { MatSnackBar } from '@angular/material/snack-bar';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private snakeBar: MatSnackBar,
  ) { }

  baseurl = `${environment.api}/auth`;

  public getToken(): string | null {
    return localStorage.getItem(ls_name.TOKEN);
  }

  logIn(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.baseurl}/login`, { email, password })
      .pipe(
        tap(result => {
          if (result) {
            localStorage.setItem(ls_name.TOKEN, result.access_token);
            this.snakeBar.open('Login Success');
          }
        }),
        catchError(this.handleError)
      )
  }
  private handleError = (error: HttpErrorResponse) => {
    if (error.error instanceof ErrorEvent) {
      console.error(`An error occurred ${error.error.message}`);
      this.snakeBar.open(`An error occurred ${error.error.message}`);
    } else {
      this.snakeBar.open(`An error occurred: ${error.status} - ${error.error.error}`);
    }
    return throwError(error);
  }
}
