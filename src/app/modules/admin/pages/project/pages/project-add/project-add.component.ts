import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from 'src/app/modules/admin/service/task.service';
import { ProjectService } from 'src/app/modules/admin/services/project.service';
import { Task } from '../../models/task';

@Component({
  selector: 'app-project-add',
  templateUrl: './project-add.component.html',
  styleUrls: ['./project-add.component.scss']
})
export class ProjectAddComponent implements OnInit {
  id: string | null = null;
  displayedColumns: string[] = ['id', 'user', 'title', 'slug', 'description', 'dueDate', 'status', 'action'];
  tasks: Task[] = [];

  projectForm = this.fb.group({
    id: ['', Validators.required],
    name: ['', Validators.required],
    slug: [
      {
        value: '',
        disabled: true,
      },
      Validators.required
    ],
    description: [''],
    manager: ['', Validators.required],
  })

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

    this.projectForm.get('name')?.valueChanges.subscribe(e => {
      this.projectForm.patchValue({
        slug: e.replace(/ /g, '-')
      });
    });
  }

  getDetail(id: string): void {
    const project = this.projectService.getProjectDetail(id);
    if (project) {
      this.projectForm.patchValue(project);
      this.tasks = project.tasks ? project.tasks : [];
    }
  }

  submit(): void {
    if (this.projectForm.value && this.projectForm.valid) {
      if (this.id) {
        this.projectService.updateProject(this.projectForm.getRawValue());
      } else {
        this.projectService.createProject(this.projectForm.getRawValue());
      }
      this.router.navigate(['/admin/projects']);
    }
  }

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
}
