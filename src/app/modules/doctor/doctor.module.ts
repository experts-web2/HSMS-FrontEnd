import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DoctorRoutingModule } from './doctor-routing.module';
import { DoctorRootComponent } from './doctor-root/doctor-root.component';
import { AppointmentComponent } from './appointment/appointment.component';
import { SharedModule } from 'src/app/shared-module/shared-module';


@NgModule({
  declarations: [
    DoctorRootComponent,
    AppointmentComponent
  ],
  imports: [
    CommonModule,
    DoctorRoutingModule,
    SharedModule
  ]
})
export class DoctorModule { }
