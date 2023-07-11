import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ILoginUser } from '../../../models/interfaces/login-user';
import { UserService } from '../../../Services/user.service';
import { AuthService } from 'src/app/Services/auth-service/auth.service';
import { UserStateService } from 'src/app/State/user/user.service';
import { Router } from '@angular/router';
import { AlertService } from '../../../Services/alert/alert.service';
import { ILogedInUser } from 'src/app/models/interfaces/Iloggedinuser';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit, OnDestroy {
  loginForm!: FormGroup;
  $unsubscribe: Subject<any> = new Subject<any>();

  constructor(private readonly userService: UserService, private readonly authService: AuthService, private readonly userStateService: UserStateService, private router: Router, private alertService: AlertService) {

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

    this.authService.login(loginPayload).subscribe({
      next: (x: any) => {
        let userToState: ILogedInUser = {
          ...x.user, token: x.accessToken
        }
        this.userStateService.setLogedInUser(userToState);
        this.alertService.success('Logged In Successfully.', 'Success')
        this.router.navigate(['/dashboard']);
      },
      error: err => {
        this.alertService.error('Error', 'There Was an error while loging in.')
      }
    })

  }

  ngOnDestroy(): void {
  }
}
