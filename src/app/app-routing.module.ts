import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth-guard/auth.guard';
import { AuthRoles } from './constants/enums/Roles-Enum';

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
    data: { roles: [AuthRoles.Admin, AuthRoles.Doctor,] },
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
    data: { roles: [AuthRoles.Admin, AuthRoles.Doctor,] },
    canActivate: [AuthGuard],
  },
  {
    path: 'doctor',
    loadChildren: () =>
      import('./modules/doctor/doctor.module').then((m) => m.DoctorModule),
    data: { roles: [AuthRoles.Admin, AuthRoles.Doctor,] },
    canActivate: [AuthGuard],
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./modules/admin/admin.module').then((m) => m.AdminModule),
    data: { roles: [AuthRoles.Admin] },
    canActivate: [AuthGuard],
  },
  {
    path: 'laboratory',
    loadChildren: () =>
      import('./modules/laboratory/laboratory.module').then(
        (m) => m.LaboratoryModule
      ),
    data: { roles: [AuthRoles.Admin, AuthRoles.LabTechnician] },
    canActivate: [AuthGuard],
  },
  {
    path: 'pharmacy',
    loadChildren: () =>
      import('./modules/pharmacy/pharmacy.module').then(
        (m) => m.PharmacyModule
      ),
    data: { roles: [AuthRoles.Admin] },
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
export class AppRoutingModule { }
