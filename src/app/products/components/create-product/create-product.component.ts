import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ProductService } from '../../../core/services/product/product.service';
import { BrandService } from '../../../core/services/brand/brand.service';
import { DepartmentService } from '../../../core/services/department/department.service';
import { CategoryService } from '../../../core/services/category/category.service';
import { FormGroup, FormBuilder, FormControl, Validators, FormArray } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { DepartmentData } from '../../../core/models/deparment-data/department-data.model';
import { BrandData } from '../../../core/models/brand-data/brand-data.model';
import { CategoryData } from '../../../core/models/category-data/category-data.model';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit {

  productForm: FormGroup;
  errors: any;
  creating = false;
  departments: MatTableDataSource<DepartmentData>;
  brands: MatTableDataSource<BrandData>;
  categories: MatTableDataSource<CategoryData>;
  files: File[];
  imageData = new FormData();
  countFiles = 'Seleccione las imágenes';
  images = [];
  productDataForm = new FormData();

  constructor(
    private productService: ProductService,
    private brandService: BrandService,
    private departmentService: DepartmentService,
    private categoryService: CategoryService,
    private snackBar: MatSnackBar,
    private fb: FormBuilder,
    private changeDetectorRef: ChangeDetectorRef,
    private modalProduct: MatBottomSheetRef<CreateProductComponent>
  ) {
    this.productForm = this.createProductForm();
  }

  ngOnInit(): void {
    this.loadDepartments();
    this.loadBrands();
  }

  close() {
    this.modalProduct.dismiss();
  }

  createProductForm() {
    return this.fb.group({
      name: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(70)]),
      department: new FormControl('', [Validators.required]),
      brand: new FormControl('', [Validators.required]),
      category: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(255)]),
      purchase_price: new FormControl('', [
        Validators.required, Validators.min(0), Validators.max(9999999), Validators.pattern(/^\d*(.\d{0,2})$/)
      ]),
      unit_price: new FormControl('', [
        Validators.required, Validators.min(0), Validators.max(9999999), Validators.pattern(/^\d*(.\d{0,2})$/)
      ]),
      quantity_small_size: new FormControl('', [
        Validators.required, Validators.min(0), Validators.max(9999999), Validators.pattern(/^\d+$/)
      ]),
      quantity_medium_size: new FormControl('', [
        Validators.required, Validators.min(0), Validators.max(9999999), Validators.pattern(/^\d+$/)
      ]),
      quantity_big_size: new FormControl('', [
        Validators.required, Validators.min(0), Validators.max(9999999), Validators.pattern(/^\d+$/)
      ]),
      images: this.fb.array([])
    });
  }

  loadDepartments() {
    this.departmentService.getAllByStatus('activo').subscribe(
      result => {
        if (result.success === true) {
          this.departments = new MatTableDataSource(result.departments);
        }
        this.changeDetectorRef.detectChanges();
      },
      error => {
        console.log(error);
      }
    );
  }

  loadBrands() {
    this.brandService.getAllByStatus('activo').subscribe(
      result => {
        if (result.success === true) {
          this.brands = new MatTableDataSource(result.brands);
        }
        this.changeDetectorRef.detectChanges();
      },
      error => {
        console.log(error);
      }
    );
  }

  loadCategories(id: number) {
    this.categoryService.getAllByDepartment(id, 'activo').subscribe(
      result => {
        if (result.success === true) {
          this.categories = new MatTableDataSource(result.categories);
        }
        console.log(this.categories);
        this.changeDetectorRef.detectChanges();
      },
      error => {
        console.log(error);
      }
    );
  }

  createProduct() {
    this.creating = true;
    if (this.productForm.valid) {
      console.log(this.productForm.value);
      this.productAppendForm();
      this.productService.create(this.productDataForm).subscribe(
        result => {
          console.log(result);
          this.creating = false;
          this.showResponse(result.message);
          this.productDataForm.delete('files[]');
          this.productService.next({});
          this.productForm.reset();
          this.close();
        },
        error => {
          this.creating = false;
          console.log(error);
          if (error.error.success === false) {
            this.errors = error.error.errors;
            console.log(this.errors);
          }
          this.changeDetectorRef.detectChanges();
        },
        () => {
          this.creating = false;
          this.changeDetectorRef.detectChanges();
        }
      );
    } else {
      this.creating = false;
      this.productForm.markAllAsTouched();
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

  private productAppendForm() {
    this.productDataForm.append('name', this.productForm.value.name);
    this.productDataForm.append('department', this.productForm.value.department);
    this.productDataForm.append('brand', this.productForm.value.brand);
    this.productDataForm.append('category', this.productForm.value.category);
    this.productDataForm.append('description', this.productForm.value.description);
    this.productDataForm.append('purchase_price', this.productForm.value.purchase_price);
    this.productDataForm.append('unit_price', this.productForm.value.unit_price);
    this.productDataForm.append('quantity_small_size', this.productForm.value.quantity_small_size);
    this.productDataForm.append('quantity_medium_size', this.productForm.value.quantity_medium_size);
    this.productDataForm.append('quantity_big_size', this.productForm.value.quantity_big_size);
  }

  fieldInvalid(field: string) {
    if (this.productForm.controls[field].invalid &&
      (this.productForm.controls[field].dirty ||
        this.productForm.controls[field].touched)
    ) {
      return true;
    }
    return false;
  }

  filterDepartments(event: { target: HTMLInputElement; }) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.departments.filter = filterValue.trim().toLowerCase();
    this.changeDetectorRef.detectChanges();
  }

  filterBrands(event: { target: HTMLInputElement; }) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.brands.filter = filterValue.trim().toLowerCase();
    this.changeDetectorRef.detectChanges();
  }

  filterCategories(event: { target: HTMLInputElement; }) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.categories.filter = filterValue.trim().toLowerCase();
    this.changeDetectorRef.detectChanges();
  }

  createItem(data): FormGroup {
    return this.fb.group(data);
  }

  onSelect(event) {
    this.files = event.target.files;
    for (const file of this.files) {
      this.productDataForm.append('files[]', file, file.name);
    }
    this.countFiles = `${this.files.length} archivos seleccionado(s)`;
  }
}
