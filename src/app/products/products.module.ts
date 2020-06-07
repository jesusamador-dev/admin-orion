import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { ProductsListComponent } from './components/products-list/products-list.component';
import { CreateProductComponent } from './components/create-product/create-product.component';
import { DeleteProductComponent } from './components/delete-product/delete-product.component';
import { EditProductComponent } from './components/edit-product/edit-product.component';


@NgModule({
  declarations: [ProductsListComponent, CreateProductComponent, DeleteProductComponent, EditProductComponent],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    NgxSkeletonLoaderModule
  ]
})
export class ProductsModule { }
