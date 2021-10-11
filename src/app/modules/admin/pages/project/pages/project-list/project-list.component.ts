import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, switchMap, tap } from 'rxjs/operators';
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
  filterProjects: Project[] | [] = [];
  loading = false;
  userId = '';

  search = new FormControl('');

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
        this.filterProjects = result;
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
      switchMap(value => this.projectService.getProjects(value))
    ).subscribe(result => {
      this.loading = false;
      this.projects = result;
    }, () => {
      this.loading = false;
    });
  }
}
