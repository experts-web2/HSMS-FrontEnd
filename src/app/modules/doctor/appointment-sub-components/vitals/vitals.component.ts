import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { takeUntil } from 'rxjs';
import { AlertService } from 'src/app/Services/alert/alert.service';
import { LoaderService } from 'src/app/Services/loader/loader.service';
import { VitalService } from 'src/app/Services/vital.service';
import { SubscriptionManagmentDirective } from 'src/app/Shared/directive/subscription-managment.directive';
import { IDropDown } from 'src/app/models/interfaces/Dropdown';
import { IToken } from 'src/app/models/interfaces/Token';
import { IVital } from 'src/app/models/vitals';


@Component({
  selector: 'app-vitals',
  templateUrl: './vitals.component.html',
  styleUrls: ['./vitals.component.scss']
})
export class VitalsComponent extends SubscriptionManagmentDirective implements OnInit {

  @Input() tokenVitals!: ITokenVitals;
  @Input() token!: IToken;

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

  constructor(private readonly alertService: AlertService, private readonly vitalService: VitalService,private readonly loaderService:LoaderService) {
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
      bodyMassIndex: new FormControl<number | null>(null),
      oxygenSaturation: new FormControl<number | null>(null),
      bodySurfaceArea: new FormControl<number | null>(null),
      reason: new FormControl<string | null>(null)
    })
  }

  ngOnInit(): void {

    if (this.token) {
      this.tokenVitals = <ITokenVitals>this.token.tokenDetail;
      console.log(this.tokenVitals);

      this.setVitalsFromInput();
    }
    this.getVitalsHistoryDropDown();
  }

  get f() { return this.vitalForm.controls; }

  onSubmit() {

    let vitalPayLoad: IVital = {
      pulseHeartRate: this.vitalForm.controls['pulseHeartRate'].value,
      temperature: this.vitalForm.controls['temperature'].value,
      bloodPressure: this.vitalForm.controls['bloodPressure'].value,
      diastolicBloodPressure: this.vitalForm.controls['diastolicBloodPressure'].value,
      respiratoryRate: this.vitalForm.controls['respiratoryRate'].value,
      bloodSugar: this.vitalForm.controls['bloodSugar'].value,
      weight: this.vitalForm.controls['weight'].value,
      height: this.vitalForm.controls['height'].value,
      bodyMassIndex: this.vitalForm.controls['bodyMassIndex'].value,
      oxygenSaturation: this.vitalForm.controls['oxygenSaturation'].value,
      bodySurfaceArea: this.vitalForm.controls['bodySurfaceArea'].value,
      reason: this.vitalForm.controls['reason'].value,
      doctorId: this.token.doctorId,
      patientId: this.token.patientId
    }
    this.loaderService.show();
    this.vitalService.addVitals(vitalPayLoad).pipe(takeUntil(this.componetDestroyed)).subscribe({
      next: (x) => {
        this.alertService.success('Vitals added successfully', 'Success');

      }, error: (err) => {

      }
    })

    console.log(vitalPayLoad);
    console.log(this.vitalForm.value)
  }

  setVitalsFromInput() {
    this.vitalForm.get('pulseHeartRate')?.setValue(this.tokenVitals.pulseHeartRate);
    this.vitalForm.get('temperature')?.setValue(this.tokenVitals.temperature);
    this.vitalForm.get('bloodPressure')?.setValue(this.tokenVitals.bloodPressure);
    this.vitalForm.get('respiratoryRate')?.setValue(this.tokenVitals.respiratoryRate);
    this.vitalForm.get('bloodSugar')?.setValue(this.tokenVitals.bloodSugar);
    this.vitalForm.get('weight')?.setValue(this.tokenVitals.weight);
    this.vitalForm.get('height')?.setValue(this.tokenVitals.height);
    this.vitalForm.get('bodyMassIndex')?.setValue(this.tokenVitals.bodyMassIndex);
    this.vitalForm.get('oxygenSaturation')?.setValue(this.tokenVitals.oxygenSaturation);
    this.vitalForm.get('bodySurfaceArea')?.setValue(this.tokenVitals.bodySurfaceArea);
  }


  changeDates(event: any) {
    this.vitalService.getPreviousVisits().pipe(takeUntil(this.componetDestroyed)).subscribe({
      next: (x)=>{

      }
    })
  }

  getVitalsHistoryDropDown() {
    this.vitalService.getVitalsHistoryDropDown(this.token.patientId).pipe(takeUntil(this.componetDestroyed)).subscribe({
      next: (x) => {
        this.historyDropDown = x;
      }
    })
  }

  getVitalsById(vitalsId: string){
    this.vitalService.getVitalsById(vitalsId).pipe(takeUntil(this.componetDestroyed)).subscribe({
      next: (x)=>{
        
      }
    })
  }
}

interface ITokenVitals {
  pulseHeartRate: number;
  temperature: number;
  bloodPressure: string;
  respiratoryRate: number;
  bloodSugar: number;
  height: number;
  weight: number;
  bodyMassIndex: number;
  bodySurfaceArea: number;
  oxygenSaturation: number;
}