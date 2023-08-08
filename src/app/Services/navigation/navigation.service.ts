import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthRoles } from 'src/app/constants/enums/Roles-Enum';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  constructor(private router: Router) { }

  roleBased(loginedUser: any) {
    if (loginedUser) {
      const { user } = loginedUser;
      if ( user && user?.roles?.length) {
        const currentUserRole = user.roles[0];
        if (currentUserRole === AuthRoles.LabTechnician) {
          this.router.navigate(['/laboratory']);
        }
         else {
          this.router.navigate(['/dashboard']);
        }
      }
    }
  }
}
