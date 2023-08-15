import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DoctorRoutingModule } from './doctor-routing.module';
import { DoctorRootComponent } from './doctor-root/doctor-root.component';
import { AppointmentComponent } from './appointment/appointment.component';
import { MaterialModule, PrimeNgModule } from 'src/app/shared/modules';
import { ToastModule } from 'primeng/toast';
import { MessagesModule } from 'primeng/messages';
import { ButtonModule } from 'primeng/button';
import { AddPrescriptionDialogueComponent } from 'src/app/shared/components';
import { DoctorDashboardComponent } from './doctor-dashboard/doctor-dashboard.component';
import { PrescriptionComponent } from './appointment-sub-components/prescription/prescription.component';
import { VitalsComponent } from './appointment-sub-components/vitals/vitals.component';
import { MedicationComponent } from './appointment-sub-components/medication/medication.component';
import { LabOrderComponent } from './appointment-sub-components/lab-order/lab-order.component';
import { RadiologyOrderComponent } from './appointment-sub-components/radiology-order/radiology-order.component';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { PatientHistoryPageComponent } from './appointment-sub-components/patient-history-page/patient-history-page.component';

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
    PatientHistoryPageComponent,
  ],
  imports: [
    CommonModule,
    DoctorRoutingModule,
    MaterialModule,
    ToastModule,
    MessagesModule,
    ButtonModule,
    AddPrescriptionDialogueComponent,
    PrimeNgModule,
  ],
  providers: [DialogService, DynamicDialogRef, DynamicDialogConfig],
})
export class DoctorModule {}
