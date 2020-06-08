import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CategoryService } from '../../../core/services/category/category.service';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { DepartmentData } from '../../../core/models/deparment-data/department-data.model';
import { DepartmentService } from '../../../core/services/department/department.service';
import { MatTableDataSource } from '@angular/material/table';
import { CreateProductComponent } from 'src/app/products/components/create-product/create-product.component';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.css']
})
export class CreateCategoryComponent implements OnInit {

  categoryForm: FormGroup;
  creating = false;
  errors: any;
  departments: MatTableDataSource<DepartmentData>;

  constructor(
    private departmentService: DepartmentService,
    private categoryService: CategoryService,
    private snackBar: MatSnackBar,
    private fb: FormBuilder,
    private changeDetectorRef: ChangeDetectorRef,
    private modalProduct: MatBottomSheetRef<CreateProductComponent>
  ) {
    this.categoryForm = this.createCategoryForm();
  }

  ngOnInit(): void {
    this.loadDepartments();
  }

  close(): void {
    this.modalProduct.dismiss();
  }

  createCategoryForm() {
    return this.fb.group({
      name: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]),
      status: new FormControl(1, [Validators.required]),
      department: new FormControl('', Validators.required),
      brand: new FormControl('', Validators.required),
      category: new FormControl('', Validators.required),
    });
  }

  createCategory() {
    this.creating = true;
    if (this.categoryForm.valid) {
      console.log(this.categoryForm);
      this.categoryService.create(this.categoryForm.value).subscribe(
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
