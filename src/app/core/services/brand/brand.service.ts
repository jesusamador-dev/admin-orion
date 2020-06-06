import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { BrandData } from '../../models/brand-data/brand-data.model';
import { tap } from 'rxjs/operators';
import { Brand } from '../../models/brand/brand.model';
import { BehaviorSubject } from 'rxjs';

const apiUrl = environment.api;

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  brandObservable = new BehaviorSubject({});

  constructor(private http: HttpClient) { }

  next(data: {}) {
    this.brandObservable.next(data);
  }

  getAll() {
    return this.http.get<Brand>(`${apiUrl}brands/get`).pipe(
      tap(res => this.checkAuthorization())
    );
  }

  create(data: BrandData) {
    return this.http.post<Brand>(`${apiUrl}brands/create`, data).pipe(
      tap(res => this.checkAuthorization())
    );
  }

  delete(id: number) {
    return this.http.delete<Brand>(`${apiUrl}brands/destroy/${id}`).pipe(
      tap(res => this.checkAuthorization())
    );
  }

  update(data: BrandData) {
    return this.http.put<Brand>(`${apiUrl}brands/update/${data.id}`, data).pipe(
      tap(res => this.checkAuthorization())
    );
  }

  checkAuthorization() {
  }
}
