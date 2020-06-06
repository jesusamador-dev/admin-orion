import { Component, OnInit, ChangeDetectorRef, Inject } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { DepartmentData } from 'src/app/core/models/deparment-data/department-data.model';
import { CategoryService } from 'src/app/core/services/category/category.service';
import { DepartmentService } from 'src/app/core/services/department/department.service';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { CreateCategoryComponent } from '../create-category/create-category.component';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent implements OnInit {

  categoryForm: FormGroup;
  creating = false;
  errors: any;
  departments: MatTableDataSource<DepartmentData>;

  constructor(
    private categoryService: CategoryService,
    private departmentService: DepartmentService,
    private snackBar: MatSnackBar,
    private fb: FormBuilder,
    private changeDetectorRef: ChangeDetectorRef,
    private modalCreateCategory: MatBottomSheetRef<CreateCategoryComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any
  ) {
    this.categoryForm = this.createCategoryForm();
  }

  ngOnInit(): void {
    this.loadDepartments();
  }

  close(): void {
    this.modalCreateCategory.dismiss();
  }

  createCategoryForm() {
    return this.fb.group({
      name: new FormControl(this.data.name, [Validators.required, Validators.minLength(2), Validators.maxLength(20)]),
      status: new FormControl(this.data.status, [Validators.required]),
      department: new FormControl(this.data.department, Validators.required),
      id: new FormControl(this.data.id)
    });
  }

  updateCategory() {
    this.creating = true;
    if (this.categoryForm.valid) {
      this.categoryService.update(this.categoryForm.value).subscribe(
        result => {
          console.log(result);
          if (result.success) {
            this.showResponse(result.message);
            this.categoryService.next({});
            this.categoryForm.reset();
            this.close();
          }
        },
        error => {
          console.log(error);
          this.creating = false;
          if (error.error.success === false) {
            this.errors = error.error.errors;
            console.log(this.errors);
          }
          this.changeDetectorRef.detectChanges();
        }
      );
    } else {
      this.creating = false;
      this.categoryForm.markAllAsTouched();
      this.changeDetectorRef.detectChanges();
    }
  }

  showResponse(message: string) {
    const config = new MatSnackBarConfig();
    config.panelClass = ['bg-green-400', 'text-white'];
    config.verticalPosition = 'top';
    config.horizontalPosition = 'center';
    config.duration = 2500;
    this.snackBar.open(message, 'Ok', config);
  }


  loadDepartments() {
    this.departmentService.getAll().subscribe(
      result => {
        if (result.success === true) {
          this.departments = new MatTableDataSource(result.departments);
        }
        console.log(this.departments);
        this.changeDetectorRef.detectChanges();
      },
      error => {
        console.log(error);
      }
    );
  }

  nameInvalid() {
    if (this.categoryForm.controls.name.invalid &&
      (this.categoryForm.controls.name.dirty ||
        this.categoryForm.controls.name.touched)
    ) {
      return true;
    }
    return false;
  }


  filter(event: { target: HTMLInputElement; }) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.departments.filter = filterValue.trim().toLowerCase();
    this.changeDetectorRef.detectChanges();
  }

}
