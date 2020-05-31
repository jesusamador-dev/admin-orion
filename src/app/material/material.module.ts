import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatStepperModule } from '@angular/material/stepper';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CommonModule,
    MatButtonModule,
    MatToolbarModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    MatTableModule,
    MatSidenavModule,
    MatListModule,
    MatMenuModule,
    MatSortModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatStepperModule
  ],
  exports: [
    MatButtonModule,
    MatToolbarModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    MatTableModule,
    MatSidenavModule,
    MatListModule,
    MatMenuModule,
    MatSortModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatStepperModule
  ]
})
export class MaterialModule { }
