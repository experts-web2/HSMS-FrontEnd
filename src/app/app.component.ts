import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PatientFormComponent } from './modules/forms/patient-form/patient-form.component';
import { AuthService } from './Services/auth-service/auth.service';
import { UserStateService } from './State/user/user.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'HSMS';
  step = ''
  logedIn: boolean = false;
  showNav: boolean = false;



  constructor(private dialog:MatDialog, private readonly authService: AuthService, private readonly userStateService:UserStateService){}

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  checkLoggedIn(){

  }

  addPatient(){
   const dialogRef = this.dialog.open(PatientFormComponent,{
      width:'600px'
    })
  }

  logOut(){
    this.authService.logOut();
  }
}
