import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TaskService } from 'src/app/modules/admin/services/task.service';
import { Task } from '../../../project/models/task';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'projectId', 'user', 'title', 'slug', 'description', 'dueDate', 'status', 'action'];
  tasks: Task[] | [] = [];

  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private taskService: TaskService,
    private router: Router,
  ) { }

  goToDetail(task: Task): void {
    if (task && task.id) {
      this.router.navigate([`/admin/tasks/${task.id}`]);
    }
  }
  removeTask(id: string): void {
    if (id) {
      this.taskService.deleteTask(id);
    }
  }
  ngOnInit(): void {
    this.taskService.getTasks().pipe(takeUntil(this.destroy$)).subscribe(tasks => {
      // if (projects) {
      //   let tasks: Task[] = [];
      //   projects.forEach(project => {
      //     if (project.tasks && project.tasks.length > 0) {
      //       project.tasks.forEach(t => {
      //         tasks.push(t);
      //       });
      //     }
      //   });
      //   this.tasks = tasks;
      // }
      if (tasks) {
        this.tasks = tasks;
      }
    })
  }
  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
