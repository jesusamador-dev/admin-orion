import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { DepartmentData } from 'src/app/core/models/deparment-data/department-data.model';
import { Subject } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { takeUntil } from 'rxjs/operators';
import { CategoryService } from 'src/app/core/services/category/category.service';
import { CreateCategoryComponent } from '../create-category/create-category.component';
import { DeleteCategoryComponent } from '../delete-category/delete-category.component';
import { EditCategoryComponent } from '../edit-category/edit-category.component';

@Component({
  selector: 'app-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.css']
})
export class CategoriesListComponent implements OnInit, OnDestroy {

  displayedColumns: string[] = ['name', 'department', 'status', 'create_at', 'update_at', 'actions'];
  dataSource: MatTableDataSource<DepartmentData>;

  private department$ = new Subject<{}>();

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private categoryService: CategoryService,
    private modalDepartment: MatBottomSheet) { }

  ngOnInit(): void {
    this.categoryService.categoryObservable.pipe(
      takeUntil(this.department$)
    ).subscribe(res => {
      if (res) {
        this.loadCategories();
      }
    });
  }

  ngOnDestroy(): void {
    this.department$.next();
    this.department$.complete();
  }

  loadCategories() {
    this.categoryService.getAll().subscribe(
      (result) => {
        if (result.success) {
          console.log(result);
          this.dataSource = new MatTableDataSource(result.categories);
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

  createCategory(): void {
    this.modalDepartment.open(CreateCategoryComponent);
  }

  deleteCategory(id: number, name: string) {
    this.modalDepartment.open(DeleteCategoryComponent, {
      data: {
        id,
        name
      }
    });
  }

  editCategory(id: number, name: string, status: string, department: number) {
    this.modalDepartment.open(EditCategoryComponent, {
      data: {
        id,
        name,
        status,
        department
      }
    });
  }

}
