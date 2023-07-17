import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserStateService } from 'src/app/State/user/user.service';
import { ILogedInUser } from 'src/app/models/interfaces/Iloggedinuser';

@Component({
  selector: 'app-medication',
  templateUrl: './medication.component.html',
  styleUrls: ['./medication.component.scss']
})
export class MedicationComponent {
  medicationForm!: FormGroup;
  // prescreptionRequest!: IPrescriptionRequest;
  loggedInDoctor!: ILogedInUser;
  medicationItem!: FormGroup;
  improvementOptions: any[] = [];
  suggestions: any[]= []
  constructor(private readonly fb: FormBuilder, private readonly userStateService: UserStateService) {
    this.userStateService.getUserState().subscribe({
      next: (x) => {
        this.loggedInDoctor = x;
      }
    });

    this.medicationItem = this.fb.group({
      medicineId: new FormControl<string | null>(null),
      dosage: new FormControl<string | null>(null),
      frequency: new FormControl<string | null>(null),
      route: new FormControl<string | null>(null),
      duration: new FormControl<string | null>(null),
      instruction: new FormControl<string | null>(null),
    })

    this.medicationForm = this.fb.group({
      medicationItems: this.fb.array([this.medicationItem]),
      doctorId: new FormControl<string | null>(null, [Validators.required]),
      patientId: new FormControl<string | null>(null, [Validators.required]),
      followUpDate: new FormControl<Date | null>(null)
    })
  }

  get medicationItems(): FormArray{
      return this.medicationForm.get('medicationItems') as FormArray;
  }

  ngOnInit(): void {

  }

  search(e: any){

  }

  removeMedicationItem(index: any){
    this.medicationItems.removeAt(index);
  }

  addMedicationItem(){
    this.medicationItems.push(this.medicationItem);
  }

  // savePrescription(print?: boolean){
  //   console.log(this.prescriptionForm.value);
  //   let values = this.prescriptionForm.value
  //   let prescription: IPrescriptionRequest = {
  //     doctorId: '20afc768-c778-4578-b5cd-0371c66647f6',
  //     patientId: 'a4b96ae6-4101-4fdf-ae8c-b146a34b6aaa',
  //     medicalHistory: values['medicalHistory'],
  //     complaint: values['complaint'], 
  //     examination: values['examination'],
  //     diagnosis: values['diagnosis'],
  //     clinicNotes: values['clinicNotes'],
  //     advice: values['advice'],
  //     investigation: values['investigation'],
  //     followUpDate: values['followUpDate']
  //   }
  //   this.prescriptionService.addPrescription(prescription).subscribe({
  //     next: (x)=>{
  //       console.log(x);

  //     },
  //     error: (err) =>{

  //     }
  //   })
  // }
}
