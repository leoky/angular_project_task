import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Option } from 'src/app/core/models/Option';
import { environment } from 'src/environments/environment';

import { Project } from '../pages/project/models/project';
import { Task } from '../pages/project/models/task';

@Injectable()
export class ProjectService {

  baseurl = `${environment.api}/projects`;

  private projectsBS = new BehaviorSubject<Project[]>([]);
  projects$ = this.projectsBS.asObservable();

  constructor(
    private http: HttpClient,
    private snakeBar: MatSnackBar,
  ) {
  }


  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(`${this.baseurl}`)
      .pipe(
        catchError(this.handleError)
      )
  }
  getProjectOptions(): Observable<Option[]> {
    return this.http.get<Project[]>(`${this.baseurl}`)
      .pipe(
        map(result => result.map(project => ({
          value: project.id?.toString(),
          label: project.name
        }))),
        catchError(this.handleError)
      )
  }

  getProjectTasks(id: string): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.baseurl}/${id}/tasks`)
      .pipe(
        catchError(this.handleError)
      )
  }

  getProjectDetail(id: string): Observable<Project> {
    return this.http.get<Project>(`${this.baseurl}/${id}`)
      .pipe(
        catchError(this.handleError)
      )
  }

  createProject(data: Project): Observable<Project> {
    return this.http.post<Project>(`${this.baseurl}`, data)
      .pipe(
        tap(result => {
          this.snakeBar.open('Project has been created');
        }),
        catchError(this.handleError)
      )
  }
  updateProject(data: Project, id: string): Observable<Project> {
    return this.http.put<Project>(`${this.baseurl}/${id}`, data)
      .pipe(
        tap(result => {
          this.snakeBar.open('Project has been updated');
        }),
        catchError(this.handleError)
      )
  }
  deleteProject(id: string): Observable<any> {
    return this.http.delete<any>(`${this.baseurl}/${id}`)
      .pipe(
        tap(result => {
          this.snakeBar.open('Project has been deleted');
        }),
        catchError(this.handleError)
      )
  }
  getProjectss(): Observable<Project[]> {
    return this.projects$;
  }

  // getProjectDetail(id: string): Project | undefined {
  //   const projects = [...this.projectsBS.value];
  //   const projectDetail = projects.find(project => project.id === id);
  //   if (projectDetail && projectDetail.id) {
  //     projectDetail.tasks = this.taskService.getTasksPerProject(projectDetail.id);
  //     return projectDetail;
  //   }
  //   return;
  // }

  // createProject(project: Project): void {
  //   const projects = [...this.projectsBS.value];
  //   projects.push(project);
  //   this.projectsBS.next(projects);
  //   this.saveToLS(projects);
  // }
  // updateProject(project: Project): void {
  //   const projects = [...this.projectsBS.value];
  //   const projectIndex = projects.findIndex(proj => proj.id?.toString() === project.id?.toString());
  //   if (projectIndex >= 0) {
  //     projects[projectIndex] = project;
  //     this.projectsBS.next(projects);
  //     this.saveToLS(projects);
  //   }
  // }

  // deleteProject(id: string): void {
  //   const projects = [...this.projectsBS.value];
  //   const newProjects = projects.filter(project => project.id !== id);
  //   this.projectsBS.next(newProjects);
  //   this.saveToLS(newProjects);
  // }

  // ls
  // saveToLS(projects: Project[]): void {
  //   localStorage.setItem(ls_name.PROJECT, JSON.stringify(projects));
  // }
  // getLS() {
  //   const projects = localStorage.getItem(ls_name.PROJECT);
  //   if (projects) {
  //     this.projectsBS.next(JSON.parse(projects));
  //   }
  // }
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
