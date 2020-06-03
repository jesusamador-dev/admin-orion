import { Component, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { CreateDepartmentComponent } from '../create-department/create-department.component';

@Component({
  selector: 'app-departments-list',
  templateUrl: './departments-list.component.html',
  styleUrls: ['./departments-list.component.css']
})
export class DepartmentsListComponent implements OnInit {

  constructor(private modalCreateDepartment: MatBottomSheet) { }

  ngOnInit(): void {
  }

  openFormDepartment(): void {
    this.modalCreateDepartment.open(CreateDepartmentComponent);
  }
}
