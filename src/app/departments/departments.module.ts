import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DepartmentsRoutingModule } from './departments-routing.module';
import { DepartmentsListComponent } from './components/departments-list/departments-list.component';
import { MaterialModule } from '../material/material.module';
import { CreateDepartmentComponent } from './components/create-department/create-department.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [DepartmentsListComponent, CreateDepartmentComponent],
  imports: [
    CommonModule,
    DepartmentsRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class DepartmentsModule { }
