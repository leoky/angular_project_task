import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ls_name } from 'src/environments/environment';
import { Task } from '../pages/project/models/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private tasksBS = new BehaviorSubject<Task[]>([]);
  tasks$ = this.tasksBS.asObservable();

  constructor() {
    this.getLS();
  }

  getTasks(): Observable<Task[]> {
    return this.tasks$;
  }

  getTaskDetail(id: string): Task | undefined {
    const tasks = [...this.tasksBS.value];
    return tasks.find(task => task.id === id);
  }

  createTask(task: Task): void {
    const tasks = [...this.tasksBS.value];
    tasks.push(task);
    this.tasksBS.next(tasks);
    this.saveToLS(tasks);
  }
  updateTask(task: Task): void {
    const tasks = [...this.tasksBS.value];
    const projectIndex = tasks.findIndex(proj => proj.id?.toString() === task.id?.toString());
    if (projectIndex >= 0) {
      tasks[projectIndex] = task;
      this.tasksBS.next(tasks);
      this.saveToLS(tasks);
    }
  }

  deleteTask(id: string): void {
    const tasks = [...this.tasksBS.value];
    const newTasks = tasks.filter(task => task.id !== id);
    this.tasksBS.next(newTasks);
    this.saveToLS(newTasks);
  }

  getTasksPerProject(projectId: string): Task[] {
    const tasks = [...this.tasksBS.value];
    return tasks.filter(task => task.projectId === projectId);
  }

  // ls
  saveToLS(tasks: Task[]): void {
    localStorage.setItem(ls_name.TASK, JSON.stringify(tasks));
  }
  getLS() {
    const tasks = localStorage.getItem(ls_name.TASK);
    if (tasks) {
      this.tasksBS.next(JSON.parse(tasks));
    }
  }
}
