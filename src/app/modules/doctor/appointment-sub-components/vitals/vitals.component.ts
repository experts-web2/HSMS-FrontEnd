import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AlertService } from 'src/app/Services/alert/alert.service';
import { VitalService } from 'src/app/Services/vital.service';
import { IVital } from 'src/app/models/vitals';


@Component({
  selector: 'app-vitals',
  templateUrl: './vitals.component.html',
  styleUrls: ['./vitals.component.scss']
})
export class VitalsComponent implements OnInit {

  vitalForm!: FormGroup;
  showMenu: string = '';
  action = 'update'

  previousDates = [
    { name: '14/07/2023', id: '14/07/2023' },
    { name: '13/07/2023', id: '13/07/2023' },
    { name: '12/07/2023', id: '12/07/2023' },
    { name: '11/07/2023', id: '11/07/2023' },
  ];

  constructor(private readonly alertService: AlertService,private readonly vitalService:VitalService) {

  }
  ngOnInit(): void {
    this.vitalForm = new FormGroup({
      pulseHeartRate: new FormControl(''),
      temperature: new FormControl(''),
      bloodPressure: new FormControl(''),
      diastolicBloodPressure: new FormControl(''),
      respiratoryRate: new FormControl(''),
      bloodSugar: new FormControl(''),
      weight: new FormControl(''),
      height: new FormControl(''),
      bodyMassIndex: new FormControl(''),
      oxygenSaturation: new FormControl(''),
      bodySurfaceArea: new FormControl(''),
      reason:new FormControl('')
    })

  }

  get f() { return this.vitalForm.controls; }

  onSubmit() {

    let vitalPayLoad : IVital = {
      pulseHeartRate : this.vitalForm.controls['pulseHeartRate'].value,
      temperature : this.vitalForm.controls['temperature'].value,
      bloodPressure : this.vitalForm.controls['bloodPressure'].value,
      diastolicBloodPressure : this.vitalForm.controls['diastolicBloodPressure'].value,
      respiratoryRate : this.vitalForm.controls['respiratoryRate'].value,
      bloodSugar : this.vitalForm.controls['bloodSugar'].value,
      weight : this.vitalForm.controls['weight'].value,
      height : this.vitalForm.controls['height'].value,
      bodyMassIndex : this.vitalForm.controls['bodyMassIndex'].value,
      oxygenSaturation : this.vitalForm.controls['oxygenSaturation'].value,
      bodySurfaceArea : this.vitalForm.controls['bodySurfaceArea'].value,
      reason : this.vitalForm.controls['reason'].value,
    }

    this.vitalService.addVitals(vitalPayLoad).subscribe({
      next: (x) =>{
        this.alertService.success('Vitals added successfully', 'Success');

      },error:(err)=>{

      }
    })
    
    console.log(vitalPayLoad);
    console.log(this.vitalForm.value)
  }


  changeDates(event: any) {
    console.log(event.target.value)
  }
}
