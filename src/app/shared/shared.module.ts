import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { MaterialModule } from '../material/material.module';
@NgModule({
  declarations: [
    HeaderComponent,
    SidebarComponent
  ],
  exports: [
    HeaderComponent,
    SidebarComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule
  ]
})
export class SharedModule { }
