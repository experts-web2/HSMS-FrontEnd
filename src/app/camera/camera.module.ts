import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WebcamModule } from 'ngx-webcam';
import { CameraComponent } from './camera.component';
import { SharedModule } from '../shared-module/shared-module';



@NgModule({
  declarations: [
    CameraComponent
  ],
  imports: [
    CommonModule,
    WebcamModule,
    SharedModule
  ]
})
export class CameraModule { }
