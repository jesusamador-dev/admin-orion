import { Component, OnInit, ChangeDetectorRef, Inject } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { DepartmentService } from 'src/app/core/services/department/department.service';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { CreateDepartmentComponent } from '../create-department/create-department.component';

@Component({
  selector: 'app-edit-department',
  templateUrl: './edit-department.component.html',
  styleUrls: ['./edit-department.component.css']
})
export class EditDepartmentComponent implements OnInit {
  departmentForm: FormGroup;
  creating = false;
  errors: any;
  constructor(
    private departmentService: DepartmentService,
    private snackBar: MatSnackBar,
    private fb: FormBuilder,
    private changeDetectorRef: ChangeDetectorRef,
    private modalCreateDepartment: MatBottomSheetRef<CreateDepartmentComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any) {
    this.departmentForm = this.createDepartmentForm();
  }

  ngOnInit(): void {
  }

  createDepartmentForm() {
    return this.fb.group({
      name: new FormControl(this.data.name, [Validators.required, Validators.minLength(2), Validators.maxLength(30)]),
      status: new FormControl(this.data.status, [Validators.required]),
      id: new FormControl(this.data.id)
    });
  }

  close(): void {
    this.modalCreateDepartment.dismiss();
  }

  editDepartment(): void {
    if (this.departmentForm.valid) {
      this.creating = true;
      this.departmentService.edit(this.departmentForm.value).subscribe(
        (result) => {
          this.creating = false;
          if (result.success === true) {
            this.showResponse(result.message);
            this.departmentService.next({});
            this.departmentForm.reset();
            this.close();
          }
          this.changeDetectorRef.detectChanges();
        },
        (error) => {
          console.log(error);
          this.creating = false;
          if (error.error.success === false) {
            this.errors = error.error.errors;
            console.log(this.errors);
          }
          this.changeDetectorRef.detectChanges();
        },
      );
    } else {
      this.departmentForm.controls.name.markAsTouched();
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

  nameInvalid() {
    if (this.departmentForm.controls.name.invalid &&
      (this.departmentForm.controls.name.dirty ||
        this.departmentForm.controls.name.touched)
    ) {
      return true;
    }
    return false;
  }

}
