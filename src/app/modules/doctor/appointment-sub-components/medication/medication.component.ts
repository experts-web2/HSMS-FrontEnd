import { Component, Input } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserStateService } from 'src/app/State/user/user.service';
import { MedicationDosageEnum, MedicationDosages } from 'src/app/constants/Constants/MedicationDosage';
import { MedicationFrequencies, MedicationFrequencyEnum } from 'src/app/constants/Constants/MedicationFrequency';
import { MedicationRouteEnum, MedicationRoutes } from 'src/app/constants/Constants/MedicationRoute';
import { ILogedInUser } from 'src/app/models/interfaces/Iloggedinuser';
import { MedicationDurationEnum, MedicationDurations } from '../../../../constants/Constants/MedicationDuration';
import { MedicationInstructionEnum, MedicationInstructions } from 'src/app/constants/Constants/MedicationInstructions';
import { MedicineService } from 'src/app/Services/medicine-service/medicine.service';
import { IDropDown } from 'src/app/models/interfaces/Dropdown';
import { IMedicationDetail, IMedicationRequest } from 'src/app/models/interfaces/MedicationRequest';
import { MedicationService } from 'src/app/Services/medication.service';
import { IMedicinerequest } from '../../../../models/interfaces/medicine-Request';
import { AlertService } from 'src/app/Services/alert/alert.service';
import { IToken } from 'src/app/models/interfaces/Token';

@Component({
  selector: 'app-medication',
  templateUrl: './medication.component.html',
  styleUrls: ['./medication.component.scss']
})
export class MedicationComponent {
  @Input() token!: IToken;

  historyDropDown: Array<IDropDown> = [];
  medicationForm!: FormGroup;
  loggedInDoctor!: ILogedInUser;
  medicines: Array<IDropDown> = [];
  medicinesToShow: Array<IDropDown> = [];
  medicationItem!: FormGroup;
  improvementOptions: any[] = [];
  suggestions: any[]= [];
  medicationRequest!: IMedicationRequest;
  medicationRoutes = MedicationRoutes;
  medicationFrequencies = MedicationFrequencies;
  medicationDosages = MedicationDosages;
  medicationDurations = MedicationDurations;
  medicationInstructions = MedicationInstructions;
  constructor(private readonly fb: FormBuilder, private readonly userStateService: UserStateService, private readonly medicineService: MedicineService, private readonly medicationService: MedicationService, private readonly alertService: AlertService) {
    this.userStateService.getUserState().subscribe({
      next: (x) => {
        this.loggedInDoctor = x;
      }
    });

    this.medicationItem = this.fb.group({
      medicineId: new FormControl<string | null>(null, [Validators.required]),
      medicineName: new FormControl<string | null>(null),
      dosage: new FormControl<number | null>(null, [Validators.required]),
      frequency: new FormControl<number | null>(null, [Validators.required]),
      route: new FormControl<number | null>(null, [Validators.required]),
      duration: new FormControl<number | null>(null, [Validators.required]),
      instruction: new FormControl<number | null>(null, [Validators.required]),
      durationValue: new FormControl<number | null>(null, [Validators.required]),
      dosageValue: new FormControl<number | null>(null, [Validators.required])
    })

    this.medicationForm = this.fb.group({
      medicationItems: this.fb.array([this.medicationItem],[Validators.required]),
      doctorId: new FormControl<string | null>(null, [Validators.required]),
      patientId: new FormControl<string | null>(null, [Validators.required]),
      followUpDate: new FormControl<Date | null>(null),
      medicationNotes: new FormControl<string | null>(null)
    })
  }

  get medicationItems(): FormArray{
      return this.medicationForm.get('medicationItems') as FormArray;
  }

  ngOnInit(): void {
    this.getMedicine();
    this.getMedicineHistoryDropDown();
    this.medicationForm.get('doctorId')?.setValue(this.token.doctorId);
    this.medicationForm.get('patientId')?.setValue(this.token.patientId);
  }

  search(e: string){
    let text  = e.toLowerCase();
    console.log(text);
    this.medicinesToShow = this.medicines.filter(x => x.name.toLowerCase().includes(text));
    
  }

  onMedicineSelect(index: number, medicine: IDropDown){
    this.medicationItems.at(index).get('medicineName')?.setValue(medicine.name);
    this.medicationItems.at(index).get('medicineId')?.setValue(medicine.id);    
  }

  getMedicineHistoryDropDown(){
    this.medicationService.getMedicationHistoryDropDown(this.token.patientId).subscribe({
      next: (x) => {
        this.historyDropDown = x;
      }
    })
  }

  getMedicationById(medicationId: string){
    this.medicationService.getMedicationById(medicationId).subscribe({
      next: (x) => {

      }
    })
  }

  onHistorySelection(medicationId: string){
    this.getMedicationById(medicationId);
  }

  getMedicine(){
    this.medicineService.getMedicineDropDown().subscribe({
      next: (x) => {
        this.medicines = x;
        this.medicinesToShow = x;

      },
      error: (err)=>{

      }
    })
  }

  submitMedications(){

  }

  setDuration(index: number, duration: any){
    console.log({index,duration});
    
    this.medicationItems.at(index).get('duration')?.setValue(duration.value);
  }

  setDosage(index: number, dosage: {label: string, value: MedicationDosageEnum}){
    this.medicationItems.at(index).patchValue({
      dosage: dosage.value
    })
  }

  setRoute(index: number, route: {label: string, value: MedicationRouteEnum}){
    this.medicationItems.at(index).patchValue({
      route: route.value
    })
  }

  setInstruction(index: number, instruction: {label: string, value: MedicationInstructionEnum}){
    this.medicationItems.at(index).patchValue({
      instruction: instruction.value
    })
  }

  setFrequency(index: number, frequency: {label: string, value: MedicationFrequencyEnum}){
    this.medicationItems.at(index).patchValue({
      frequency: frequency.value
    })
  }

  removeMedicationItem(index: any){
    this.medicationItems.removeAt(index);
    let medicationForm = this.fb.group({
      medicineId: new FormControl<string | null>(null, [Validators.required]),
      medicineName: new FormControl<string | null>(null),
      dosage: new FormControl<number | null>(null, [Validators.required]),
      frequency: new FormControl<number | null>(null, [Validators.required]),
      route: new FormControl<number | null>(null, [Validators.required]),
      duration: new FormControl<number | null>(null, [Validators.required]),
      instruction: new FormControl<number | null>(null, [Validators.required]),
      durationValue: new FormControl<number | null>(null, [Validators.required]),
      dosageValue: new FormControl<number | null>(null, [Validators.required])
    })
    if(this.medicationItems.length < 1) this.medicationItems.push(medicationForm);
  }

  addMedicationItem(){
    let medicationForm = this.fb.group({
      medicineId: new FormControl<string | null>(null, [Validators.required]),
      medicineName: new FormControl<string | null>(null),
      dosage: new FormControl<number | null>(null, [Validators.required]),
      frequency: new FormControl<number | null>(null, [Validators.required]),
      route: new FormControl<number | null>(null, [Validators.required]),
      duration: new FormControl<number | null>(null, [Validators.required]),
      instruction: new FormControl<number | null>(null, [Validators.required]),
      durationValue: new FormControl<number | null>(null, [Validators.required]),
      dosageValue: new FormControl<number | null>(null, [Validators.required])
    })
    this.medicationItems.push(medicationForm);
  }

  save(){
    
    if(this.medicationItems.valid && this.medicationForm.get('patientId')?.valid && this.medicationForm.get('doctorId')?.valid){
      let medicationRequest: IMedicationRequest = {
        patientId: this.medicationForm.controls['patientId'].value,
        doctorId: this.medicationForm.controls['doctorId'].value,
        medicationNotes: this.medicationForm.controls['medicationNotes'].value,
        medicationDetails: this.medicationItems.value.map((x: any) => {
          let medicationDetail: IMedicationDetail = {
            medicineId: x.medicineId,
            dosage: x.dosage,
            dosageValue: x.dosageValue,
            duration: x.duration,
            durationValue: x.durationValue,
            route: x.route,
            frequency: x.frequency,
            insturction: x.instruction
          };

          return medicationDetail;
        })
      };

      this.medicationService.addMedication(medicationRequest).subscribe({
        next: (x) => {
          
          this.alertService.success('Medication Saved.')
          
        },
        error: (err) => {

          this.alertService.error('There was an error while saving medication.')
        }
      })
      
    }
    else{
      this.alertService.error('Form is invalid.')

    }
  }

}
