import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// material
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
// lib
import { FlexLayoutModule } from '@angular/flex-layout';

const listModule = [
  CommonModule,
  //
  FlexLayoutModule,
  MatCardModule,
  MatButtonModule,
  MatInputModule,
];

@NgModule({
  declarations: [],
  imports: [
    ...listModule,
  ],
  exports: [
    ...listModule,
  ]
})
export class SharedModule { }
