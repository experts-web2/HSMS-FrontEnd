import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PatientFormComponent } from './modules/forms/patient-form/patient-form.component';
import { AuthService } from './Services/auth-service/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'HSMS';
  step = ''
  logedIn: boolean = false;



  constructor(private dialog:MatDialog, private readonly authService: AuthService){}

  addPatient(){
   const dialogRef = this.dialog.open(PatientFormComponent,{
      width:'600px'
    })
  }

  logOut(){
    this.authService.logOut();
  }
}
