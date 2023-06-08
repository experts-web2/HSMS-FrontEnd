import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Roles } from 'src/app/constants/enums/Roles-Enum';
import { UserService } from '../../../../Services/user.service';
import { UserStateService } from 'src/app/State/user/user.service';
import { IUser } from 'src/app/models/interfaces/user';
import { AlertService } from '../../../../Services/alert/alert.service';
import { ILogedInUser } from 'src/app/models/interfaces/Iloggedinuser';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
  userForm!: FormGroup;
  roles: RolesDisplay[] = [{id: Roles.Doctor, name: 'Doctor'}, {id: Roles.Nurse, name: 'Nurse'}, {id: Roles.Patient, name: 'Ptient'}, {id: Roles.Admin, name: 'Admin'}, {id: Roles.LabTechnician, name: 'Lab Technician'}, {id: Roles.Sweeper, name: 'Sweeper'}];
  selectedRole!: RolesDisplay;
  constructor (private fb: FormBuilder, private readonly userService: UserService, private readonly userStateService: UserStateService, private readonly alertService: AlertService){
    this.userForm = this.fb.group({
      fName: new FormControl<string>('', Validators.required),
      lName: new FormControl<string>('', Validators.required),
      email: new FormControl<string>('', [Validators.required, Validators.email]),
      password: new FormControl<string>('', Validators.required),
      role: new FormControl<number|null>(null, [Validators.required]),
      phoneNum: new FormControl<string>('', [Validators.required, Validators.pattern('[0-9]*')]),
      gender: new FormControl<number|null>(null, [Validators.required]),
      photoPath: new FormControl<string|null>(null)
    })
  }

  ngOnInit(): void {
    
  }

  formSubmit(e: any){
    console.log('event Hit');
    
    let value = this.userForm.value;
    let accountId: string = '';
    this.userStateService.User_State.subscribe({next: (x: ILogedInUser)=> {accountId = x.accountId}})
    let userToAdd: IUser ={
      firstName: value.fName,
      lastName: value.lName,
      active: true,
      phoneNumber: value.phoneNum,
      roles: [Roles[value.role]],
      photoPath: value.photoPath,
      gender: value.gender,
      password: value.password,
      email: value.email,
      accountId: accountId
    } 
    this.userService.addUser(userToAdd).subscribe({
      next: (x:any) =>{
        this.alertService.success('Success', 'User was added successfully');
        this.userForm.reset();
      },
      error: (err: any) =>{
        this.alertService.error('Error', 'An error occoured while adding user')
      }
    })

    console.log(this.userForm);    
  }
}

interface RolesDisplay{
  id: number,
  name: string
}