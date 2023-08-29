import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DoctorRoutingModule } from './doctor-routing.module';
import { DoctorRootComponent } from './doctor-root/doctor-root.component';
import { AppointmentComponent } from './appointment/appointment.component';
import { MaterialModule, PrimeNgModule } from 'src/app/shared/modules';
import { ToastModule } from 'primeng/toast';
import { MessagesModule } from 'primeng/messages';
import { ButtonModule } from 'primeng/button';
import { AddPrescriptionDialogueComponent, GenericTableComponent } from 'src/app/shared/components';
import { DoctorDashboardComponent } from './doctor-dashboard/doctor-dashboard.component';
import { PrescriptionComponent } from './appointment-sub-components/prescription/prescription.component';
import { VitalsComponent } from './appointment-sub-components/vitals/vitals.component';
import { MedicationComponent } from './appointment-sub-components/medication/medication.component';
import { LabOrderComponent } from './appointment-sub-components/lab-order/lab-order.component';
import { RadiologyOrderComponent } from './appointment-sub-components/radiology-order/radiology-order.component';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { PatientHistoryPageComponent } from './appointment-sub-components/patient-history-page/patient-history-page.component';
import { PatientScheduleComponent } from './patient-schedule/patient-schedule.component';
import { SchedulingComponent } from './scheduling/scheduling.component';
import { FlatpickrModule } from 'angularx-flatpickr';

import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { FormsModule } from '@angular/forms';
import { DrPrescriptionPrintComponent } from './appointment-sub-components/dr-prescription-print/dr-prescription-print.component';
import { FilesPreviewComponent } from './appointment-sub-components/files-preview/files-preview.component';
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
    PatientScheduleComponent,
    SchedulingComponent,
    DrPrescriptionPrintComponent,
    FilesPreviewComponent,
  ],
  imports: [
    CommonModule,
    DoctorRoutingModule,
    GenericTableComponent,
    MaterialModule,
    ToastModule,
    MessagesModule,
    ButtonModule,
    AddPrescriptionDialogueComponent,
    PrimeNgModule,
    FlatpickrModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
    FormsModule
  ],
  providers: [DialogService, DynamicDialogRef, DynamicDialogConfig],
})
export class DoctorModule {}
