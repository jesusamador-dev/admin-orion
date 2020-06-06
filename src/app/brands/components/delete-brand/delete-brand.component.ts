import { Component, OnInit, ChangeDetectorRef, Inject } from '@angular/core';
import { BrandService } from 'src/app/core/services/brand/brand.service';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delete-brand',
  templateUrl: './delete-brand.component.html',
  styleUrls: ['./delete-brand.component.css']
})
export class DeleteBrandComponent implements OnInit {
  deleting = false;
  errors: any;

  constructor(
    private brandService: BrandService,
    private snackBar: MatSnackBar,
    private modalBrand: MatBottomSheetRef<DeleteBrandComponent>,
    private changeDetectorRef: ChangeDetectorRef,
    private authService: AuthService,
    private router: Router,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any) { }

  ngOnInit(): void {
  }

  close(): void {
    this.modalBrand.dismiss();
  }

  delete(id: number) {
    this.deleting = true;
    this.brandService.delete(id).subscribe(
      (result) => {
        console.log(result);
        if (result.success) {
          this.showResponse(result.message);
          this.brandService.next({});
          this.close();
        }
      },
      (error) => {
        console.log(error);
        error = error.error;
        if (error.error_code === 410) {
          this.errors = error.message;
          this.deleting = false;
          this.changeDetectorRef.detectChanges();
        }
        if (error.error_code === 411 || error.error_code === 412) {
          this.authService.logOut();
          this.router.navigateByUrl('/login');
        }
      }
    );
  }

  showResponse(message: string) {
    const config = new MatSnackBarConfig();
    config.panelClass = ['bg-green-400', 'text-white'];
    config.verticalPosition = 'top';
    config.horizontalPosition = 'center';
    config.duration = 2500;
    this.snackBar.open(message, 'Ok', config);
  }

  refreshToken() {
    this.authService.refreshToken().subscribe(
      (result) => {
        if (result.success === true) {
          this.errors = false;
        }
        this.changeDetectorRef.detectChanges();
      },
      (error) => {
        console.log(error);
      }
    );
  }

}
