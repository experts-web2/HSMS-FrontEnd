import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { takeUntil } from 'rxjs';
import { SubscriptionManagmentDirective } from 'src/app/shared/directive/subscription-managment.directive';
import { UserStateService } from 'src/app/State/user/user.service';
import { MedicationDosageEnum, MedicationDosages } from 'src/app/constants/Constants/MedicationDosage';
import { MedicationFrequencies, MedicationFrequencyEnum } from 'src/app/constants/Constants/MedicationFrequency';
import { MedicationInstructionEnum, MedicationInstructions } from 'src/app/constants/Constants/MedicationInstructions';
import { MedicationRouteEnum, MedicationRoutes } from 'src/app/constants/Constants/MedicationRoute';
import { IDropDown } from 'src/app/models/interfaces/Dropdown';
import { ILogedInUser } from 'src/app/models/interfaces/Iloggedinuser';
import { IMedicationDetail, IMedicationRequest } from 'src/app/models/interfaces/MedicationRequest';
import { IToken } from 'src/app/models/interfaces/Token';
import { AlertService, MedicationService, MedicineService } from 'src/app/services';
import { MedicationDurations } from '../../../../constants/Constants/MedicationDuration';
import { IMedication } from 'src/app/models/interfaces/Medication';

@Component({
  selector: 'app-medication',
  templateUrl: './medication.component.html',
  styleUrls: ['./medication.component.scss']
})
export class MedicationComponent extends SubscriptionManagmentDirective implements OnInit, OnChanges {
  @Input() token!: IToken;
  @Input() historyTokenId!: string;

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
  @Input() historyMedication!: IMedication | null;

  constructor(private readonly fb: FormBuilder, private readonly userStateService: UserStateService, private readonly medicineService: MedicineService, private readonly medicationService: MedicationService, private readonly alertService: AlertService) {
    super();
    this.userStateService.getUserState().pipe(takeUntil(this.componetDestroyed)).subscribe({
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
    });

    this.medicationForm = this.fb.group({
      medicationItems: this.fb.array([this.medicationItem],[Validators.required]),
      doctorId: new FormControl<string | null>(null, [Validators.required]),
      patientId: new FormControl<string | null>(null, [Validators.required]),
      followUpDate: new FormControl<Date | null>(null),
      medicationNotes: new FormControl<string | null>(null)
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.getMedicationByTokenId(this.historyTokenId);
  }

  get medicationItems(): FormArray{
      return this.medicationForm.get('medicationItems') as FormArray;
  }

  ngOnInit(): void {

    this.getMedicine();
    this.getMedicineHistoryDropDown();
    this.medicationForm.get('doctorId')?.setValue(this.token.doctorId);
    this.medicationForm.get('patientId')?.setValue(this.token.patientId);

    console.log(this.token);
    
    this.medicationForm.valueChanges.subscribe({
      next: (x) => {
        if (!this.historyMedication) this.currentValueSetter(x);
      }
    })
    
    if (this.historyTokenId) this.getMedicationByTokenId(this.historyTokenId);
  }

  currentValueSetter(value: {[name: string]: any}){
    
    this.medicationRequest = {
      medicationDetails: this.medicationItems.value,
      doctorId: this.token.doctorId,
      patientId: this.token.patientId,
      medicationNotes: value['medicationNotes']
    }
  }

  search(e: string){
    let text  = e.toLowerCase();
    this.medicinesToShow = this.medicines.filter(x => x.name.toLowerCase().includes(text));
    
  }

  onMedicineSelect(index: number, medicine: IDropDown){
    this.medicationItems.at(index).get('medicineName')?.setValue(medicine.name);
    this.medicationItems.at(index).get('medicineId')?.setValue(medicine.id);    
  }

  getMedicineHistoryDropDown(){
    this.medicationService.getMedicationHistoryDropDown(this.token.patientId).pipe(takeUntil(this.componetDestroyed)).subscribe({
      next: (x) => {
        this.historyDropDown = x;
      }
    })
  }

  getMedicationByTokenId(tokenId: string){
    this.medicationService.getMedicationByTokenId(tokenId).subscribe({
      next: (x)=> {
        console.log({medicationDetail: x, medicationItems: this.medicationItems.value});
        console.log(Object.entries(this.medicationItems.value[0]).every(x => x[1] !== null));
        this.medicationRequest = {
          medicationDetails: [],
          medicationNotes: this.medicationForm.controls['medicationNotes'].value,
          doctorId: this.token.doctorId,
          patientId: this.token.patientId
        }
        this.medicationRequest.medicationDetails = this.medicationItems.value;
        this.historyMedication = x;
        this.medicationForm.disable({
          onlySelf: true
        });
        this.formSetter(x);
      }
    })
  }

  getMedicationById(medicationId: string){
    this.medicationService.getMedicationById(medicationId).pipe(takeUntil(this.componetDestroyed)).subscribe({
      next: (x) => {
        
        this.medicationRequest.medicationDetails = this.medicationItems.value ?? [];
        this.historyMedication = x;
        this.medicationForm.disable({
          onlySelf: true
        });
        this.formSetter(x)
      }
    })
  }

  onHistorySelection(medicationId: string){
    this.getMedicationById(medicationId);
  }

  getMedicine(){
    this.medicineService.getMedicineDropDown().pipe(takeUntil(this.componetDestroyed)).subscribe({
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
    if(this.medicationItems.length < 1) this.addMedicationItem();
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

      this.medicationService.addMedication(medicationRequest).pipe(takeUntil(this.componetDestroyed)).subscribe({
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

  currentMedication(){
    this.historyMedication = null;
    
    this.medicationForm.enable({
      onlySelf: true
    });
    if(this.medicationRequest) this.formSetter(this.medicationRequest);
    else this.medicationForm.reset();
  }

  formSetter(medication: IMedicationRequest){
    console.log('form setter');
    
    this.medicationForm.patchValue({
      medicationNotes: medication.medicationNotes,
      medicationItems: medication.medicationDetails
    })

    medication.medicationDetails.forEach((x, i) => {        
        this.medicationItems.at(i).patchValue({
          medicineId: x.medicineId,
          medicineName: this.medicines.find(y => y.id === x.medicineId)?.name,
          dosage: x.dosage,
          frequency: x.frequency,
          route: x.route,
          duration: x.duration,
          instruction: x.insturction,
          durationValue:x.durationValue,
          dosageValue: x.dosageValue
        })
    })
  }

}
