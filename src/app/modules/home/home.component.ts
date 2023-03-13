import { Component, OnInit } from '@angular/core';
import { UserService } from '../../State/user/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private readonly userService: UserService) { }

  ngOnInit(): void {
  }

  getUser(){
    this.userService.User_State.subscribe(x=>{
      console.log(x);      
    });   
  }

  adduser(){
    this.userService.addUser();
  }


}
