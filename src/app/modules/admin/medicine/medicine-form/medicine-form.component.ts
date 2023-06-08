import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MedicineType } from 'src/app/constants/enums/Medicine-Type-Enum';
import { PotencyUnits } from 'src/app/constants/enums/potency-units';
import { MedicineService } from '../../../../Services/medicine-service/medicine.service';
import { AlertService } from '../../../../Services/alert/alert.service';
import { IMedicinerequest } from 'src/app/models/interfaces/medicine-Request';

@Component({
  selector: 'app-medicine-form',
  templateUrl: './medicine-form.component.html',
  styleUrls: ['./medicine-form.component.scss']
})
export class MedicineFormComponent {
  medicineForm!: FormGroup;

  medicineTypes = [
    {label: 'Tablets', value: MedicineType.Tablets},
    {label: 'Injection', value: MedicineType.inject},
    {label: 'Liquid', value: MedicineType.Liquid},
    {label: 'Capsules', value: MedicineType.Capsules},
    {label: 'Drops', value: MedicineType.Drops},
    {label: 'Inhalers', value: MedicineType.Inhalers}    
  ];
  potecyUnits = [
    {label: 'mg', value: PotencyUnits.mg},
    {label: 'IU', value: PotencyUnits.IU},
    {label: 'IS', value: PotencyUnits.IS},
    {label: 'Percent', value: PotencyUnits.Percent},
    {label: 'g', value: PotencyUnits.g},
    {label: 'cc', value: PotencyUnits.cc},
  ];

  constructor(private fb: FormBuilder, private readonly medicineService: MedicineService, private readonly alertService: AlertService){
    this.medicineForm = this.fb.group({
      name: new FormControl<string>('', [Validators.required]),
      potency: new FormControl<number|null>(null, [Validators.required]),
      potencyUnit: new FormControl<number|null>(null, [Validators.required]),
      type: new FormControl<number|null>(null, [Validators.required]),
      salts: new FormControl<string>('', [Validators.required]),
      price: new FormControl<number|null>(null, [Validators.required])
    })
    this.medicineService.getMedicine().subscribe({
      next: (x:any) => {console.log(x);},
      error: (err: Error) => {}
    })
  }
  // //#region getters
  // get medicineName() {return this.medicineForm.get('name');};
  // get medicinePotency() {return this.medicineForm.get('potency');};
  // get medicinePotencyUnit() {return this.medicineForm.get('potencyUnit');};
  // get medicineType() {return this.medicineForm.get('type');};
  // get medicineSalts() {return this.medicineForm.get('salts');};
  // get medicinePrice() {return this.medicineForm.get('price');};
  // //#endregion
  
  // formControls = {
  //   name: this.medicineName,
  //   potency: this.medicinePotency,
  //   potencyUnit: this.medicinePotencyUnit,
  //   type: this.medicineType,
  //   salts: this.medicineSalts,
  //   price: this.medicinePrice
  // }

  submitMedicine(){
    console.log(this.medicineForm.value)
    let medicineToAdd: IMedicinerequest = {
      name: this.medicineForm.value.name,
      potency: this.medicineForm.value.potency,
      potencyUnits: this.medicineForm.value.potencyUnit,
      medicineType: this.medicineForm.value.type,
      salt: this.medicineForm.value.salts,
      price: this.medicineForm.value.price
    }

    this.medicineService.addMedicine(medicineToAdd).subscribe({
      next: (x: any) => {
        this.alertService.success('Medicine added successfully', 'Success');
        this.medicineForm.reset();
      },
      error: (err: any) =>{
        this.alertService.error('An error occurred while adding medicine', 'Error');
      }
    })    
  }
}
