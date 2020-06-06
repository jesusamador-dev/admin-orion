import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BrandsRoutingModule } from './brands-routing.module';
import { BrandsListComponent } from './components/brands-list/brands-list.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { CreateBrandComponent } from './components/create-brand/create-brand.component';
import { MaterialModule } from '../material/material.module';
import { EditBrandComponent } from './components/edit-brand/edit-brand.component';
import { DeleteBrandComponent } from './components/delete-brand/delete-brand.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [BrandsListComponent, CreateBrandComponent, EditBrandComponent, DeleteBrandComponent],
  imports: [
    CommonModule,
    BrandsRoutingModule,
    NgxSkeletonLoaderModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class BrandsModule { }
