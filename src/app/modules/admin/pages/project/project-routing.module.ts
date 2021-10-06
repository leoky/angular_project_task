import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectAddComponent } from './pages/project-add/project-add.component';
import { ProjectListComponent } from './pages/project-list/project-list.component';
import { ProjectComponent } from './project.component';

const routes: Routes = [
  {
    path: '',
    component: ProjectComponent,
    children: [
      { path: '', component: ProjectListComponent },
      { path: 'add', component: ProjectAddComponent },
      { path: ':id', component: ProjectAddComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectRoutingModule { }
