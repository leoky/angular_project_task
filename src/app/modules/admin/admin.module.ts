import { NgModule } from '@angular/core';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';

import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { SharedModule } from 'src/app/shared/shared.module';

const components = [
  MatSidenavModule,
  MatIconModule,
  MatToolbarModule,
  MatListModule,
]

@NgModule({
  declarations: [
    AdminComponent,
  ],
  imports: [
    SharedModule,
    AdminRoutingModule,
    ...components,
  ]
})
export class AdminModule { }
