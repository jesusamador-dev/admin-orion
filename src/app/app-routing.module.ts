import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { AuthGuard } from './core/guards/auth/auth.guard';


const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    canLoad: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: '/departments',
        pathMatch: 'full'
      },
      {
        path: 'departments',
        loadChildren: () => import('./departments/departments.module').then(m => m.DepartmentsModule)
      },
      {
        path: 'categories',
        loadChildren: () => import('./categories/categories.module').then(m => m.CategoriesModule)
      },
      {
        path: 'brands',
        loadChildren: () => import('./brands/brands.module').then(m => m.BrandsModule)
      }
    ]
  },
  {
    path: 'login',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
