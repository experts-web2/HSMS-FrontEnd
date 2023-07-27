import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Roles } from 'src/app/constants/enums/Roles-Enum';
import { UserService } from '../../../../Services/user.service';
import { UserStateService } from 'src/app/State/user/user.service';
import { IUser } from 'src/app/models/interfaces/user';
import { AlertService } from '../../../../Services/alert/alert.service';
import { ILogedInUser } from 'src/app/models/interfaces/Iloggedinuser';
import { IAddOrUpdateUser } from 'src/app/models/interfaces/addOrUpdate-User';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { DoctorService } from 'src/app/Services/doctor.service';
import { SubscriptionManagmentDirective } from 'src/app/Shared/directive/subscription-managment.directive';
import { takeUntil } from 'rxjs';


@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent extends SubscriptionManagmentDirective implements OnInit {
  userForm!: FormGroup;
  roles: RolesDisplay[] = [{ id: Roles.Doctor, name: 'Doctor' }, { id: Roles.Nurse, name: 'Nurse' }, { id: Roles.Patient, name: 'Ptient' }, { id: Roles.Admin, name: 'Admin' }, { id: Roles.LabTechnician, name: 'Lab Technician' }, { id: Roles.Sweeper, name: 'Sweeper' }];
  user: any;
  action: string;
  constructor(private fb: FormBuilder,
    private readonly userService: UserService,
    private readonly userStateService: UserStateService,
    private readonly alertService: AlertService,
    private readonly doctorService: DoctorService,
    public readonly config: DynamicDialogConfig,
    public readonly ref: DynamicDialogRef) {
    super();
    this.user = this.config.data.user;
    this.action = this.config.data.action
  }

  ngOnInit(): void {
    this.userForm = this.fb.group({
      firstName: new FormControl<string>('', Validators.required),
      lastName: new FormControl<string>('', Validators.required),
      email: new FormControl<string>('', [Validators.required, Validators.email]),
      password: new FormControl<string>('', Validators.required),
      role: new FormControl<number | null>(null, [Validators.required]),
      phoneNumber: new FormControl<string>('', [Validators.required, Validators.pattern('[0-9]*')]),
      photoPath: new FormControl<string | null>(null)
    })

    if (this.action === 'update' && this.user) {
      this.userForm.patchValue(
        {
          firstName: this.user.firstName,
          lastName: this.user.lastName,
          active: true,
          phoneNumber: this.user.phoneNumber,
          photoPath: this.user.photoPath,
          email: this.user.email,
          accountId: this.user.accountId
        });
    }
  }

  get f() { return this.userForm.controls; }

  isEmailExist() {
    let control = this.userForm.get('email');
    if (control?.valid && control.value !== '') {
      let canSave = false;
      canSave = this.isEmailAlreadyInUse(control.value);
      if (canSave) {

      }
    }
  }

  isEmailAlreadyInUse(email: string): any {
    let test = false;
    this.doctorService.isEmailInUse(email).pipe(takeUntil(this.componetDestroyed)).subscribe(
      (data: boolean) => {
        const pe = this.userForm.get('email');
        if (data) {
          pe?.setErrors({ invalid: true, inuse: true });
          test = true;
        }
      },
      (err: any) => console.log(err),
      () => {
      },
    );
    return test;
  }

  formSubmit(e: any) {
    let value = this.userForm.value;
    let accountId: string = '';
    this.userStateService.User_State.pipe(takeUntil(this.componetDestroyed)).subscribe({ next: (x: ILogedInUser) => { accountId = x.accountId } })
    let userToAdd: IAddOrUpdateUser = {
      firstName: value.firstName,
      lastName: value.lastName,
      active: true,
      phoneNumber: value.phoneNumber,
      roles: [Roles[value.role]],
      photoPath: '',
      password: value.password,
      email: value.email,
      accountId: accountId
    }
    if (this.action === 'add') {
      this.userService.addUser(userToAdd).pipe(takeUntil(this.componetDestroyed)).subscribe({
        next: (x: any) => {
          this.alertService.success('Success', 'User was added successfully');
          this.userForm.reset();
          this.ref.close(true);
        },
        error: (err: any) => {
          this.alertService.error('Error', 'An error occoured while adding user')
        }
      })
    } else {
      // const data = userToAdd;
      // const { password, roles, ...rest } = data;
      this.userService.updateUser(this.user.id, userToAdd).pipe(takeUntil(this.componetDestroyed)).subscribe({
        next: (x: any) => {
          this.alertService.success('Success', 'User was update successfully');
          this.userForm.reset();
          this.ref.close(true);

        },
        error: (err: any) => {
          this.alertService.error('Error', 'An error occoured while update user')
        }
      })
    }

  }
}

interface RolesDisplay {
  id: number,
  name: string
}
