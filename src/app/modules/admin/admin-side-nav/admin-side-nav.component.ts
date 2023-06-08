import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-admin-side-nav',
  templateUrl: './admin-side-nav.component.html',
  styleUrls: ['./admin-side-nav.component.scss']
})
export class AdminSideNavComponent {
  constructor(private router: Router){

  }

  hierarchies: MenuItem[] = [{
    label: 'Heirarchies', 
    items:[
    {label: 'Locations', command: ()=> this.navigate('/user-list')},
    {label: 'Departments', command: ()=> this.navigate('/departments-list')},
    {label:'Positions', command: ()=> this.navigate('/positions-list')}]
}
  ]


  navigate(route: string){
    this.router.navigate([route])
    // console.log(route);
    
  }
}
