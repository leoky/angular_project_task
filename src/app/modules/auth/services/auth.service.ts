import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
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

  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.api}/lookups/users`)
      .pipe(
        map(result => {
          const newResult = Object.keys(result).map((key) => {
            return {
              value: key,
              label: result[Number(key)]
            }
          });
          return newResult;
        }),
        catchError(this.handleError)
      )
  }

  private handleError = (error: HttpErrorResponse) => {
    if (error.error && error.error.error) {
      let err = error.error.error;
      if (typeof error.error.error === 'object') {
        err = JSON.stringify(error.error.error);
      }
      this.snakeBar.open(`Error: ${error.status} - ${err}`);
    }
    return throwError(error);
  }
}
