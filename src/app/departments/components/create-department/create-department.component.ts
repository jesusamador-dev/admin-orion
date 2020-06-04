import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { DepartmentService } from '../../../core/services/department/department.service';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Component({
  selector: 'app-create-department',
  templateUrl: './create-department.component.html',
  styleUrls: ['./create-department.component.css']
})
export class CreateDepartmentComponent implements OnInit {

  departmentForm: FormGroup;
  creating = false;
  errors: any;
  constructor(
    private departmentService: DepartmentService,
    private snackBar: MatSnackBar,
    private fb: FormBuilder,
    private changeDetectorRef: ChangeDetectorRef,
    private modalCreateDepartment: MatBottomSheetRef<CreateDepartmentComponent>) {
    this.departmentForm = this.createDepartmentForm();
  }

  ngOnInit(): void {
  }



  createDepartmentForm() {
    return this.fb.group({
      name: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(30)]),
      status: new FormControl('1')
    });
  }

  close(): void {
    this.modalCreateDepartment.dismiss();
  }

  createDepartment(): void {
    if (this.departmentForm.valid) {
      this.creating = true;
      this.departmentService.create(this.departmentForm.value).subscribe(
        (result) => {
          this.creating = false;
          console.log(result);
          if (result.success === true) {
            this.showResponse(result.message);
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
