import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from 'src/app/modules/admin/services/project.service';

@Component({
  selector: 'app-project-add',
  templateUrl: './project-add.component.html',
  styleUrls: ['./project-add.component.scss']
})
export class ProjectAddComponent implements OnInit {
  id: string | null = null;

  projectForm = this.fb.group({
    id: ['', Validators.required],
    name: ['', Validators.required],
    slug: ['', Validators.required],
    description: [''],
    manager: ['', Validators.required],
  })

  constructor(
    private fb: FormBuilder,
    private projectService: ProjectService,
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
  }

  getDetail(id: string): void {
    const project = this.projectService.getProjectDetail(id);
    if (project) {
      this.projectForm.patchValue(project);
    }
  }

  submit(): void {
    if (this.projectForm.value && this.projectForm.valid) {
      this.projectService.createProject(this.projectForm.value);
      this.router.navigate(['/admin/projects']);
    }
  }
}
