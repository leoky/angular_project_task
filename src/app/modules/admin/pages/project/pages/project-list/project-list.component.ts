import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ProjectService } from 'src/app/modules/admin/services/project.service';
import { Project } from '../../models/project';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit, OnDestroy {

  displayedColumns: string[] = ['id', 'name', 'slug', 'description', 'manager', 'action'];
  projects: Project[] | [] = [];

  destroy$: Subject<boolean> = new Subject<boolean>();

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
      this.projectService.deleteProject(id);
    }
  }
  ngOnInit(): void {
    // this.projectService.getProjects().pipe(takeUntil(this.destroy$)).subscribe(projects => {
    //   if (projects) {
    //     this.projects = projects;
    //   }
    // })
    this.projectService.getProjects().subscribe(result => {
      if (result) {
        this.projects = result;
      }
    });
  }
  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

}
