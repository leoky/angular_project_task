import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment, ls_name } from 'src/environments/environment';

import { Project } from '../pages/project/models/project';
import { Task } from '../pages/project/models/task';
import { TaskService } from '../services/task.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  baseurl = `${environment.api}/projects`;

  private projectsBS = new BehaviorSubject<Project[]>([]);
  projects$ = this.projectsBS.asObservable();

  constructor(
    private http: HttpClient,
    private snakeBar: MatSnackBar,
    private taskService: TaskService,
  ) {
    this.getLS();
  }


  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(`${this.baseurl}`)
      .pipe(
        tap(result => {
          return result;
        },
          catchError(this.handleError)
        )
      )
  }
  getProjectss(): Observable<Project[]> {
    return this.projects$;
  }

  getProjectDetail(id: string): Project | undefined {
    const projects = [...this.projectsBS.value];
    const projectDetail = projects.find(project => project.id === id);
    if (projectDetail && projectDetail.id) {
      projectDetail.tasks = this.taskService.getTasksPerProject(projectDetail.id);
      return projectDetail;
    }
    return;
  }

  createProject(project: Project): void {
    const projects = [...this.projectsBS.value];
    projects.push(project);
    this.projectsBS.next(projects);
    this.saveToLS(projects);
  }
  updateProject(project: Project): void {
    const projects = [...this.projectsBS.value];
    const projectIndex = projects.findIndex(proj => proj.id?.toString() === project.id?.toString());
    if (projectIndex >= 0) {
      projects[projectIndex] = project;
      this.projectsBS.next(projects);
      this.saveToLS(projects);
    }
  }

  deleteProject(id: string): void {
    const projects = [...this.projectsBS.value];
    const newProjects = projects.filter(project => project.id !== id);
    this.projectsBS.next(newProjects);
    this.saveToLS(newProjects);
  }

  // ls
  saveToLS(projects: Project[]): void {
    localStorage.setItem(ls_name.PROJECT, JSON.stringify(projects));
  }
  getLS() {
    const projects = localStorage.getItem(ls_name.PROJECT);
    if (projects) {
      this.projectsBS.next(JSON.parse(projects));
    }
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
