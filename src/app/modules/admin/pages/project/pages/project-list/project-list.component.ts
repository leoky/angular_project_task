import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, switchMap, tap } from 'rxjs/operators';
import { ProjectService } from 'src/app/modules/admin/services/project.service';
import { DialogConfirmationComponent } from '../../components/dialog-confirmation/dialog-confirmation.component';
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
    public dialog: MatDialog,
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
  openDialog(id: string): void {
    const dialogRef = this.dialog.open(DialogConfirmationComponent, {
      data: {
        title: 'Delete Project?',
        message: 'Include all tasks under this project',
        data: {
          id
        }
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result && result.id) {
        this.removeProject(result.id);
      }
    })
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
