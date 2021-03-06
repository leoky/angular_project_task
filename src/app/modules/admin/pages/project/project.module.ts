import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';

import { ProjectRoutingModule } from './project-routing.module';
import { ProjectComponent } from './project.component';
import { ProjectAddComponent } from './pages/project-add/project-add.component';
import { ProjectListComponent } from './pages/project-list/project-list.component';
import { ProjectListItemComponent } from './components/project-list-item/project-list-item.component';
import { DialogConfirmationComponent } from './components/dialog-confirmation/dialog-confirmation.component';

import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    ProjectComponent,
    ProjectAddComponent,
    ProjectListComponent,
    ProjectListItemComponent,
    DialogConfirmationComponent,
  ],
  imports: [
    CommonModule,
    ProjectRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    MatTableModule,
    MatIconModule,
    MatSelectModule,
    MatDialogModule,
  ]
})
export class ProjectModule { }
