import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';



@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  doctorImage='../../../assets/images/doctor.png'
  signUpForm!:FormGroup;

  constructor() {
    this.signUpForm = new FormGroup({
      f_name: new FormControl('', [Validators.required,Validators.minLength(4)]),
      l_name: new FormControl('', [Validators.required,Validators.minLength(4)]),
      designation: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required,Validators.email, Validators.pattern('[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z, A-Z]{2,3}')]),
      phone_no: new FormControl('', [Validators.required,Validators.minLength(11)]),
      password: new FormControl('', [Validators.required]),
      confirm_password: new FormControl('', [Validators.required]),
    });   
   }

  ngOnInit(): void {
    
  }

  get f_name() { return this.signUpForm.get('f_name'); }
  get l_name() { return this.signUpForm.get('l_name'); }
  get designation() { return this.signUpForm.get('designation'); }
  get email() { return this.signUpForm.get('email'); }
  get phone_no() { return this.signUpForm.get('phone_no'); }
  get password() { return this.signUpForm.get('password'); }
  get confirm_password() { return this.signUpForm.get('confirm_password'); }

  public validate(): void {
    if (this.signUpForm.invalid) {
      for (const control of Object.keys(this.signUpForm.controls)) {
        this.signUpForm.controls[control].markAsTouched();
      }
      return;
    }
  }


}
