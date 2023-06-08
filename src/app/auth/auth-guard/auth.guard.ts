import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserStateService } from 'src/app/State/user/user.service';
import { ILogedInUser } from 'src/app/models/interfaces/Iloggedinuser';
import { Roles } from 'src/app/constants/enums/Roles-Enum';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private readonly userStateService: UserStateService, private readonly router: Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let canActivate = false;

    if(!this.userStateService.isLogedIn()) {
      console.log('not Loged in');
      
      this.router.navigate(['/sign-in'])
      return  canActivate;   
    }

    
    this.userStateService.getUserState().subscribe((x: ILogedInUser) => {      
      if(x && x?.roles.includes('Admin') && route.routeConfig?.path === 'admin') canActivate = true 
    });
    
    if(this.userStateService.isLogedIn()) return true;
    
     
    return canActivate;
  }  
}
