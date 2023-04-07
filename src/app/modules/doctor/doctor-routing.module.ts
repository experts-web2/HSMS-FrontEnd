import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppointmentComponent } from './appointment/appointment.component';
import { DoctorRootComponent } from './doctor-root/doctor-root.component';

const routes: Routes = [
  {path:'', component: AppointmentComponent},
  {path:'Doctor', component: DoctorRootComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DoctorRoutingModule { }
