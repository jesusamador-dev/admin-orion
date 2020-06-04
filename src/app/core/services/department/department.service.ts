import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Department } from '../../models/department/department.model';
import { DepartmentData } from '../../models/deparment-data/department-data.model';
import { BehaviorSubject } from 'rxjs';

const apiUrl = environment.api;

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  departmentObservable = new BehaviorSubject({});
  // public observable = this.departmentObservable.asObservable();
  constructor(private http: HttpClient) { }

  next(data: {}) {
    this.departmentObservable.next(data);
  }

  getAll(status = 'activo') {
    return this.http.get<Department>(`${apiUrl}departments/get/${status}`)
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
    return this.http.post<Department>(`${apiUrl}departments/destroy/${id}`, {})
      .pipe(
        tap((res) => this.checkAuthorization)
      );
  }

  private checkAuthorization(request) {
    console.log(request);
  }
}
