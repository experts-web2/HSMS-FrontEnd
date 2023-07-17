import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

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

  constructor() {

  }
  ngOnInit(): void {
    this.vitalForm = new FormGroup({
      pulseHeartRate: new FormControl(''),
      pulseHeartRateReason: new FormControl(''),
      temperature: new FormControl(''),
      temperatureReason: new FormControl(''),
      bloodPressure: new FormControl(''),
      bloodPressureReason: new FormControl(''),
      diastolicBloodPressure: new FormControl(''),
      diastolicBloodPressureReason: new FormControl(''),
      respiratoryRate: new FormControl(''),
      respiratoryRateReason: new FormControl(''),
      bloodSugar: new FormControl(''),
      bloodSugarReason: new FormControl(''),
      weight: new FormControl(''),
      weightReason: new FormControl(''),
      height: new FormControl(''),
      heightReason: new FormControl(''),
      bodyMassIndex: new FormControl(''),
      bodyMassIndexReason: new FormControl(''),
      oxygenSaturation: new FormControl(''),
      oxygenSaturationReason: new FormControl(''),
      bodySurfaceArea: new FormControl(''),
      bodySurfaceAreaReason: new FormControl(''),
    })

  }

  get f() { return this.vitalForm.controls; }

  onSubmit() {
    let vitalPayLoad = {
      pulseHeartRate : `${this.vitalForm.controls['pulseHeartRate'].value} - ${this.vitalForm.controls['pulseHeartRateReason'].value}`,
      temperature : `${this.vitalForm.controls['temperature'].value} - ${this.vitalForm.controls['temperatureReason'].value}`,
      bloodPressure : `${this.vitalForm.controls['bloodPressure'].value} - ${this.vitalForm.controls['bloodPressureReason'].value}`,
      diastolicBloodPressure : `${this.vitalForm.controls['diastolicBloodPressure'].value} - ${this.vitalForm.controls['diastolicBloodPressureReason'].value}`,
      respiratoryRate : `${this.vitalForm.controls['respiratoryRate'].value} - ${this.vitalForm.controls['respiratoryRateReason'].value}`,
      bloodSugar : `${this.vitalForm.controls['bloodSugar'].value} - ${this.vitalForm.controls['bloodSugarReason'].value}`,
      weight : `${this.vitalForm.controls['weight'].value} - ${this.vitalForm.controls['weightReason'].value}`,
      height : `${this.vitalForm.controls['height'].value} - ${this.vitalForm.controls['heightReason'].value}`,
      bodyMassIndex : `${this.vitalForm.controls['bodyMassIndex'].value} - ${this.vitalForm.controls['bodyMassIndexReason'].value}`,
      oxygenSaturation : `${this.vitalForm.controls['oxygenSaturation'].value} - ${this.vitalForm.controls['oxygenSaturationReason'].value}`,
      bodySurfaceArea : `${this.vitalForm.controls['bodySurfaceArea'].value} - ${this.vitalForm.controls['bodySurfaceAreaReason'].value}`,
    }
    
    console.log(vitalPayLoad);
    console.log(this.vitalForm.value)
  }


  changeDates(event: any) {
    console.log(event.target.value)
  }

  addReason(field: string, reason: string) {
    console.log(reason);
    this.vitalForm.controls[field].setValue(`${this.vitalForm.controls[field].value} ${reason}  `)
    console.log(field);
  }

  openMenu(field: string) {
    console.log('field', field);
    this.showMenu = field;
  }

  closeMenu() {
    this.showMenu = '';
  }

}
