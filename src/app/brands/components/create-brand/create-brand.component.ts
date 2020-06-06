import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { BrandData } from '../../../core/models/brand-data/brand-data.model';
import { BrandService } from '../../../core/services/brand/brand.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-create-brand',
  templateUrl: './create-brand.component.html',
  styleUrls: ['./create-brand.component.css']
})
export class CreateBrandComponent implements OnInit {

  brandForm: FormGroup;
  creating = false;
  errors: any;

  constructor(
    private brandService: BrandService,
    private snackBar: MatSnackBar,
    private fb: FormBuilder,
    private changeDetectorRef: ChangeDetectorRef,
    private modalBrand: MatBottomSheetRef<CreateBrandComponent>
  ) {
    this.brandForm = this.createBrandForm();
  }

  ngOnInit(): void {
  }

  close(): void {
    this.modalBrand.dismiss();
  }

  createBrandForm() {
    return this.fb.group({
      name: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]),
      status: new FormControl(1, [Validators.required]),
    });
  }

  createBrand() {
    this.creating = true;
    if (this.brandForm.valid) {
      this.brandService.create(this.brandForm.value).subscribe(
        result => {
          console.log(result);
          if (result.success) {
            this.showResponse(result.message);
            this.brandService.next({});
            this.brandForm.reset();
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
      this.brandForm.markAllAsTouched();
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

  nameInvalid() {
    if (this.brandForm.controls.name.invalid &&
      (this.brandForm.controls.name.dirty ||
        this.brandForm.controls.name.touched)
    ) {
      return true;
    }
    return false;
  }
}
