import { Component } from '@angular/core';
import { AlertService } from 'src/app/Services/alert/alert.service';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.scss'],
})
export class AppointmentComponent {
constructor(private alertService:AlertService){}
showDialogueMethod!: () => void;
hideDialogue: any;
successAlert(){
  this.alertService.success('this is success', 'success summary');
}

errorAlert(){
  this.alertService.error('this is error', 'error summary');

}

warningAlert(){
  this.alertService.warning('this is warning', 'warning summary');

}

infoAlert(){
  this.alertService.info('this is info', 'success info');

}

showDialogue = (methode: () => void): void => { methode() }


}
