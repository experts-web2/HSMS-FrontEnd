import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DoctorRoutingModule } from './doctor-routing.module';
import { DoctorRootComponent } from './doctor-root/doctor-root.component';
import { AppointmentComponent } from './appointment/appointment.component';
import { SharedModule } from 'src/app/shared-module/shared-module';
import { ToastModule } from 'primeng/toast';
import { MessagesModule } from 'primeng/messages';
import { ButtonModule } from 'primeng/button';
import { AddPrescriptionDialogueComponent } from 'src/app/Shared/components/add-prescription-dialogue/add-prescription-dialogue.component';
import { DoctorDashboardComponent } from './doctor-dashboard/doctor-dashboard.component';
import { PrimeNgModule } from 'src/app/Shared/modules/prime-ng/prime-ng.module';
import { PrescriptionComponent } from './appointment-sub-components/prescription/prescription.component';
import { VitalsComponent } from './appointment-sub-components/vitals/vitals.component';
import { MedicationComponent } from './appointment-sub-components/medication/medication.component';
import { LabOrderComponent } from './appointment-sub-components/lab-order/lab-order.component';
import { RadiologyOrderComponent } from './appointment-sub-components/radiology-order/radiology-order.component';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';


@NgModule({
  declarations: [
    DoctorRootComponent,
    AppointmentComponent,
    DoctorDashboardComponent,
    PrescriptionComponent,
    VitalsComponent,
    MedicationComponent,
    LabOrderComponent,
    RadiologyOrderComponent,    
  ],
  imports: [
    CommonModule,
    DoctorRoutingModule,
    SharedModule,
    ToastModule,
    MessagesModule,
    ButtonModule,
    AddPrescriptionDialogueComponent,
    PrimeNgModule,
  ],
  providers:[DialogService,
    DynamicDialogRef,]
})
export class DoctorModule { }
