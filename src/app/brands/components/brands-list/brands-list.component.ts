import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { BrandService } from '../../../core/services/brand/brand.service';
import { MatTableDataSource } from '@angular/material/table';
import { Subject } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { takeUntil } from 'rxjs/operators';
import { BrandData } from 'src/app/core/models/brand-data/brand-data.model';
import { CreateBrandComponent } from '../create-brand/create-brand.component';
import { DeleteBrandComponent } from '../delete-brand/delete-brand.component';
import { EditBrandComponent } from '../edit-brand/edit-brand.component';

@Component({
  selector: 'app-brands-list',
  templateUrl: './brands-list.component.html',
  styleUrls: ['./brands-list.component.css']
})
export class BrandsListComponent implements OnInit, OnDestroy {

  displayedColumns: string[] = ['name', 'status', 'create_at', 'update_at', 'actions'];
  dataSource: MatTableDataSource<BrandData>;

  private brand$ = new Subject<{}>();

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private brandService: BrandService,
    private modalBrand: MatBottomSheet) { }

  ngOnInit(): void {
    this.brandService.brandObservable.pipe(
      takeUntil(this.brand$)
    ).subscribe(res => {
      if (res) {
        this.loadBrands();
      }
    });
  }

  ngOnDestroy(): void {
    this.brand$.next();
    this.brand$.complete();
  }

  loadBrands() {
    this.brandService.getAll().subscribe(
      (result) => {
        if (result.success) {
          console.log(result);
          this.dataSource = new MatTableDataSource(result.brands);
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

  createBrand(): void {
    this.modalBrand.open(CreateBrandComponent);
  }

  deleteBrand(id: number, name: string) {
    this.modalBrand.open(DeleteBrandComponent, {
      data: {
        id,
        name
      }
    });
  }

  editBrand(id: number, name: string, status: string) {
    this.modalBrand.open(EditBrandComponent, {
      data: {
        id,
        name,
        status
      }
    });
  }

}
