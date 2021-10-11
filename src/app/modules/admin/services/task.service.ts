import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment, ls_name } from 'src/environments/environment';
import { Task } from '../pages/project/models/task';

@Injectable()
export class TaskService {
  private tasksBS = new BehaviorSubject<Task[]>([]);
  tasks$ = this.tasksBS.asObservable();
  private baseurl = `${environment.api}/tasks`;

  constructor(
    private http: HttpClient,
    private snakeBar: MatSnackBar,
  ) {
  }

  getTasks(query = ''): Observable<Task[]> {
    let params = new HttpParams().set('keyword', query);
    return this.http.get<Task[]>(`${this.baseurl}`, { params })
      .pipe(
        catchError(this.handleError)
      )
  }

  getTaskDetail(id: string): Observable<Task> {
    return this.http.get<Task>(`${this.baseurl}/${id}`)
      .pipe(
        catchError(this.handleError)
      )
  }

  createTask(task: Task): Observable<Task> {
    return this.http.post<Task>(`${this.baseurl}`, task)
      .pipe(
        tap(result => {
          this.snakeBar.open('Task has been created');
        }),
        catchError(this.handleError)
      )
  }
  updateTask(data: Task, id: string): Observable<Task> {
    return this.http.put<Task>(`${this.baseurl}/${id}`, data)
      .pipe(
        tap(result => {
          this.snakeBar.open('Task has been updated');
        }),
        catchError(this.handleError)
      )
  }

  deleteTask(id: string): Observable<any> {
    return this.http.delete<any>(`${this.baseurl}/${id}`)
      .pipe(
        tap(result => {
          this.snakeBar.open('Task has been deleted');
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
