import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ILoginUser } from '../../../models/login-user';
import { UserService } from '../../../Services/user.service';
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(private readonly userService: UserService) {

    this.loginForm = new FormGroup({
      email: new FormControl<string>('', [Validators.required, Validators.email, Validators.pattern('[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z, A-Z]{2,3}')]),
      password: new FormControl<string>('', [Validators.required]),
      rememberMe: new FormControl<boolean>(false)
    });

  }

  ngOnInit(): void {

  }

  get email() { return this.loginForm.get('email'); }
  get password() { return this.loginForm.get('password'); }
  get rememberMe() { return this.loginForm.get('rememberMe'); }

  public validate(): void {
    // if (this.loginForm.invalid) {
      let formLogin = this.loginForm.value;

      let loginPayload: ILoginUser = {
        email: formLogin.email,
        password: formLogin.password,
        rememberMe: formLogin.rememberMe
      }
      console.log(loginPayload);
      this.userService.login(loginPayload).subscribe((x: any) => {
        console.log(x);
        
      })
      
      // for (const control of Object.keys(this.loginForm.controls)) {
      //   this.loginForm.controls[control].markAsTouched();
      // }
      // return;
    // }
  }



}
