import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Department } from '../../models/department/department.model';
import { DepartmentData } from '../../models/deparment-data/department-data.model';

const apiUrl = environment.api;

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  constructor(private http: HttpClient) { }


  getAll() {
    return this.http.post<Department>(`${apiUrl}departments/get`, {})
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

  private checkAuthorization(request) {
    console.log(request);
  }
}
