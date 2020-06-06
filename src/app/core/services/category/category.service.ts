import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { tap } from 'rxjs/operators';
import { Category } from '../../models/category/category.model';
import { CategoryData } from '../../models/category-data/category-data.model';

const apiUrl = environment.api;

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  categoryObservable = new BehaviorSubject({});
  constructor(private http: HttpClient) { }

  next(data: {}) {
    this.categoryObservable.next(data);
  }

  getAll(status = 'activo') {
    return this.http.get<Category>(`${apiUrl}categories/get`)
      .pipe(
        tap((res) => this.checkAuthorization)
      );
  }

  create(data: CategoryData) {
    return this.http.post<Category>(`${apiUrl}categories/create`, data)
      .pipe(
        tap((res) => this.checkAuthorization)
      );
  }

  delete(id: number) {
    return this.http.delete<Category>(`${apiUrl}categories/destroy/${id}`, {})
      .pipe(
        tap((res) => this.checkAuthorization)
      );
  }

  update(data: CategoryData) {
    return this.http.put<Category>(`${apiUrl}categories/update/${data.id}`, data)
      .pipe(
        tap((res) => this.checkAuthorization)
      );
  }

  private checkAuthorization() {

  }
}
