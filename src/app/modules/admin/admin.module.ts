import { NgModule } from '@angular/core';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';

import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatMenuModule } from '@angular/material/menu';
import { ProjectService } from './services/project.service';
import { TaskService } from './services/task.service';

const components = [
  MatSidenavModule,
  MatIconModule,
  MatToolbarModule,
  MatListModule,
  MatMenuModule,
]

@NgModule({
  declarations: [
    AdminComponent,
  ],
  imports: [
    SharedModule,
    AdminRoutingModule,
    ...components,
  ],
  providers: [ProjectService, TaskService]
})
export class AdminModule { }
