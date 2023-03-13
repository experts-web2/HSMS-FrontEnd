import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CameraComponent } from './camera.component';
import { SharedModule } from '../../shared-module/shared-module';
import {WebcamModule} from 'ngx-webcam';
@NgModule({
  declarations: [
    CameraComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    WebcamModule
  ]
})
export class CameraModule { }
