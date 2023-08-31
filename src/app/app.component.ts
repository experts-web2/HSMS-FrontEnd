import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/services';
import { UserStateService } from './State/user/user.service';
import { ILogedInUser } from './models/interfaces/Iloggedinuser';
import { AddTokenModalComponent } from './modules/dialog/add-token-modal/add-token-modal.component';
import { PatientFormComponent } from './modules/forms/patient-form/patient-form.component';
import { AddPatientTestComponent } from './modules/laboratory/add-patient-test/add-patient-test.component';
import { CollectLabSampleComponent } from './modules/laboratory/collect-lab-sample/collect-lab-sample.component';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { Dialog } from 'primeng/dialog';
import { AddAppointmentComponent } from './modules/dialog/add-appointment/add-appointment.component';
import { DialogService } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'HSMS';
  navitems:Array<MenuItem> = [
  {
      label: 'Notification',
      icon: 'fa-solid fa-bell',
  },
  {
      label: 'Suggest',
      icon: 'fa-solid fa-lightbulb',
  },
  {
      label: 'Log Out',
      icon: 'fa fa-sign-out',
      command: this.logOut.bind(this),
  },
  ]
  navItemToShow: Array<MenuItem> = []
  step = '';
  logedIn: boolean = false;
  showNav: boolean = false;
  userName: string = '';
  userRole: string = '';
  isAdmin!: boolean;
  logedInUser!: ILogedInUser;
  navbarShowHide = false;
  isDoctor: boolean = false;
  mobileSerchBar: boolean = false;
  items = [
    {
        items: [
            {
                label: 'Medicine Purchase',
                routerLink: 'pharmacy/pharmacy-purchase'
            },
            {
                label: 'Medicine Sale',
                routerLink: 'pharmacy/pharmacy-sale'
            },
            {
                label: 'Medicine Reports',
                routerLink: 'pharmacy/pharmacy-reporting'
            }
        ]
    }
];
  isLabTechnician = false;

  constructor(
    private dialog: MatDialog,
    private readonly authService: AuthService,
    private readonly userStateService: UserStateService,
    private router: Router,
    private pNgDialog: DialogService
  ) {}

  ngOnInit(): void {

    this.checkLoggedIn();

    if (this.isDoctor || this.isAdmin) {
      this.navItemToShow= [{
        label: 'Messages',
        icon: 'fa-solid fa-message',
        routerLink: '/register',
        styleClass:"navButton cursor-pointer",
    }, ...this.navitems, ]
    if (this.isAdmin) {
      this.navItemToShow.unshift({
        label: 'Admin',
        icon: 'fa-solid fa-user',
        routerLink: '/admin',
    })
    }
    }
  }

  checkLoggedIn() {
    this.userStateService.User_State.subscribe({
      next: (x: ILogedInUser) => {
        if (x) this.showNav = true;
        else this.showNav = false;
        this.userName = `${x?.firstName} ${x?.lastName}`;
        this.logedInUser = x;
        this.isAdmin = x?.roles.includes('Admin');
        this.isDoctor = x?.roles.includes('Doctor');
        if(x?.roles.includes('LabTechnician')){
          this.isLabTechnician = true;
          this.router.navigate(['/laboratory/add_patient_test'])
        }
      },
      error: (err: Error) => {},
    });
  }

  addPatient() {
    const dialogRef = this.dialog.open(PatientFormComponent, {
      width: '600px',
    });
  }

  addPatientTest() {
    this.dialog.open(AddPatientTestComponent, {
      // maxWidth: '100vw',
      width: '90vw',
      maxWidth: '',
      height: '90vh',
      data: {},
    });
  }
  collectionLabSample() {
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

  addSchedule(){
    this.pNgDialog.open(AddAppointmentComponent,{
      width: '60%',
      height: '80%',
    })
  }

  navbarToggle() {
    this.navbarShowHide = !this.navbarShowHide;
  }

  addToken() {
    this.dialog.open(AddTokenModalComponent, {
      // maxWidth: '100vw',
      width: '90vw',
      maxWidth: '',
      height: '90vh',
      data: { display: true },
    });
  }
}
