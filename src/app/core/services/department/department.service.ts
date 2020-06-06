import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Department } from '../../models/department/department.model';
import { BehaviorSubject } from 'rxjs';

const apiUrl = environment.api;

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
  departmentObservable = new BehaviorSubject({});
  constructor(private http: HttpClient) { }

  next(data: {}) {
    this.departmentObservable.next(data);
  }

  getAll(status = 'activo') {
    return this.http.get<Department>(`${apiUrl}departments/get`)
      .pipe(
        tap((res) => this.checkAuthorization)
      );
  }


  create(data: any) {
    return this.http.post<Department>(`${apiUrl}departments/create`, data)
      .pipe(
        tap((res) => this.checkAuthorization)
      );
  }

  delete(id: number) {
    return this.http.delete<Department>(`${apiUrl}departments/destroy/${id}`, {})
      .pipe(
        tap((res) => this.checkAuthorization)
      );
  }

  edit(data: any) {
    return this.http.put<Department>(`${apiUrl}departments/update/${data.id}`, data)
      .pipe(
        tap((res) => this.checkAuthorization)
      );
  }

  private checkAuthorization(request) {
    console.log(request);
  }
}
