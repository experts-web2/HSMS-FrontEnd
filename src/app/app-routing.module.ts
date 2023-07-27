import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth-guard/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  {
    path: 'register',
    loadChildren: () =>
      import('./modules/registration/registration.module').then(
        (m) => m.RegistrationModule
      ),
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./modules/dashboard/dashboard.module').then(
        (m) => m.DashboardModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'sign-up',
    loadChildren: () =>
      import('./modules/auth/sign-up/sign-up.module').then(
        (m) => m.SignUpModule
      ),
  },
  {
    path: 'sign-in',
    loadChildren: () =>
      import('./modules/auth/sign-in/sign-in.module').then(
        (m) => m.SignInModule
      ),
  },
  {
    path: 'forms',
    loadChildren: () =>
      import('./modules/forms/form.module').then((m) => m.FormModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'patient',
    loadChildren: () =>
      import('./modules/patient/patient.module').then((m) => m.PatientModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'doctor',
    loadChildren: () =>
      import('./modules/doctor/doctor.module').then((m) => m.DoctorModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./modules/admin/admin.module').then((m) => m.AdminModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'laboratory',
    loadChildren: () =>
      import('./modules/laboratory/laboratory.module').then(
        (m) => m.LaboratoryModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'pharmacy',
    loadChildren: () =>
      import('./modules/pharmacy/pharmacy.module').then(
        (m) => m.PharmacyModule
      ),
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      initialNavigation: 'enabledBlocking',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
