import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PatientFormComponent } from './modules/forms/patient-form/patient-form.component';
import { AuthService } from './Services/auth-service/auth.service';
import { UserStateService } from './State/user/user.service';
import { ILogedInUser } from './models/interfaces/Iloggedinuser';
import { Roles } from './constants/enums/Roles-Enum';
import { AddTokenModalComponent } from './modules/dialog/add-token-modal/add-token-modal.component';
import { CollectLabSampleComponent } from './modules/laboratory/collect-lab-sample/collect-lab-sample.component';
import { AddPatientTestComponent } from './modules/laboratory/add-patient-test/add-patient-test.component';

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
  userName: string = '';
  userRole: string = '';
  isAdmin!: boolean;
  logedInUser!: ILogedInUser;
  navbarShowHide = false;
  isDoctor: boolean = false;



  constructor(private dialog: MatDialog, private readonly authService: AuthService, private readonly userStateService: UserStateService) { }

  ngOnInit(): void {
    this.checkLoggedIn();
  }

  checkLoggedIn() {
    this.userStateService.User_State.subscribe({
      next: (x: ILogedInUser) => {
        if (x) this.showNav = true;
        else this.showNav = false;
        this.userName = `${x?.firstName} ${x?.lastName}`;
        this.logedInUser = x;
        this.isAdmin = x?.roles.includes('Admin');
        this.isDoctor = x?.roles.includes("Doctor");
        console.log(x);
        

      },
      error: (err: Error) => { }
    })
  }

  addPatient() {
    const dialogRef = this.dialog.open(PatientFormComponent, {
      width: '600px'
    })
  }

  addPatientTest(){
    this.dialog.open(AddPatientTestComponent, {
      // maxWidth: '100vw',
      width: '90vw',
      maxWidth: '',
      height: '90vh',
      data: {},
    });    
  }
  collectionLabSample(){
    this.dialog.open(CollectLabSampleComponent, {
      // maxWidth: '100vw',
      width: '50vw',
      maxWidth: '',
      height: '50vh',
      data: {},
    });    
  }

  logOut() {
    this.authService.logOut();
  }

  navbarToggle(){
    this.navbarShowHide = !this.navbarShowHide
  }
}
