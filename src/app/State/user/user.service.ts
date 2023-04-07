import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserStateService implements OnDestroy {

  private user: any = {name: 'hello', address: 'bye bye', age: 89};
  private readonly stateName = 'userState';
  readonly User_State: BehaviorSubject<any>;

  constructor() {
    let localStorageData = localStorage.getItem(this.stateName);
    if(localStorageData) this.user = JSON.parse(localStorageData);
    this.User_State = new BehaviorSubject<any>(this.user);
  }
  
  getUserState(){
    console.log(this.User_State)
    return this.User_State
  }

  addUser(){
    this.user.name = 'bye';
    this.user.age = Math.random();
    this.User_State.next(this.user);
  }
  
  setData(){
    let userState = atob(JSON.stringify(this.user));
    localStorage.setItem('userState',userState);
  }
  getData(){
    let localStorageData = localStorage.getItem('userState') ?? '';
    let decrypted = btoa(localStorageData);
    console.log(decrypted);
    let hydrationData = JSON.parse(decrypted)
    console.log(hydrationData);
    
  }
  
  ngOnDestroy(): void {
    let userState = JSON.stringify(this.user);
    localStorage.setItem(this.stateName,userState);
  }
}
