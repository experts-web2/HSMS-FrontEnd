import {
  Component,
  Input,
  OnInit,
  OnChanges,
  TemplateRef,
  ViewChild,
  SimpleChanges,
  Output,
  EventEmitter,
} from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { takeUntil } from 'rxjs';
import { AlertService, LoaderService, VitalService } from 'src/app/services';
import { SubscriptionManagmentDirective } from 'src/app/shared/directive/subscription-managment.directive';
import { IDropDown } from 'src/app/models/interfaces/Dropdown';
import { IToken } from 'src/app/models/interfaces/Token';
import { IVitalRequest } from 'src/app/models/interfaces/vitalsRequest';
import { IVital } from 'src/app/models/vitals';
import { IHealthRecord } from 'src/app/models/interfaces/healthRecord';

@Component({
  selector: 'app-vitals',
  templateUrl: './vitals.component.html',
  styleUrls: ['./vitals.component.scss'],
})
export class VitalsComponent
  extends SubscriptionManagmentDirective
  implements OnInit, OnChanges {
  @Input() tokenVitals!: ITokenVitals;
  @Input() healthRecord!: IHealthRecord;
  @Input() historyVital!: IVital | null;
  @Input() historyTokenId!: string;
  @Input() healthRecordId!: string;
  vitalRequest!: IVitalRequest;
  showEdit: boolean = false;
  newData: boolean = false;
  @Output() emitRequest: EventEmitter<IVitalRequest> = new EventEmitter<IVitalRequest>();
  vitalForm!: FormGroup;
  showMenu: string = '';
  action = 'update';
  historyDropDown: Array<IDropDown> = [];
  previousDates = [
    { name: '14/07/2023', id: '14/07/2023' },
    { name: '13/07/2023', id: '13/07/2023' },
    { name: '12/07/2023', id: '12/07/2023' },
    { name: '11/07/2023', id: '11/07/2023' },
  ];

  constructor(
    private readonly alertService: AlertService,
    private readonly vitalService: VitalService,
    private readonly loaderService: LoaderService
  ) {
    super();
    this.vitalForm = new FormGroup({
      pulseHeartRate: new FormControl<number | null>(null),
      temperature: new FormControl<number | null>(null),
      bloodPressure: new FormControl<string | null>(null),
      diastolicBloodPressure: new FormControl<number | null>(null),
      respiratoryRate: new FormControl<number | null>(null),
      bloodSugar: new FormControl<number | null>(null),
      weight: new FormControl<number | null>(null),
      height: new FormControl<number | null>(null),
      feet: new FormControl<number | null>(null),
      inches: new FormControl<number | null>(null),
      bodyMassIndex: new FormControl<number | null>(null),
      oxygenSaturation: new FormControl<number | null>(null),
      bodySurfaceArea: new FormControl<number | null>(null),
      reason: new FormControl<string | null>(null),
    });

    this.bodyMassIndex.disable({onlySelf: true})
  }

  get f() { return this.vitalForm.controls; }
  get feet(): AbstractControl { return this.vitalForm.get('feet') as AbstractControl }
  get inches(): AbstractControl { return this.vitalForm.get('inches') as AbstractControl }
  get weight(): AbstractControl { return this.vitalForm.get('weight') as AbstractControl }
  get bodyMassIndex(): AbstractControl { return this.vitalForm.get('bodyMassIndex') as AbstractControl }

  ngOnChanges(changes: SimpleChanges): void {
    // let tokenId = changes['historyTokenId'].currentValue;
    if(changes['healthRecord']){

      if(!this.healthRecord.vital){
        this.newData = true;
      }else{
        this.showEdit = true;
        this.newData = false;
      }
        this.vitalForm.reset()
      if (this.healthRecord.vital) {
        this.tokenVitals = <ITokenVitals>this.healthRecord.vital;
        this.setHistoryVital(this.healthRecord.vital)
      }

    }
  }

  ngOnInit(): void {

    this.subscribeForm();


  }

  subscribeForm(){
    this.vitalForm.valueChanges.subscribe({
      next: (x) => {      
        this.currentValueSetter(x);        
      }
    })
  }

  calculateBmi(){
    let bmi = 0;       
    let meters = this.feetAndInchesToCentimeters(this.feet.value ?? 0, this.inches.value ?? 0) / 100; 
    bmi =  (this.weight.value ?? 0) / (meters * meters);
    this.bodyMassIndex.setValue(bmi);
  }

  feetAndInchesToCentimeters(feet: number, inches: number): number {
    // Convert feet to centimeters
    const feetInCentimeters = feet * 30.48;

    // Convert inches to centimeters
    const inchesInCentimeters = inches * 2.54;

    // Total length in centimeters
    const totalCentimeters = feetInCentimeters + inchesInCentimeters;

    return totalCentimeters;
}

  edit(){
    this.showEdit = false;
    this.subscribeForm();
    this.vitalForm.enable();
  }

  canelEdit(){
    this.showEdit = true;
    this.subscribeForm();
    this.vitalForm.disable({
      onlySelf: true
    })
  }

  update(){
    let vitalId: string = '';
    if(this.healthRecord.vital) vitalId = this.healthRecord.vital.id;
    
    this.vitalService.updateVitals(vitalId, this.vitalRequest).subscribe({
      next: (x) => {
        this.alertService.success('Vitals Updated Successfully.');
        this.showEdit = true;
        this.healthRecord.vital = x;
        this.vitalForm.disable({
          onlySelf: true
        });
        this.emitRequest.emit(x);
      },
      error: (err) => {
        this.alertService.error('An Error Occured While Updating Vitals');
      }
    })
  }

  currentValueSetter(value: { [key: string]: any }) {
    
    this.vitalRequest = {
      pulseHeartRate: value['pulseHeartRate'],
      temperature: value['temperature'],
      bloodPressure: value['bloodPressure'],
      diastolicBloodPressure: value['diastolicBloodPressure'],
      respiratoryRate: value['respiratoryRate'],
      bloodSugar: value['bloodSugar'],
      weight: value['weight'],
      height: value['height'],
      bodyMassIndex: this.bodyMassIndex.value,
      oxygenSaturation: value['oxygenSaturation'],
      bodySurfaceArea: value['bodySurfaceArea'],
      reason: value['reason'],
      patientId: this.healthRecord.patientId,
      doctorId: this.healthRecord.doctorId,
      healthRecordId: this.healthRecordId
    }
    
    this.emitRequest.emit(this.vitalRequest);
  }

  onSubmit() {

    this.loaderService.show();
    this.vitalService.addVitals(this.vitalRequest).pipe(takeUntil(this.componetDestroyed)).subscribe({
      next: (x) => {
        this.alertService.success('Vitals added successfully', 'Success');
        this.newData = false;
        this.showEdit = true;
        this.vitalForm.disable({
          onlySelf: true
        });
        this.emitRequest.emit(x);


      }, error: (err) => {

      }
    })

  }

  setVitalsFromInput() {
    this.vitalForm.patchValue({
      pulseHeartRate: this.tokenVitals.pulseHeartRate,
      temperature: this.tokenVitals.temperature,
      bloodPressure: this.tokenVitals.bloodPressure,
      respiratoryRate: this.tokenVitals.respiratoryRate,
      bloodSugar: this.tokenVitals.bloodSugar,
      weight: this.tokenVitals.weight,
      height: this.tokenVitals.height,
      bodyMassIndex: this.tokenVitals.bodyMassIndex,
      oxygenSaturation: this.tokenVitals.oxygenSaturation,
      bodySurfaceArea: this.tokenVitals.bodySurfaceArea
    });
  }


  changeDates(vitalId: string) {
    this.getVitalsById(vitalId);
  }

  getVitalsHistoryDropDown() {
    this.vitalService
      .getVitalsHistoryDropDown(this.healthRecord.patientId)
      .pipe(takeUntil(this.componetDestroyed))
      .subscribe({
        next: (x) => {
          this.historyDropDown = x;
        },
      });
  }

  setHistoryVital(vital: IVital) {

        this.historyVital = vital;
        this.formSetter(vital);
        // this.vitalForm.disable({
        //   onlySelf: true
        // });
  }

  getVitalsById(vitalsId: string) {
    this.vitalService.getVitalsById(vitalsId).pipe(takeUntil(this.componetDestroyed)).subscribe({
      next: (x) => {
        this.historyVital = x;
        this.formSetter(x);
        // this.vitalForm.disable({
        //   onlySelf: true
        // });
      }
    })
  }

  currentVitals() {
    // this.vitalForm.enable({
    //   onlySelf: true
    // });

    if (this.vitalRequest) this.formSetter(this.vitalRequest);
    else this.vitalForm.reset();
    this.historyVital = null;
  }

  formSetter(vitals: IVitalRequest) {
    
    this.vitalForm.patchValue({
      pulseHeartRate: vitals.pulseHeartRate,
      temperature: vitals.temperature,
      bloodPressure: vitals.bloodPressure,
      diastolicBloodPressure: vitals.diastolicBloodPressure,
      respiratoryRate: vitals.respiratoryRate,
      bloodSugar: vitals.bloodSugar,
      weight: vitals.weight,
      height: vitals.height,
      bodyMassIndex: vitals.bodyMassIndex,
      oxygenSaturation: vitals.oxygenSaturation,
      bodySurfaceArea: vitals.bodySurfaceArea,
      reason: vitals.reason
    });
    
    this.currentValueSetter(this.vitalForm.value);
  }
}

interface ITokenVitals {
  pulseHeartRate?: number;
  temperature?: number;
  bloodPressure?: string;
  respiratoryRate?: number;
  bloodSugar?: number;
  height?: number;
  weight?: number;
  bodyMassIndex?: number;
  bodySurfaceArea?: number;
  oxygenSaturation?: number;
}
