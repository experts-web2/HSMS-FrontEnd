import { Dialog } from '@angular/cdk/dialog';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PatientFormComponent } from './forms/patient-form/patient-form.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'HSMS';
  step=''
  constructor(private dialog:MatDialog){}

  addPatient(){
   const dialogRef = this.dialog.open(PatientFormComponent,{
      width:'600px'
    })
  }
}
