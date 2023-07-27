import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { IUser } from '../../../models/interfaces/user';
import { UserService } from 'src/app/services';
import { IAddOrUpdateUser } from 'src/app/models/interfaces/addOrUpdate-User';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  doctorImage = '../../../assets/images/doctor.png';
  signUpForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private readonly userService: UserService
  ) {
    this.signUpForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.minLength(3)]],
      designation: ['', [Validators.required]],
      email: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.pattern(
            '[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z, A-Z]{2,3}'
          ),
        ],
      ],
      phoneNumber: ['', [Validators.required, Validators.minLength(10)]],
      password: ['', [Validators.required]],
      confirm_password: ['', [Validators.required]],
    });
  }
  //#region getters
  get firstName() {
    return this.signUpForm.get('firstName');
  }
  get lastName() {
    return this.signUpForm.get('lastName');
  }
  get designation() {
    return this.signUpForm.get('designation');
  }
  get email() {
    return this.signUpForm.get('email');
  }
  get phoneNumber() {
    return this.signUpForm.get('phoneNumber');
  }
  get password() {
    return this.signUpForm.get('password');
  }
  get confirm_password() {
    return this.signUpForm.get('confirm_password');
  }
  //#endregion

  ngOnInit(): void {}

  public validate(): void {
    let formUser = this.signUpForm.value;
    let user: IAddOrUpdateUser = {
      firstName: formUser.firstName,
      lastName: formUser.lastName,
      email: formUser.email,
      gender: formUser.gender,
      phoneNumber: formUser.phoneNumber,
      roles: [formUser.designation],
      password: formUser.password,
      active: true,
      accountId: '',
    };

    this.userService.register(user).subscribe((x: any) => {});
  }
}
