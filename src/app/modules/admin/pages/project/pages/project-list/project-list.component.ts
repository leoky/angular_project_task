import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectService } from 'src/app/modules/admin/services/project.service';
import { Project } from '../../models/project';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'slug', 'description', 'manager', 'action'];
  projects: Project[] | [] = [];
  loading = false;

  // destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private projectService: ProjectService,
    private router: Router,
  ) { }

  goToDetail(project: Project): void {
    if (project && project.id) {
      this.router.navigate([`/admin/projects/${project.id}`]);
    }
  }
  removeProject(id: string): void {
    if (id) {
      this.projectService.deleteProject(id).subscribe(result => {
        this.getData();
      });
    }
  }
  getData(): void {
    this.loading = true;
    this.projectService.getProjects().subscribe(result => {
      if (result) {
        this.loading = false;
        this.projects = result;
      }
    }, () => {
      this.loading = false;
    });
  }

  ngOnInit(): void {
    this.getData();
  }
}
