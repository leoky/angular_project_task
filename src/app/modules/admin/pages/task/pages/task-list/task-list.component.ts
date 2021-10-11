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
  loading = false;

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
  getData(): void {
    this.loading = true;
    this.taskService.getTasks().subscribe(result => {
      if (result) {
        this.loading = false;
        this.tasks = result;
      }
    }, () => {
      this.loading = false;
    });
  }
  ngOnInit(): void {
    this.getData();
  }
}
