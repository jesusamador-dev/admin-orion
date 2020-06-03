import { Component, OnInit } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { DepartmentService } from '../../../core/services/department/department.service';

@Component({
  selector: 'app-create-department',
  templateUrl: './create-department.component.html',
  styleUrls: ['./create-department.component.css']
})
export class CreateDepartmentComponent implements OnInit {

  departmentForm: FormGroup;
  creating = false;

  constructor(
    private departmentService: DepartmentService,
    private fb: FormBuilder,
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
          console.log(result);
          this.creating = false;

        },
        (error) => {
          console.log(error.error.message);
          this.creating = false;
          console.log(this.creating);
        },
      );
    } else {
      this.departmentForm.controls.name.markAsTouched();
    }
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
