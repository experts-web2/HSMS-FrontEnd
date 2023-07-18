import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PatientFormComponent } from './modules/forms/patient-form/patient-form.component';
import { AuthService } from './Services/auth-service/auth.service';
import { UserStateService } from './State/user/user.service';
import { ILogedInUser } from './models/interfaces/Iloggedinuser';
import { Roles } from './constants/enums/Roles-Enum';

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
  navbarShowHide = false



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

      },
      error: (err: Error) => { }
    })
  }

  addPatient() {
    const dialogRef = this.dialog.open(PatientFormComponent, {
      width: '600px'
    })
  }

  logOut() {
    this.authService.logOut();
  }

  navbarToggle(){
    this.navbarShowHide = !this.navbarShowHide
  }
}
