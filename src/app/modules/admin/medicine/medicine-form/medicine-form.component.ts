import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { takeUntil } from 'rxjs';
import { SubscriptionManagmentDirective } from 'src/app/shared/directive/subscription-managment.directive';
import { MedicineType } from 'src/app/constants/enums/Medicine-Type-Enum';
import { PotencyUnits } from 'src/app/constants/enums/potency-units';
import { IMedicinerequest } from 'src/app/models/interfaces/medicine-Request';
import { AlertService, MedicineService, MedicineBrandService } from 'src/app/services';
import { IDropDown } from 'src/app/models/interfaces/Dropdown';


@Component({
  selector: 'app-medicine-form',
  templateUrl: './medicine-form.component.html',
  styleUrls: ['./medicine-form.component.scss']
})
export class MedicineFormComponent extends SubscriptionManagmentDirective implements OnInit {
  medicineForm!: FormGroup;

  medicineTypes = [
    { label: 'Tablets', value: MedicineType.Tablets },
    { label: 'Injection', value: MedicineType.Inject },
    { label: 'Liquid', value: MedicineType.Liquid },
    { label: 'Capsules', value: MedicineType.Capsules },
    { label: 'Drops', value: MedicineType.Drops },
    { label: 'Inhalers', value: MedicineType.Inhalers }
  ];
  Units = [
    { label: 'mg', value: PotencyUnits.mg },
    { label: 'IU', value: PotencyUnits.IU },
    { label: 'IS', value: PotencyUnits.IS },
    { label: 'Percent', value: PotencyUnits.Percent },
    { label: 'g', value: PotencyUnits.g },
    { label: 'cc', value: PotencyUnits.cc },
  ];
  medicine: any;
  action: string;
  brandList: Array<IDropDown> = [];

  constructor(private fb: FormBuilder,
    private readonly medicineService: MedicineService,
    private readonly alertService: AlertService,
    public config: DynamicDialogConfig,
    public ref: DynamicDialogRef,
    private readonly medicineBrandService: MedicineBrandService,
  ) {
    super();
    this.medicine = this.config.data.medicine;
    this.action = this.config.data.action
    this.getMedicineBrandDropDown();
  }
  ngOnInit(): void {
    this.medicineForm = this.fb.group({
      name: new FormControl('', [Validators.required]),
      potency: new FormControl(null, [Validators.required]),
      potencyUnits: new FormControl(null, [Validators.required]),
      medicineType: new FormControl(null, [Validators.required]),
      salt: new FormControl('', [Validators.required]),
      price: new FormControl(null, [Validators.required]),
      medicineBrandId: new FormControl(null, [Validators.required])
    })
    if (this.action === 'update' && this.medicine) {
      this.medicineForm.patchValue(
        {
          name: this.medicine.name,
          potency: this.medicine.potency,
          potencyUnits: this.medicine.potencyUnits,
          medicineType: this.medicine.medicineType,
          salt: this.medicine.salt,
          price: this.medicine.price,
          medicineBrandId: this.medicine.brandID,
        });
    }
  }

  getMedicineBrandDropDown() {
    this.medicineBrandService.getBrandsDropDown().subscribe({
      next: (x) => {
        this.brandList = x;
      }
    })
  }

  get f() { return this.medicineForm.controls; }

  submitMedicine() {
    let medicineToAdd: IMedicinerequest = {
      name: this.medicineForm.value.name,
      potency: this.medicineForm.value.potency,
      potencyUnits: this.medicineForm.value.potencyUnits,
      medicineType: this.medicineForm.value.medicineType,
      salt: this.medicineForm.value.salt,
      price: this.medicineForm.value.price,
      medicineBrandId: this.medicineForm.value.medicineBrandId
    }

    if (this.action === 'add') {
      this.medicineService.addMedicine(medicineToAdd).pipe(takeUntil(this.componetDestroyed)).subscribe({
        next: (x: any) => {
          this.alertService.success('Medicine added successfully', 'Success');
          this.medicineForm.reset();
          this.ref.close(true);
        },
        error: (err: any) => {
          this.alertService.error('An error occurred while adding medicine', 'Error');
        }
      })
    } else {
      this.medicineService.updateMedicine(this.medicine.id, medicineToAdd).pipe(takeUntil(this.componetDestroyed)).subscribe({
        next: (x: any) => {
          this.alertService.success('Medicine added successfully', 'Success');
          this.medicineForm.reset();
          this.ref.close(true);
        },
        error: (err: any) => {
          this.alertService.error('An error occurred while adding medicine', 'Error');
        }
      })
    }
  }
}
