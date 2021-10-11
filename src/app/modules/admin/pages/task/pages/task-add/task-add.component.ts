import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { TaskService } from 'src/app/modules/admin/services/task.service';

import { ProjectService } from 'src/app/modules/admin/services/project.service';
import { Option } from 'src/app/core/models/Option';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
@Component({
  selector: 'app-task-add',
  templateUrl: './task-add.component.html',
  styleUrls: ['./task-add.component.scss']
})
export class TaskAddComponent implements OnInit {

  id: string | null = null;
  statusOption = ['To Do', 'Doing', 'Done'];
  projectOption: Option[] = [];
  userOption: Option[] = [];
  loading = false;
  // ui
  showMore = false;

  taskForm = this.fb.group({
    id: [
      {
        value: '',
        disabled: true,
      },
      Validators.required],
    project_id: ['', Validators.required],
    assigned_to_user_id: ['', Validators.required],
    title: ['', Validators.required],
    slug: [
      {
        value: '',
        disabled: true,
      },
      Validators.required
    ],
    description: [''],
    due_date: [''],
    status: [this.statusOption[0], Validators.required],
  });

  editorConfig: AngularEditorConfig = {
    editable: true,
    minHeight: '100px',
    toolbarHiddenButtons: [
      [
        'insertImage',
        'insertVideo',
        'toggleEditorMode',
      ]
    ],
  };

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private projectService: ProjectService,
    private taskService: TaskService,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
      if (this.id) {
        this.getDetail(this.id);
      }
    });
    // get list project id
    this.projectService.getProjectOptions().subscribe(result => {
      this.projectOption = result;
    });
    // get list user
    this.authService.getUsers().subscribe(result => {
      this.userOption = result;
    });
  }

  getDetail(id: string): void {
    this.loading = true;
    this.taskService.getTaskDetail(id).subscribe(task => {
      if (task) {
        this.loading = false;
        this.taskForm.patchValue({
          ...task,
          assigned_to_user_id: task.assigned_to_user_id?.toString(),
          project_id: task.project_id?.toString(),
        });
      }
    }, () => {
      this.loading = false;
    });

  }

  submit(): void {
    if (this.taskForm.value && this.taskForm.valid) {
      this.loading = true;
      const form = this.taskForm.getRawValue();
      const body = {
        ...form,
        project_id: form.project?.value,
        assigned_to: form.user?.value,
      };
      if (this.id) {
        this.taskService.updateTask(body, this.id).subscribe(result => {
          if (result) {
            this.loading = false;
          }
        }, () => {
          this.loading = false;
        });
      } else {
        this.taskService.createTask(body).subscribe(result => {
          this.loading = false;
          this.router.navigate(['/admin/tasks']);
        }, () => {
          this.loading = false;
        })
      }
    }
  }
}
