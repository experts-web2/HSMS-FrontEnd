import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormRoutingModule } from './form-routing.module';
import { PatientFormComponent } from './patient-form/patient-form.component';
import { InvoiceFormComponent } from './invoice-form/invoice-form.component';
import { MAT_RADIO_DEFAULT_OPTIONS } from '@angular/material/radio';
import { CameraModule } from '../camera/camera.module';
import { PatientService } from 'src/app/services';
import { MaterialModule } from 'src/app/shared/modules';
import { PrimeNgModule } from 'src/app/shared/modules';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@NgModule({
  declarations: [
    PatientFormComponent,
    InvoiceFormComponent,
  ],
  imports: [
    CommonModule,
    FormRoutingModule,
    MaterialModule,
    CameraModule,
    PrimeNgModule
    
  ],
  exports:[
    PatientFormComponent
  ],
  providers: [{
    provide: MAT_RADIO_DEFAULT_OPTIONS,
    useValue: { color: '#0d6efd' },
    }, 
    PatientService,
    DynamicDialogConfig,
    DialogService,
    DynamicDialogRef
  ]
})
export class FormModule { }
