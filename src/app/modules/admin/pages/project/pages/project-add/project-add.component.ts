import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from 'src/app/modules/admin/services/task.service';
import { ProjectService } from 'src/app/modules/admin/services/project.service';
import { Task } from '../../models/task';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { Option } from 'src/app/core/models/Option';

@Component({
  selector: 'app-project-add',
  templateUrl: './project-add.component.html',
  styleUrls: ['./project-add.component.scss']
})
export class ProjectAddComponent implements OnInit {
  id: string | null = null;
  displayedColumns: string[] = ['id', 'user', 'title', 'slug', 'dueDate', 'status', 'action'];
  tasks: Task[] = [];
  userOption: Option[] =[];

  loading = false;
  loadingTask = false;

  projectForm = this.fb.group({
    id: [
      {
        value: '',
        disabled: true,
      },
      Validators.required],
    name: ['', Validators.required],
    slug: [
      {
        value: '',
        disabled: true,
      },
      Validators.required
    ],
    description: [''],
    manager_id: ['', Validators.required],
  })

  constructor(
    private fb: FormBuilder,
    private projectService: ProjectService,
    private authService: AuthService,
    private taskService: TaskService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
      if (this.id) {
        this.getDetail(this.id);
        this.getTask(this.id);
      }
    });

    this.authService.getUsers().subscribe(result => {
      this.userOption = result;
    });
  }

  getDetail(id: string): void {
    this.loading = true;
    this.projectService.getProjectDetail(id).subscribe(result => {
      if (result) {
        this.loading = false;
        this.projectForm.patchValue({
          ...result,
          manager_id: result.manager_id?.toString()
        });
      }
    }, (error) => {
      this.loading = false;
    })
  }

  getTask(id: string): void {
    this.loadingTask = true;
    this.projectService.getProjectTasks(id).subscribe(result => {
      if (result) {
        this.loadingTask = false;
        this.tasks = result;
      }
    }, (error) => {
      this.loadingTask = false;
    })
  }

  submit(): void {
    if (this.projectForm.value && this.projectForm.valid) {
      this.loading = true;
      const form = this.projectForm.getRawValue();
      const body = {
        name: form.name,
        description: form.description,
        manager_id: form.manager?.value
      };

      if (this.id) {
        this.projectService.updateProject(body, this.id).subscribe(result => {
          if (result) {
            this.loading = false;
          }
        }, () => {
          this.loading = false;
        });
      } else {
        this.projectService.createProject(body).subscribe(result => {
          this.loading = false;
          this.router.navigate(['/admin/projects']);
        }, () => {
          this.loading = false;
        })
      }
    }
  }

  goToDetail(task: Task): void {
    if (task && task.id) {
      this.router.navigate([`/admin/tasks/${task.id}`]);
    }
  }

  removeTask(id: string): void {
    if (id && this.id) {
      this.loadingTask = true;
      this.taskService.deleteTask(id).subscribe(result => {
        if (this.id) {
          this.loadingTask = false;
          this.getTask(this.id);
        }
      }, () => {
        this.loadingTask = false;
      });
    }
  }
}
