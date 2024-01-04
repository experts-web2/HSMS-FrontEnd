import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormRoutingModule } from './form-routing.module';
import { PatientFormComponent } from './patient-form/patient-form.component';
import { InvoiceFormComponent } from './invoice-form/invoice-form.component';
import { CameraModule } from '../camera/camera.module';
import { PatientService } from 'src/app/services';
import { PrimeNgModule } from 'src/app/shared/modules';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    PatientFormComponent,
    InvoiceFormComponent,
  ],
  imports: [
    CommonModule,
    FormRoutingModule,
    CameraModule,
    PrimeNgModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports:[
    PatientFormComponent
  ],
  providers: [ 
    PatientService,
    DynamicDialogConfig,
    DialogService,
    DynamicDialogRef
  ]
})
export class FormModule { }
