import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriesRoutingModule } from './categories-routing.module';
import { CategoriesListComponent } from './components/categories-list/categories-list.component';
import { EditCategoryComponent } from './components/edit-category/edit-category.component';
import { DeleteCategoryComponent } from './components/delete-category/delete-category.component';
import { CreateCategoryComponent } from './components/create-category/create-category.component';
import { MaterialModule } from '../material/material.module';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [CategoriesListComponent, EditCategoryComponent, DeleteCategoryComponent, CreateCategoryComponent],
  imports: [
    CommonModule,
    CategoriesRoutingModule,
    MaterialModule,
    NgxSkeletonLoaderModule,
    ReactiveFormsModule
  ]
})
export class CategoriesModule { }
