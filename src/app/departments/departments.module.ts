import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DepartmentsRoutingModule } from './departments-routing.module';
import { DepartmentsListComponent } from './components/departments-list/departments-list.component';
import { MaterialModule } from '../material/material.module';
import { CreateDepartmentComponent } from './components/create-department/create-department.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DeleteDepartmentComponent } from './components/delete-department/delete-department.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

@NgModule({
  declarations: [
    DepartmentsListComponent,
    CreateDepartmentComponent,
    DeleteDepartmentComponent
  ],
  imports: [
    CommonModule,
    DepartmentsRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    NgxSkeletonLoaderModule
  ],
  entryComponents: [
    CreateDepartmentComponent
  ]
})
export class DepartmentsModule { }
