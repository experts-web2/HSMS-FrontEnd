import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
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
import { IHealthRecord } from 'src/app/models/interfaces/healthRecord';

@Component({
  selector: 'app-prescription',
  templateUrl: './prescription.component.html',
  styleUrls: ['./prescription.component.scss'],
})
export class PrescriptionComponent
  extends SubscriptionManagmentDirective
  implements OnInit, OnChanges
{
  @Input() healthRecord!: IHealthRecord;
  @Input() historyTokenId!: string;
  @Input() prescriptionRequest!: IPrescriptionRequest;
  @Input() healthRecordId!: string;
  @Output() emitRequest: EventEmitter<IPrescriptionRequest> = new EventEmitter<IPrescriptionRequest>();
  @Input() doctorId!: string;
  patientId!: string;
  newData: boolean = false;
  showEdit: boolean = false;
  prescriptionForm!: FormGroup;
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

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['healthRecord']) {
      if(!this.healthRecord.prescription){
        this.newData = true;
        this.showEdit = false;
      }else{
        this.newData = false;
        this.showEdit = true;
      }

      if (this.healthRecord) {
        this.patientId = this.healthRecord.patientId;
        this.doctorId = this.healthRecord.doctorId;
      }
      if(this.healthRecord.prescription) this.setHistoryPrescription(this.healthRecord.prescription);
      // else {
      //   let newPrescription: IPrescriptionRequest ={
      //     healthRecordId: this.healthRecord.id,
      //     doctorId: this.healthRecord.id,
      //     patientId: this.healthRecord.id
      //   }
      //   this.formSetter(newPrescription);
      // }
    }
  }

  ngOnInit(): void {

    this.prescriptionForm.valueChanges.subscribe({
      next: (x) => {
          
          this.currentValueSetter(x);        
      }
    });
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
      followUpDate: value['followUpDate'],
      healthRecordId: this.healthRecordId
    }
    
    this.emitRequest.emit(this.prescriptionRequest);
  }

  getPrescriptionHistoryDropDown() {
    this.prescriptionService.getPrescriptionHistoryDropDown(this.healthRecord.patientId).pipe(takeUntil(this.componetDestroyed)).subscribe({
      next: (x) => {
        this.historyDropDown = x;
      }
    })
  }

  setHistoryPrescription(prescription: IPrescription){

        this.historyPrescription = prescription;
        this.formSetter(prescription);
        // this.prescriptionForm.disable({
        //   onlySelf: true
        // });
  }

  getPrescription(prescriptionId: string) {
    this.prescriptionService.getPrescriptionById(prescriptionId).pipe(takeUntil(this.componetDestroyed)).subscribe({
      next: (x) => {
        this.historyPrescription = x;
        this.formSetter(x);
        // this.prescriptionForm.disable({
        //   onlySelf: true
        // });
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
        this.newData = false;
        this.showEdit = true;
        this.prescriptionForm.disable({onlySelf: true})
        this.emitRequest.emit(x);
      },
      error: (err) => {

      }
    })
  }

  onSelectHistory(prescriptionId: string) {
    this.getPrescription(prescriptionId);

  }

  currentPrescription(){
    // this.prescriptionForm.enable({
    //   onlySelf: true
    // });
    
    if (this.prescriptionRequest) this.formSetter(this.prescriptionRequest);
    else this.prescriptionForm.reset();
    
    this.historyPrescription = null;
  }

  edit(){
    this.showEdit = false;
    this.prescriptionForm.enable();
  }

  cancelEdit(){
    this.showEdit = true;
    // this.prescriptionForm.disable({
    //   onlySelf: true
    // });
  }

  update(){
    let prescriptionId: string = '';
    if(this.healthRecord.prescription) prescriptionId = this.healthRecord.prescription.id;
    this.prescriptionService.updatePrescriptionById(prescriptionId, this.prescriptionRequest).subscribe({
      next: (x) => {
        this.alertService.success('Prescription Updated Successfully.');
        this.showEdit = true;
        this.healthRecord.prescription = x;
        this.prescriptionForm.disable({
          onlySelf: true
        });
      },
      error: (err) => {
        this.alertService.error('An Error Occoured While Updating.');
      }
    })
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

    this.currentValueSetter(this.prescriptionForm.value);
  }
}


