import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { takeUntil } from 'rxjs';
import { SubscriptionManagmentDirective } from 'src/app/shared/directive/subscription-managment.directive';
import { UserStateService } from 'src/app/State/user/user.service';
import { IDropDown } from 'src/app/models/interfaces/Dropdown';
import { ILogedInUser } from 'src/app/models/interfaces/Iloggedinuser';
import { IPrescriptionRequest } from 'src/app/models/interfaces/PrescriptionRequest';
import { IToken } from 'src/app/models/interfaces/Token';
import { AlertService, PrescriptionService } from 'src/app/services';
import { IPrescription } from 'src/app/models/interfaces/Prescription';

@Component({
  selector: 'app-prescription',
  templateUrl: './prescription.component.html',
  styleUrls: ['./prescription.component.scss'],
})
export class PrescriptionComponent
  extends SubscriptionManagmentDirective
  implements OnInit
{
  @Input() token!: IToken;
  @Input() historyTokenId!: string;

  doctorId!: string;
  patientId!: string;
  prescriptionForm!: FormGroup;
  prescriptionRequest!: IPrescriptionRequest;
  loggedInDoctor!: ILogedInUser;
  improvementOptions: any[] = [];
  historyDropDown: Array<IDropDown> = [];
  @Input() historyPrescription!: IPrescription | null;

  constructor(private readonly fb: FormBuilder, private readonly userStateService: UserStateService, private readonly prescriptionService: PrescriptionService, private readonly alertService: AlertService) {
    super();
    this.userStateService
      .getUserState()
      .pipe(takeUntil(this.componetDestroyed))
      .subscribe({
        next: (x) => {
          this.loggedInDoctor = x;
        },
      });

    this.prescriptionForm = this.fb.group({
      doctorId: new FormControl<string | null>(null, [Validators.required]),
      patientId: new FormControl<string | null>(null, [Validators.required]),
      medicalHistory: new FormControl<string | null>(null),
      complaint: new FormControl<string | null>(null),
      examination: new FormControl<string | null>(null),
      diagnosis: new FormControl<string | null>(null),
      clinicNotes: new FormControl<string | null>(null),
      advice: new FormControl<string | null>(null),
      investigation: new FormControl<string | null>(null),
      followUpDate: new FormControl<Date | null>(null),
      // procedure: new FormControl<Procedure | null>(null)
    });

    
  }

  ngOnInit(): void {
    this.getPrescriptionHistoryDropDown();
    if (this.token) {
      this.patientId = this.token.patientId;
      this.doctorId = this.token.doctorId;
    }

    this.prescriptionForm.valueChanges.subscribe({
      next: (x) => {

        if(!this.historyPrescription){
          console.log('chnaged') 
          this.currentValueSetter(x);
      }
        
      }
    });

    if(this.historyTokenId) this.getPrescriptionByTokenId(this.historyTokenId);
  }

  currentValueSetter(value: {[name: string]: any}){
    this.prescriptionRequest = {
      doctorId: this.doctorId,
      patientId: this.patientId,
      medicalHistory: value['medicalHistory'],
      complaint: value['complaint'],
      examination: value['examination'],
      diagnosis: value['diagnosis'],
      clinicNotes: value['clinicNotes'],
      advice: value['advice'],
      investigation: value['investigation'],
      followUpDate: value['followUpDate']
    }
  }

  getPrescriptionHistoryDropDown() {
    this.prescriptionService.getPrescriptionHistoryDropDown(this.token.patientId).pipe(takeUntil(this.componetDestroyed)).subscribe({
      next: (x) => {
        this.historyDropDown = x;
      }
    })
  }

  getPrescriptionByTokenId(tokenId: string){
    this.prescriptionService.getPrescriptionByTokenId(tokenId).subscribe({
      next: (x)=>{
        this.historyPrescription = x;
        this.formSetter(x);
        this.prescriptionForm.disable({
          onlySelf: true
        });
      }
    })
  }

  getPrescription(prescriptionId: string) {
    this.prescriptionService.getPrescriptionById(prescriptionId).pipe(takeUntil(this.componetDestroyed)).subscribe({
      next: (x) => {
        this.historyPrescription = x;
        this.formSetter(x);
        this.prescriptionForm.disable({
          onlySelf: true
        });
      }
    })
  }

  onHistorySelection(prescriptionId: string) {

  }

  savePrescription(print?: boolean) {
    let values = this.prescriptionForm.value;

    // let prescription: IPrescriptionRequest = {
    //   doctorId: this.doctorId,
    //   patientId: this.patientId,
    //   medicalHistory: values['medicalHistory'],
    //   complaint: values['complaint'],
    //   examination: values['examination'],
    //   diagnosis: values['diagnosis'],
    //   clinicNotes: values['clinicNotes'],
    //   advice: values['advice'],
    //   investigation: values['investigation'],
    //   followUpDate: values['followUpDate']
    // }

    this.prescriptionService.addPrescription(this.prescriptionRequest).pipe(takeUntil(this.componetDestroyed)).subscribe({
      next: (x) => {
        this.alertService.success('Prescription Saved Successfully.');
      },
      error: (err) => {

      }
    })
  }

  onSelectHistory(prescriptionId: string) {
    this.getPrescription(prescriptionId);

  }

  currentPrescription(){
    this.prescriptionForm.enable({
      onlySelf: true
    });
    console.log(this.prescriptionRequest);
    
    if (this.prescriptionRequest) this.formSetter(this.prescriptionRequest);
    else this.prescriptionForm.reset();
    
    this.historyPrescription = null;
  }

  formSetter(prescription: IPrescriptionRequest){
    this.prescriptionForm.patchValue({
      medicalHistory: prescription.medicalHistory,
      complaint: prescription.complaint,
      examination: prescription.examination,
      diagnosis: prescription.diagnosis,
      clinicNotes: prescription.clinicNotes,
      advice: prescription.advice,
      investigation: prescription.investigation,
      followUpDate: prescription.followUpDate
    })
  }
}
