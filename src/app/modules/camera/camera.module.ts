import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CameraComponent } from './camera.component';
import { MaterialModule, PrimeNgModule } from 'src/app/shared/modules';
import { WebcamModule } from 'ngx-webcam';
@NgModule({
  declarations: [CameraComponent],
  imports: [CommonModule, MaterialModule, WebcamModule,PrimeNgModule],
})
export class CameraModule {}
