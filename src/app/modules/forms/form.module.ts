import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormRoutingModule } from './form-routing.module';
import { PatientFormComponent } from './patient-form/patient-form.component';
import { InvoiceFormComponent } from './invoice-form/invoice-form.component';
import { MAT_RADIO_DEFAULT_OPTIONS } from '@angular/material/radio';
import { SharedModule } from 'src/app/shared-module/shared-module';
import { CameraModule } from '../camera/camera.module';
import { PatientService } from '../../Services/patient/patient.service';
import { PrimeNgModule } from 'src/app/Shared/modules/prime-ng/prime-ng.module';


@NgModule({
  declarations: [
    PatientFormComponent,
    InvoiceFormComponent,
  ],
  imports: [
    CommonModule,
    FormRoutingModule,
    SharedModule,
    CameraModule,
    PrimeNgModule
    
  ],
  providers: [{
    provide: MAT_RADIO_DEFAULT_OPTIONS,
    useValue: { color: '#0d6efd' },
}, PatientService]
})
export class FormModule { }
