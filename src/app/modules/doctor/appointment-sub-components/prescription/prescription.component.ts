import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserStateService } from 'src/app/State/user/user.service';
import { Procedure } from 'src/app/constants/enums/Procedures';
import { ILogedInUser } from 'src/app/models/interfaces/Iloggedinuser';
import { IPrescriptionRequest } from 'src/app/models/interfaces/PrescriptionRequest';
import { PrescriptionService } from '../../../../Services/prescription.service';
import { IToken } from 'src/app/models/interfaces/Token';
import { IDropDown } from 'src/app/models/interfaces/Dropdown';
import { AlertService } from 'src/app/Services/alert/alert.service';
import { SubscriptionManagmentDirective } from 'src/app/Shared/directive/subscription-managment.directive';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'app-prescription',
  templateUrl: './prescription.component.html',
  styleUrls: ['./prescription.component.scss']
})
export class PrescriptionComponent extends SubscriptionManagmentDirective implements OnInit {
  @Input() token!: IToken;
  
  doctorId!: string;
  patientId!: string;
  prescriptionForm!: FormGroup;
  prescreptionRequest!: IPrescriptionRequest;
  loggedInDoctor!: ILogedInUser;
  improvementOptions: any[] = [];
  historyDropDown: Array<IDropDown> = [];
  
  constructor(private readonly fb: FormBuilder, private readonly userStateService: UserStateService, private readonly prescriptionService: PrescriptionService, private readonly alertService: AlertService){
    super();
    this.userStateService.getUserState().pipe(takeUntil(this.componetDestroyed)).subscribe({
      next: (x) => {
        this.loggedInDoctor = x;
      }
    })

    this.prescriptionForm = this.fb.group({
      doctorId: new FormControl<string|null>(null, [Validators.required]),
      patientId: new FormControl<string|null>(null, [Validators.required]),
      medicalHistory: new FormControl<string|null>(null),
      complaint: new FormControl<string|null>(null),
      examination: new FormControl<string|null>(null),
      diagnosis: new FormControl<string|null>(null),
      clinicNotes: new FormControl<string|null>(null),
      advice: new FormControl<string|null>(null),
      investigation: new FormControl<string|null>(null),
      followUpDate: new FormControl<Date|null>(null)
      // procedure: new FormControl<Procedure | null>(null) 
    })
  }

  ngOnInit(): void {
    this.getPrescriptionHistoryDropDown();
    if(this.token) {
      this.patientId = this.token.patientId;
      this.doctorId = this.token.doctorId;
    }
  }

  getPrescriptionHistoryDropDown(){
    this.prescriptionService.getPrescriptionHistoryDropDown(this.token.patientId).pipe(takeUntil(this.componetDestroyed)).subscribe({
      next: (x)=>{
        this.historyDropDown = x;
      }
    })
  }

  getPrescription(prescriptionId: string){
    this.prescriptionService.getPrescriptionById(prescriptionId).pipe(takeUntil(this.componetDestroyed)).subscribe({
      next: (x)=>{

      }
    })
  }

  onHistorySelection(prescriptionId: string){

  }

  savePrescription(print?: boolean){
    console.log(this.prescriptionForm.value);
    let values = this.prescriptionForm.value
    let prescription: IPrescriptionRequest = {
      doctorId: this.doctorId,
      patientId: this.patientId,
      medicalHistory: values['medicalHistory'],
      complaint: values['complaint'], 
      examination: values['examination'],
      diagnosis: values['diagnosis'],
      clinicNotes: values['clinicNotes'],
      advice: values['advice'],
      investigation: values['investigation'],
      followUpDate: values['followUpDate']
    }
    this.prescriptionService.addPrescription(prescription).pipe(takeUntil(this.componetDestroyed)).subscribe({
      next: (x)=>{
        console.log(x);
        this.alertService.success('Prescription Saved Successfully.')
        
      },
      error: (err) =>{

      }
    })
  }

  onSelectHistory(prescriptionId: string){
    this.getPrescription(prescriptionId);
    
  }
}
