import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PatientAppointmentComponent } from './patient-appointment/patient-appointment.component';

const routes: Routes = [
  {path: 'patient-appointment', component: PatientAppointmentComponent},
  {path:'**', redirectTo: 'patient-appointment', pathMatch:"full"}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PatientRoutingModule { }
