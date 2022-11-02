import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {path:'' ,component:HomeComponent},
  {path:'home' ,component:HomeComponent},
  {path:'register',loadChildren:()=> import('./registration/registration.module').then((m)=>m.RegistrationModule)},
  { path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule) },
  { path: 'sign-up', loadChildren: () => import('./auth/sign-up/sign-up.module').then(m => m.SignUpModule) },
  { path: 'sign-in', loadChildren: () => import('./auth/sign-in/sign-in.module').then(m => m.SignInModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
