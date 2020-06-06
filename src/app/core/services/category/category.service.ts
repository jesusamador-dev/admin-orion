import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { tap } from 'rxjs/operators';
import { Category } from '../../models/category/category.model';

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

  private checkAuthorization() {

  }
}
