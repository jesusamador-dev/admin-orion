import { Component, OnInit, ChangeDetectorRef, Inject } from '@angular/core';
import { CategoryService } from '../../../core/services/category/category.service';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { DeleteDepartmentComponent } from 'src/app/departments/components/delete-department/delete-department.component';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delete-category',
  templateUrl: './delete-category.component.html',
  styleUrls: ['./delete-category.component.css']
})
export class DeleteCategoryComponent implements OnInit {

  deleting = false;
  errors: any;

  constructor(
    private categoryService: CategoryService,
    private snackBar: MatSnackBar,
    private modalDeleteDepartment: MatBottomSheetRef<DeleteDepartmentComponent>,
    private changeDetectorRef: ChangeDetectorRef,
    private authService: AuthService,
    private router: Router,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any) { }

  ngOnInit(): void {
  }

  close(): void {
    this.modalDeleteDepartment.dismiss();
  }

  delete(id: number) {
    this.deleting = true;
    this.categoryService.delete(id).subscribe(
      (result) => {
        console.log(result);
        if (result.success) {
          this.showResponse(result.message);
          this.categoryService.next({});
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
