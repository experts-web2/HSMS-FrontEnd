import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { takeUntil } from 'rxjs';
import { AlertService, DoctorService } from 'src/app/services';
import { SubscriptionManagmentDirective } from 'src/app/shared/directive/subscription-managment.directive';
import { IAddOrUpdateDoctorRequest } from 'src/app/models/interfaces/addOrUpdate-Doctor';

@Component({
  selector: 'app-doctor-form',
  templateUrl: './doctor-form.component.html',
  styleUrls: ['./doctor-form.component.scss'],
})
export class DoctorFormComponent
  extends SubscriptionManagmentDirective
  implements OnInit
{
  category = [
    {
      id: 'Child Specialist',
      label: 'Child Specialist',
    },
  ];
  qualifications = [
    {
      id: 'MBBS',
      label: 'MBBS',
    },
  ];

  addDoctorForm!: FormGroup;
  preview = '';
  selectedFiles: any;
  currentFile?: File;
  doctor: any;
  action: string;
  submitted = false;

  constructor(
    public ref: DynamicDialogRef,
    private readonly doctorService: DoctorService,
    private readonly alertService: AlertService,
    public config: DynamicDialogConfig
  ) {
    super();
    this.doctor = this.config.data.doctor;
    this.action = this.config.data.action;
  }
  ngOnInit(): void {
    this.addDoctorForm = new FormGroup({
      name: new FormControl(''),
      gender: new FormControl(1),
      opd: new FormControl(''),
      token: new FormControl(''),
      appointment: new FormControl(''),
      consultationFee: new FormControl('', [Validators.required]),
      sharePrice: new FormControl('', [Validators.required]),
      speciality: new FormControl('', [Validators.required]),
      biography: new FormControl(''),
      qualification: new FormControl('', [Validators.required]),
      service: new FormControl('', [Validators.required]),
      timings: new FormControl(''),
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      email: new FormControl('', [
        Validators.required,
        Validators.email,
        Validators.pattern(
          '[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z, A-Z]{2,3}'
        ),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      phoneNumber: new FormControl('', [Validators.required]),
      photoPath: new FormControl(''),
      active: new FormControl(true),
      roles: new FormControl(['Doctor']),
    });

    if (this.action === 'update' && this.doctor) {
      this.addDoctorForm.patchValue({
        gender: this.doctor.gender,
        opd: this.doctor.opd,
        token: this.doctor.token,
        appointment: this.doctor.appointment,
        consultationFee: this.doctor.consultationFee,
        sharePrice: this.doctor.sharePrice,
        speciality: this.doctor.speciality,
        biography: this.doctor.biography,
        qualification: this.doctor.qualification,
        service: this.doctor.service,
        timings: this.doctor.timings,
        firstName: this.doctor.user.firstName,
        lastName: this.doctor.user.lastName,
        email: this.doctor.user.email,
        phoneNumber: this.doctor.user.phoneNumber,
        photoPath: this.doctor.user.photoPath,
      });
    }
  }

  get f() {
    return this.addDoctorForm.controls;
  }

  selectFile(event: any): void {
    this.preview = '';
    this.selectedFiles = event.target.files;

    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);

      if (file) {
        this.preview = '';
        this.currentFile = file;
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.addDoctorForm.controls['photoPath'].setValue(e.target.result);
          this.preview = e.target.result;
        };

        reader.readAsDataURL(this.currentFile);
      }
    }
  }

  isEmailExist() {
    let control = this.addDoctorForm.get('email');
    if (control?.valid && control.value !== '') {
      let canSave = false;
      canSave = this.isEmailAlreadyInUse(control.value);
      if (canSave) {
      }
    }
  }

  isEmailAlreadyInUse(email: string): any {
    let test = false;
    this.doctorService
      .isEmailInUse(email)
      .pipe(takeUntil(this.componetDestroyed))
      .subscribe(
        (data: boolean) => {
          const pe = this.addDoctorForm.get('email');
          if (data) {
            pe?.setErrors({ invalid: true, inuse: true });
            test = true;
          }
        },
        (err) => console.log(err),
        () => {}
      );
    return test;
  }

  onSubmit() {
    let requestPayLoad: IAddOrUpdateDoctorRequest = {
      name: `Dr.${this.addDoctorForm.controls['firstName'].value} ${this.addDoctorForm.controls['lastName'].value} `,
      gender: this.addDoctorForm.controls['gender'].value,
      opd: this.addDoctorForm.controls['opd'].value,
      token: this.addDoctorForm.controls['token'].value,
      appointment: this.addDoctorForm.controls['appointment'].value,
      consultationFee: this.addDoctorForm.controls['consultationFee'].value,
      sharePrice: this.addDoctorForm.controls['sharePrice'].value,
      speciality: this.addDoctorForm.controls['speciality'].value,
      biography: this.addDoctorForm.controls['biography'].value,
      qualification: this.addDoctorForm.controls['qualification'].value,
      service: this.addDoctorForm.controls['service'].value,
      timings: this.addDoctorForm.controls['timings'].value,
      userRequest: {
        firstName: this.addDoctorForm.controls['firstName'].value,
        lastName: this.addDoctorForm.controls['lastName'].value,
        email: this.addDoctorForm.controls['email'].value,
        password: this.addDoctorForm.controls['password'].value,
        phoneNumber: this.addDoctorForm.controls['phoneNumber'].value,
        photoPath: '',
        active: this.addDoctorForm.controls['active'].value,
        roles: this.addDoctorForm.controls['roles'].value,
      },
    };
    if (this.action === 'add') {
      this.doctorService
        .addDoctor(requestPayLoad)
        .pipe(takeUntil(this.componetDestroyed))
        .subscribe({
          next: (x: any) => {
            this.alertService.success('Success', 'Doctor added successfully');
            this.ref.close(true);
          },
          error: (err: any) => {
            this.alertService.error(
              'Error',
              'An error occoured while adding doctor'
            );
          },
        });
    } else {
      this.doctorService
        .updateDoctor(requestPayLoad, this.doctor.id)
        .pipe(takeUntil(this.componetDestroyed))
        .subscribe({
          next: (x: any) => {
            this.alertService.success('Success', 'Doctor update successfully');
            this.ref.close(true);
          },
          error: (err: any) => {
            this.alertService.error(
              'Error',
              'An error occoured while update doctor'
            );
          },
        });
    }
  }
}
