import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { EditProductComponent } from '../edit-product/edit-product.component';
import { DeleteProductComponent } from '../delete-product/delete-product.component';
import { ProductData } from '../../../core/models/product-data/product-data.model';
import { CreateProductComponent } from '../create-product/create-product.component';
import { MatTableDataSource } from '@angular/material/table';
import { Subject } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { CategoryService } from 'src/app/core/services/category/category.service';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { takeUntil } from 'rxjs/operators';
import { ProductService } from '../../../core/services/product/product.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit, OnDestroy {


  displayedColumns: string[] = [
    'name', 'department', 'brand', 'category',
    'unit_price', 'purchase_price', 'quantity',
    'status', 'actions'
  ];

  dataSource: MatTableDataSource<ProductData>;

  private products$ = new Subject<{}>();

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private productService: ProductService,
    private modalProduct: MatBottomSheet) { }

  ngOnInit(): void {
    this.productService.productObservable.pipe(
      takeUntil(this.products$)
    ).subscribe(res => {
      if (res) {
        this.loadProducts();
      }
    });
  }

  ngOnDestroy(): void {
    this.products$.next();
    this.products$.complete();
  }

  loadProducts() {
    this.productService.getAll().subscribe(
      (result) => {
        if (result.success) {
          console.log(result);
          this.dataSource = new MatTableDataSource(result.products);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
      }
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  createProduct(): void {
    this.modalProduct.open(CreateProductComponent);
  }

  deleteProduct(id: number, name: string) {
    this.modalProduct.open(DeleteProductComponent, {
      data: {
        id,
        name
      }
    });
  }

  editProduct(data: ProductData) {
    this.modalProduct.open(EditProductComponent, {
      data
    });
  }
}
