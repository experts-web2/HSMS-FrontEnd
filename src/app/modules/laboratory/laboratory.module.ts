import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LaboratoryRoutingModule } from './laboratory-routing.module';
import { LaboratoryRootComponent } from './laboratory-root/laboratory-root.component';
import { SharedModule } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { PrimeNgModule } from 'src/app/Shared/modules/prime-ng/prime-ng.module';
import { LabTestReportComponent } from './lab-test-report/lab-test-report.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularEditorModule } from '@kolkov/angular-editor';


@NgModule({
  declarations: [
    LaboratoryRootComponent,
    LabTestReportComponent
  ],
  imports: [
    CommonModule,
    LaboratoryRoutingModule,
    CommonModule,
    SharedModule,
    ToastModule,
    ButtonModule,
    PrimeNgModule,
    ReactiveFormsModule,
    FormsModule,
    AngularEditorModule 
  ]
})
export class LaboratoryModule { }
