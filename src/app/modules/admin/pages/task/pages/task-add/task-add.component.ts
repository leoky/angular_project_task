import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TaskService } from 'src/app/modules/admin/service/task.service';

import { ProjectService } from 'src/app/modules/admin/services/project.service';

interface Option {
  label?: string;
  value?: string;
}
@Component({
  selector: 'app-task-add',
  templateUrl: './task-add.component.html',
  styleUrls: ['./task-add.component.scss']
})
export class TaskAddComponent implements OnInit, OnDestroy {

  id: string | null = null;
  statusOption = ['to do', 'doing', 'done'];
  projectOption: Option[] = [];

  taskForm = this.fb.group({
    id: ['', Validators.required],
    projectId: ['', Validators.required],
    user: ['', Validators.required],
    title: ['', Validators.required],
    slug: [ Date.now(), Validators.required],
    description: [''],
    dueDate: [''],
    status: [this.statusOption[0], Validators.required],
  })

  destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(
    private fb: FormBuilder,
    private projectService: ProjectService,
    private taskService: TaskService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
      if (this.id) {
        this.getDetail(this.id);
      }
    });
    // get list project id
    this.projectService.getProjects().pipe(takeUntil(this.destroy$)).subscribe(projects => {
      if (projects) {
        this.projectOption = projects.map(project => {
          return {
            value: project.id,
            label: project.name
          };
        });
      }
    });
  }

  getDetail(id: string): void {
    const task = this.taskService.getTaskDetail(id);

    if (task) {
      this.taskForm.patchValue(task);
    }
  }

  submit(): void {
    if (this.taskForm.value && this.taskForm.valid) {
      if (this.id) {
        this.taskService.updateTask(this.taskForm.value);
      } else {
        this.taskService.createTask(this.taskForm.value);
      }
      this.router.navigate(['/admin/tasks']);
    }
  }
  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

}
