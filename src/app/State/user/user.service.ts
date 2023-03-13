import { Injectable, OnDestroy } from '@angular/core';
import { of, Subject, from, Observable, BehaviorSubject, } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService implements OnDestroy {
  private user: any = {name: 'hello', address: 'bye bye', age: 89};
  readonly User_State: BehaviorSubject<any>;
  constructor() { 
    this.User_State = new BehaviorSubject<any>(this.user);
  }
  
  getUserState(){
    console.log(this.User_State)
    return this.User_State
  }
  addUser(){
    this.user.name = 'bye';
    this.user.age = 34;
    this.User_State.next(this.user);
  }
  
  
  ngOnDestroy(): void {
    // let hhh = 'asd'.toString('base64')
    // let userState = atob(JSON.stringify(this.user).toString('base64'));
  }
}
