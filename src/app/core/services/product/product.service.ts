import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../../models/product/product.model';
import { tap } from 'rxjs/operators';
import { ProductData } from '../../models/product-data/product-data.model';

const apiUrl = environment.api;

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  productObservable = new BehaviorSubject({});

  constructor(private http: HttpClient) { }

  next(data: {}) {
    this.productObservable.next(data);
  }

  getAll() {
    return this.http.get<Product>(`${apiUrl}products/get`)
      .pipe(
        tap((res) => this.checkAuthorization)
      );
  }

  create(data: ProductData) {
    return this.http.post<Product>(`${apiUrl}products/create`, data)
      .pipe(
        tap((res) => this.checkAuthorization)
      );
  }

  delete(id: number) {
    return this.http.delete<Product>(`${apiUrl}products/destroy/${id}`)
      .pipe(
        tap((res) => this.checkAuthorization)
      );
  }

  update(data: ProductData) {
    return this.http.put<Product>(`${apiUrl}products/update/${data.id}`, data)
      .pipe(
        tap((res) => this.checkAuthorization)
      );
  }

  private checkAuthorization() { }
}
