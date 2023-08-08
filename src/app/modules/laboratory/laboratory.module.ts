import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { LaboratoryRoutingModule } from './laboratory-routing.module';
import { LaboratoryRootComponent } from './laboratory-root/laboratory-root.component';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { MaterialModule, PrimeNgModule } from 'src/app/shared/modules';
import { LabTestReportComponent } from './lab-test-report/lab-test-report.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { LabReportListComponent } from './lab-report-list/lab-report-list.component';
import { GenericTableComponent } from 'src/app/shared/components';
import {
  DialogService,
  DynamicDialogConfig,
  DynamicDialogRef,
} from 'primeng/dynamicdialog';
import { CollectLabSampleComponent } from './collect-lab-sample/collect-lab-sample.component';
import { AddPatientTestComponent } from './add-patient-test/add-patient-test.component';

@NgModule({
  declarations: [
    LaboratoryRootComponent,
    LabTestReportComponent,
    LabReportListComponent,
    AddPatientTestComponent,
    CollectLabSampleComponent,
  ],
  imports: [
    CommonModule,
    LaboratoryRoutingModule,
    CommonModule,
    MaterialModule,
    ToastModule,
    ButtonModule,
    PrimeNgModule,
    ReactiveFormsModule,
    FormsModule,
    AngularEditorModule,
    GenericTableComponent,
    ReactiveFormsModule,
  ],
  providers: [DialogService, DynamicDialogRef, DynamicDialogConfig,DatePipe],
})
export class LaboratoryModule {}
