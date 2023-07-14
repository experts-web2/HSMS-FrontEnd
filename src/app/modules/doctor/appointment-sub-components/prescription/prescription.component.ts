import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserStateService } from 'src/app/State/user/user.service';
import { Procedure } from 'src/app/constants/enums/Procedures';
import { ILogedInUser } from 'src/app/models/interfaces/Iloggedinuser';
import { IPrescriptionRequest } from 'src/app/models/interfaces/PrescriptionRequest';
import { PrescriptionService } from '../../../../Services/prescription.service';

@Component({
  selector: 'app-prescription',
  templateUrl: './prescription.component.html',
  styleUrls: ['./prescription.component.scss']
})
export class PrescriptionComponent implements OnInit {
  prescriptionForm!: FormGroup;
  prescreptionRequest!: IPrescriptionRequest;
  loggedInDoctor!: ILogedInUser;
  improvementOptions: any[] = []; 
  constructor(private readonly fb: FormBuilder, private readonly userStateService: UserStateService, private readonly prescriptionService: PrescriptionService){

    this.userStateService.getUserState().subscribe({
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
    
  }

  savePrescription(print?: boolean){
    console.log(this.prescriptionForm.value);
    let values = this.prescriptionForm.value
    let prescription: IPrescriptionRequest = {
      doctorId: '20afc768-c778-4578-b5cd-0371c66647f6',
      patientId: 'a4b96ae6-4101-4fdf-ae8c-b146a34b6aaa',
      medicalHistory: values['medicalHistory'],
      complaint: values['complaint'], 
      examination: values['examination'],
      diagnosis: values['diagnosis'],
      clinicNotes: values['clinicNotes'],
      advice: values['advice'],
      investigation: values['investigation'],
      followUpDate: values['followUpDate']
    }
    this.prescriptionService.addPrescription(prescription).subscribe({
      next: (x)=>{
        console.log(x);
        
      },
      error: (err) =>{

      }
    })
  }
}
