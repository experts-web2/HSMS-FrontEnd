import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './modules/home/home.component';

const routes: Routes = [
  {path:'' , redirectTo: "/home", pathMatch: "full"},
  {path:'home', component:HomeComponent},
  {path:'register', loadChildren: () => import('./modules/registration/registration.module').then((m) => m.RegistrationModule)},
  {path: 'dashboard', loadChildren: () => import('./modules/dashboard/dashboard.module').then(m => m.DashboardModule)},
  {path: 'sign-up', loadChildren: () => import('./modules/auth/sign-up/sign-up.module').then(m => m.SignUpModule)},
  {path: 'sign-in', loadChildren: () => import('./modules/auth/sign-in/sign-in.module').then(m => m.SignInModule)},
  {path:'forms', loadChildren: () => import('./modules/forms/form.module').then((m) => m.FormModule)},
  {path:'patient', loadChildren: () => import('./modules/patient/patient.module').then((m) => m.PatientModule)},
  {path:'doctor', loadChildren: () => import('./modules/doctor/doctor.module').then((m) => m.DoctorModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabledBlocking'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
