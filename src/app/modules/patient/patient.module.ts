import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PatientRoutingModule } from './patient-routing.module';
import { PatientAppointmentComponent } from './patient-appointment/patient-appointment.component';


@NgModule({
  declarations: [
    PatientAppointmentComponent
  ],
  imports: [
    CommonModule,
    PatientRoutingModule
  ]
})
export class PatientModule { }
