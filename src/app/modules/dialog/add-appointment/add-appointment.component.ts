import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Dialog } from 'primeng/dialog';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AppointmentStatusEnum } from 'src/app/constants/enums/appointment-status';
import { ScheduleTypeEnum, ScheduleTypesDropDown } from 'src/app/constants/enums/scheduleType';
import { IDropDown } from 'src/app/models/interfaces/Dropdown';
import { IScheduleRequest } from 'src/app/models/interfaces/schedule-Request';
import { DoctorService, PatientService, SchedulingService } from 'src/app/services';
import { PrimeNgModule } from 'src/app/shared/modules';

@Component({
  selector: 'app-add-appointment',
  templateUrl: './add-appointment.component.html',
  styleUrls: ['./add-appointment.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, PrimeNgModule],
  providers: [DynamicDialogConfig, DynamicDialogRef, Dialog]
})
export class AddAppointmentComponent implements OnInit {
  addAppointmentForm!: FormGroup;
  scheduleTypesToShow: Array<{label: string, value: ScheduleTypeEnum}> = ScheduleTypesDropDown;
  doctors: Array<IDropDown> = [];
  doctorsToShow: Array<IDropDown> = [];
  patients: Array<IDropDown> = [];
  patientsToShow: Array<IDropDown> = [];

  constructor(
    private readonly dialogRef: DynamicDialogRef, 
    private readonly dialogConfig: DynamicDialogConfig, 
    private readonly fb: FormBuilder,
    private readonly schedulingService: SchedulingService,
    private readonly doctorService: DoctorService,
    private readonly patientService: PatientService
  ) {
    this.addAppointmentForm = this.fb.group({
      startTime: new FormControl<Date | null>(null, [Validators.required]),
      endTime: new FormControl<Date | null>(null, [Validators.required]),
      scheduleDate: new FormControl<Date | null>(null, [Validators.required]),
      appointmentType: new FormControl<string | null>(null, [Validators.required]),
      patientId: new FormControl<string | null>(null, [Validators.required]),
      doctortId: new FormControl<string | null>(null, [Validators.required]),
      doctorName: new FormControl<string | null>(null),
      patientName: new FormControl<string | null>(null),
    })
  }

  get startTime (): AbstractControl{
    return this.addAppointmentForm.get('startTime') as AbstractControl;
  }

  get endTime (): AbstractControl{
    return this.addAppointmentForm.get('endTime') as AbstractControl;
  }

  get scheduleDate (): AbstractControl{
    return this.addAppointmentForm.get('scheduleDate') as AbstractControl;
  }

  get patientId (): AbstractControl{
    return this.addAppointmentForm.get('patientId') as AbstractControl;
  }

  get doctortId (): AbstractControl{
    return this.addAppointmentForm.get('doctortId') as AbstractControl;
  }

  get appointmentType (): AbstractControl{
    return this.addAppointmentForm.get('appointmentType') as AbstractControl;
  }

  ngOnInit(): void {
    this.getDoctorsDrpDown();
    this.getPatientsDropDown();
    this.addAppointmentForm.valueChanges.subscribe({
      next: (x) => {
        console.log(x);
        
      }
    })
  }

  saveAppointment(){
    if (this.addAppointmentForm.invalid) return;

    let schedulingRequest: IScheduleRequest = {
      appointmentDate: this.scheduleDate.value,
      startTime: this.startTime.value,
      endTime: this.endTime.value,
      type: this.appointmentType.value,
      status: AppointmentStatusEnum.Scheduled,
      doctorId: this.doctortId.value,
      patientId: this.patientId.value
    }

    this.schedulingService.addSchedule(schedulingRequest).subscribe({
      next: (x) => {

      },
      error: (err) => {

      }
    })
  }

  selectAppointmentType(event: any){
    console.log(event);
    
  }

  getDoctorsDrpDown(){
    this.doctorService.getDoctorDropDown().subscribe({
      next: (x) => {
        this.doctors = x;
        this.doctorsToShow = x;
      },
      error: (err) => {

      }
    })
  }

  getPatientsDropDown(){
    this.patientService.getPatientDropDown().subscribe({
      next: (x) => {
        this.patients = x;
        this.patientsToShow = x;
      },
      error: (err) => {

      }
    })
  }

  filterDoctors(event: AutoCompleteCompleteEvent){
    this.doctorsToShow = this.doctors.filter(x => x.name.toLocaleLowerCase().includes(event.query.toLocaleLowerCase()));
  }

  filterPatients(event: AutoCompleteCompleteEvent){
    this.patientsToShow = this.patients.filter(x => x.name.toLocaleLowerCase().includes(event.query.toLocaleLowerCase()));
  }

  selectDoctor(event: IDropDown){
    this.doctortId.setValue(event.id);
    
  }

  selectPatient(event: IDropDown){
    this.patientId.setValue(event.id);
  }

  addPatient(){
  }

  close(){
    this.dialogRef.close(true);
  }
}

interface AutoCompleteCompleteEvent {
  originalEvent: Event;
  query: string;
}