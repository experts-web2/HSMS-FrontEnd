import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
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
import { AlertService, MedicationService, MedicineService } from 'src/app/services';
import { MedicationDurations } from '../../../../constants/Constants/MedicationDuration';
import { IMedication } from 'src/app/models/interfaces/Medication';
import { IFetchRequest } from 'src/app/models/interfaces/fetchTableRequest';
import { FiltersMatchModes } from 'src/app/constants/enums/FilterMatchModes';
import { FiltersOperators } from 'src/app/constants/enums/FilterOperators';
import { IMedicine } from 'src/app/models/interfaces/Medicine';
import { PotencyUnits } from 'src/app/constants/enums/potency-units';
import { MedicineType } from 'src/app/constants/enums/Medicine-Type-Enum';
import { IHealthRecord } from 'src/app/models/interfaces/healthRecord';

@Component({
  selector: 'app-medication',
  templateUrl: './medication.component.html',
  styleUrls: ['./medication.component.scss']
})
export class MedicationComponent extends SubscriptionManagmentDirective implements OnInit, OnChanges {
  @Input() healthRecord!: IHealthRecord;
  @Input() historyTokenId!: string;
  @Input() medicationRequest!: IMedicationRequest;
  @Input() healthRecordId!: string;
  @Output() emitRequest: EventEmitter<IMedicationRequest> = new EventEmitter<IMedicationRequest>()
  historyDropDown: Array<IDropDown> = [];
  showEdit: boolean = false;
  newData: boolean = false;
  medicationForm!: FormGroup;
  loggedInDoctor!: ILogedInUser;
  medicines: Array<IMedicine> = [];
  medicinesToShow: Array<IMedicine> = [];
  medicationItem!: FormGroup;
  improvementOptions: any[] = [];
  suggestions: any[]= [];
  medicineNameBinding: 'name' | 'medicineName' = 'name';
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

    this.medicationItem = this.getMedicationItemForm();

    this.medicationForm = this.fb.group({
      medicationItems: this.fb.array([this.medicationItem],[Validators.required]),
      doctorId: new FormControl<string | null>(null, [Validators.required]),
      patientId: new FormControl<string | null>(null, [Validators.required]),
      followUpDate: new FormControl<Date | null>(null),
      medicationNotes: new FormControl<string | null>(null)
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    // this.setHistoryMedication(this.historyTokenId);
    
  }

  get medicationItems(): FormArray{
      return this.medicationForm.get('medicationItems') as FormArray;
  }

  ngOnInit(): void {

    // this.getMedicine();
    this.medicationForm.get('doctorId')?.setValue(this.healthRecord.doctorId);
    this.medicationForm.get('patientId')?.setValue(this.healthRecord.patientId);

    // console.log(this.healthRecord);
    
    if (this.healthRecord.medication) {
      this.showEdit = true; 
      this.newData = false;
      this.setHistoryMedication(this.healthRecord.medication);
    }else{
      this.newData = true;
      this.showEdit = false; 
    }
    
    this.medicationForm.valueChanges.subscribe({
      next: (x) => {
         this.currentValueSetter(x);
      }
    })
  }

  currentValueSetter(value: {[name: string]: any}){
    
    this.medicationRequest = {
      medicationDetails: this.medicationItems.value,
      doctorId: this.healthRecord.doctorId,
      patientId: this.healthRecord.patientId,
      medicationNotes: value['medicationNotes'],
      healthRecordId: this.healthRecordId
    }

    this.emitRequest.emit(this.medicationRequest);
  }

  search(e: any){

    let medicineRequest: IFetchRequest = {
      pagedListRequest:{
        pageNo: 1,
        pageSize: 1000
      },
      queryOptionsRequest: {
        filtersRequest:[
          {
            field: 'Name',
            value: e.query,
            matchMode: FiltersMatchModes.Contains,
            operator: FiltersOperators.And,
            ignoreCase: true
          }
        ]
      }
    }

    this.medicineService.getMedicine(medicineRequest).subscribe({
      next: (x) => {
        // console.log(x);
        this.medicinesToShow = x.data;
        
      },
      error: (err: Error) => {

      }
    })
    
  }

  getMedicationItemForm(): FormGroup{
    return this.fb.group({
      medicine: new FormControl<IMedicine | null>(null),
      medicineId: new FormControl<string | null>(null, [Validators.required]),
      medicineName: new FormControl<string | null>(null),
      dosage: new FormControl<number | null>(null, [Validators.required]),
      frequency: new FormControl<number | null>(null, [Validators.required]),
      route: new FormControl<number | null>(null, [Validators.required]),
      duration: new FormControl<number | null>(null, [Validators.required]),
      instruction: new FormControl<number | null>(null, [Validators.required]),
      durationValue: new FormControl<number | null>(null, [Validators.required]),
      dosageValue: new FormControl<number | null>(null, [Validators.required]),
    });
  }

  edit(){
    this.showEdit = false;
    this.medicationForm.enable();
  }

  cancelEdit(){
    this.showEdit = true;
    this.medicationForm.disable({
      onlySelf: true
    });
  }

  update(){
    let medicationId: string = '';

    if(this.healthRecord.medication) medicationId = this.healthRecord.medication.id;

    this.medicationService.updateMedication(medicationId, this.medicationRequest).subscribe({
      next: (x) => {
        this.alertService.success('Medication Updated Successfully.');
        this.healthRecord.medication = x;
        this.medicationForm.disable({
          onlySelf: true
        });
        this.showEdit = true;
      },
      error: (err) =>{
        this.alertService.error('An Error Occoured While Updateing Medication.')
      }
    });
  }

  onMedicineSelect(index: number, medicine: IMedicine){
    this.medicationItems.at(index).get('medicineName')?.setValue(medicine.name);
    this.medicationItems.at(index).get('medicineId')?.setValue(medicine.id);   

  }

  getPotencyUnit(potency: number): string{
    return PotencyUnits[potency];
  }

  getMedicineType(potency: number): string{
    return MedicineType[potency];
  }

  getMedicineHistoryDropDown(){
    this.medicationService.getMedicationHistoryDropDown(this.healthRecord.patientId).pipe(takeUntil(this.componetDestroyed)).subscribe({
      next: (x) => {
        this.historyDropDown = x;
      }
    })
  }

  setHistoryMedication(medication: IMedication){

        this.medicationRequest = {
          medicationDetails: [],
          medicationNotes: this.medicationForm.controls['medicationNotes'].value,
          doctorId: this.healthRecord.doctorId,
          patientId: this.healthRecord.patientId,
          healthRecordId: this.healthRecordId
        } 

        this.medicationRequest.medicationDetails = this.medicationItems.value;
        this.historyMedication = medication;

        this.medicationForm.disable({
          onlySelf: true
        });

        this.formSetter(medication);

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
        // this.medicines = x;
        
        // this.medicinesToShow = x;

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
    let medicationForm = this.getMedicationItemForm();
    this.medicationItems.push(medicationForm);
  }

  save(){
    
    if(this.medicationItems.valid && this.medicationForm.get('patientId')?.valid && this.medicationForm.get('doctorId')?.valid){
      let medicationRequest: IMedicationRequest = {
        patientId: this.medicationForm.controls['patientId'].value,
        doctorId: this.medicationForm.controls['doctorId'].value,
        medicationNotes: this.medicationForm.controls['medicationNotes'].value,
        healthRecordId: this.healthRecordId,
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
          this.alertService.success('Medication Saved.');
          this.newData = false;
          this.showEdit = true;
          this.medicationForm.disable({
            onlySelf: true
          });
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
    // console.log('form setter');
    
    this.medicationForm.patchValue({
      medicationNotes: medication.medicationNotes,
      // medicationItems: medication.medicationDetails
    })

    medication.medicationDetails.forEach((x, i) => {    
      // console.log({
      //   medicineId: x.medicineId,
      //   medicineName: this.medicines.find(y => y.id === x.medicineId)?.name,
      //   dosage: x.dosage,
      //   frequency: x.frequency,
      //   route: x.route,
      //   duration: x.duration,
      //   instruction: x.insturction,
      //   durationValue:x.durationValue,
      //   dosageValue: x.dosageValue,
      //   medicines: this.medicines
      // });

      this.medicationItems.at(i).disable({
        onlySelf: true
      })
      
      this.medicationItems.at(i).patchValue({
        medicineId: x.medicineId,
          medicineName: '',
          dosage: x.dosage,
          frequency: x.frequency,
          route: x.route,
          duration: x.duration,
          instruction: x.insturction,
          durationValue:x.durationValue,
          dosageValue: x.dosageValue,
          medicine: x.medicineResponse
        })

      if(medication.medicationDetails.length > this.medicationItems.length) this.addMedicationItem();
    })
  }

}
