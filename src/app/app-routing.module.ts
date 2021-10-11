import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/admin', pathMatch: 'full' },
  { 
    path: 'admin', 
    loadChildren: () => import('./modules/admin/admin.module').then(m => m.AdminModule),
    canLoad: [AuthGuard]
   },
  { path: 'auth', loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
