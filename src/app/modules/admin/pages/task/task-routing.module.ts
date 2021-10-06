import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskAddComponent } from './pages/task-add/task-add.component';
import { TaskListComponent } from './pages/task-list/task-list.component';
import { TaskComponent } from './task.component';

const routes: Routes = [
  {
    path: '',
    component: TaskComponent,
    children: [
      { path: '', component: TaskListComponent },
      { path: 'add', component: TaskAddComponent },
      { path: ':id', component: TaskAddComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TaskRoutingModule { }
