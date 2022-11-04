import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormRoutingModule } from './form-routing.module';
import { PatientFormComponent } from './patient-form/patient-form.component';
import { InvoiceFormComponent } from './invoice-form/invoice-form.component';
import { SharedModule } from '../shared-module/shared-module';
import { MAT_RADIO_DEFAULT_OPTIONS } from '@angular/material/radio';
import { CameraModule } from '../camera/camera.module';


@NgModule({
  declarations: [
    PatientFormComponent,
    InvoiceFormComponent
  ],
  imports: [
    CommonModule,
    FormRoutingModule,
    SharedModule,
    CameraModule
    
  ],
  providers: [{
    provide: MAT_RADIO_DEFAULT_OPTIONS,
    useValue: { color: '#0d6efd' },
}]
})
export class FormModule { }
