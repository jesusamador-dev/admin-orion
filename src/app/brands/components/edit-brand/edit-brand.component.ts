import { Component, OnInit, ChangeDetectorRef, Inject } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { BrandService } from 'src/app/core/services/brand/brand.service';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-edit-brand',
  templateUrl: './edit-brand.component.html',
  styleUrls: ['./edit-brand.component.css']
})
export class EditBrandComponent implements OnInit {

  brandForm: FormGroup;
  creating = false;
  errors: any;

  constructor(
    private brandService: BrandService,
    private snackBar: MatSnackBar,
    private fb: FormBuilder,
    private changeDetectorRef: ChangeDetectorRef,
    private modalBrand: MatBottomSheetRef<EditBrandComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any
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
      name: new FormControl(this.data.name, [Validators.required, Validators.minLength(2), Validators.maxLength(20)]),
      status: new FormControl(this.data.status, [Validators.required]),
      id: new FormControl(this.data.id)
    });
  }

  updateBrand() {
    this.creating = true;
    if (this.brandForm.valid) {
      this.brandService.update(this.brandForm.value).subscribe(
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
