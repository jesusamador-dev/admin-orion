import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { CreateDepartmentComponent } from '../create-department/create-department.component';
import { DepartmentService } from '../../../core/services/department/department.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { DepartmentData } from 'src/app/core/models/deparment-data/department-data.model';
import { DeleteDepartmentComponent } from '../delete-department/delete-department.component';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-departments-list',
  templateUrl: './departments-list.component.html',
  styleUrls: ['./departments-list.component.css']
})
export class DepartmentsListComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['name', 'status', 'create_at', 'update_at', 'actions'];
  dataSource: MatTableDataSource<DepartmentData>;

  private department$ = new Subject<{}>();

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private departmentService: DepartmentService,
    private modalDepartment: MatBottomSheet) { }

  ngOnInit(): void {
    this.departmentService.departmentObservable.pipe(
      takeUntil(this.department$)
    ).subscribe(res => {
      if (res) {
        this.loadDepartments();
      }
    });
  }

  ngOnDestroy(): void {
    this.department$.next();
    this.department$.complete();
  }

  loadDepartments() {
    this.departmentService.getAll().subscribe(
      (result) => {
        if (result.success) {
          this.dataSource = new MatTableDataSource(result.departments);
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

  openFormDepartment(): void {
    this.modalDepartment.open(CreateDepartmentComponent);
  }

  deleteDepartment(id: number, name: string) {
    this.modalDepartment.open(DeleteDepartmentComponent, {
      data: {
        id,
        name
      }
    });
  }
}
