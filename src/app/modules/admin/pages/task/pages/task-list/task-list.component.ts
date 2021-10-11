import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, takeUntil, tap } from 'rxjs/operators';
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

  search = new FormControl('');

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
      this.taskService.deleteTask(id).subscribe(result => {
        this.getData();
      });
    }
  }
  getData(query = ''): void {
    this.loading = true;
    this.taskService.getTasks(query).subscribe(result => {
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

    this.search.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      tap(() => { this.loading = true }),
      switchMap(value => this.taskService.getTasks(value))
    ).subscribe(result => {
      this.loading = false;
      this.tasks = result;
    }, () => {
      this.loading = false;
    });
  }
}
