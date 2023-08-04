import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MedicineService, VendorService } from 'src/app/services';
import { IDropDown } from 'src/app/models/interfaces/Dropdown';
import { SubscriptionManagmentDirective } from 'src/app/shared/directive/subscription-managment.directive';

@Component({
  selector: 'app-pharmacy-sale',
  templateUrl: './pharmacy-sale.component.html',
  styleUrls: ['./pharmacy-sale.component.scss']
})
export class PharmacySaleComponent extends SubscriptionManagmentDirective implements OnInit {

  purchaseMedicineForm!: FormGroup;
  vendorDropDowns: Array<IDropDown> = [];
  medicinesList: Array<IDropDown> = [];
  medicinesToShow: Array<IDropDown> = [];


  constructor(private readonly fb: FormBuilder, private readonly vendorService: VendorService, private readonly medicineService: MedicineService){
    super();
    let initialMedicine = this.fb.group({
      medicineId: new FormControl<string | null>(null, [Validators.required]),
      packsQty: new FormControl<number | null>(null, [Validators.required]),
      unitsPerPack: new FormControl<number | null>(null, [Validators.required]),
      packPrice: new FormControl<number | null>(null, [Validators.required]),
      unitPrice: new FormControl<number | null>(null, [Validators.required]),
      brandId: new FormControl<string | null>(null, [Validators.required]),
      mfgDate: new FormControl<Date | null>(null, [Validators.required]),
      expDate: new FormControl<Date | null>(null, [Validators.required]),
    });

    this.purchaseMedicineForm = this.fb.group({
      vendorId: new FormControl<string | null>(null, [Validators.required]),
      medicines: this.fb.array([initialMedicine])
    })
  }

  get medicines(): FormArray{
    return this.purchaseMedicineForm.get('medicines') as FormArray;
  }

  ngOnInit(): void {
    this.getVendorsDropDown();
    this.getMedicineDropDown();
  }

  addMedicine(){
    let initialMedicine = this.fb.group({
      medicineId: new FormControl<string | null>(null, Validators.required),
      packsQty: new FormControl<number | null>(null, Validators.required),
      unitsPerPack: new FormControl<number | null>(null, Validators.required),
      packPrice: new FormControl<number | null>(null, Validators.required),
      unitPrice: new FormControl<number | null>(null, Validators.required),
      brandId: new FormControl<string | null>(null, Validators.required),
      mfgDate: new FormControl<Date | null>(null, Validators.required),
      expDate: new FormControl<Date | null>(null, Validators.required),
    });

    this.medicines.push(initialMedicine);
    
  }

  removeMedicine(index: number){
    this.medicines.removeAt(index);
    if(this.medicines.length < 1){
      let initialMedicine = this.fb.group({
        medicineId: new FormControl<string | null>(null, Validators.required),
        packsQty: new FormControl<number | null>(null, Validators.required),
        unitsPerPack: new FormControl<number | null>(null, Validators.required),
        packPrice: new FormControl<number | null>(null, Validators.required),
        unitPrice: new FormControl<number | null>(null, Validators.required),
        brandId: new FormControl<string | null>(null, Validators.required),
        mfgDate: new FormControl<Date | null>(null, Validators.required),
        expDate: new FormControl<Date | null>(null, Validators.required),
      });

      this.medicines.push(initialMedicine);

    }
  }

  getMedicineDropDown(){
    this.medicineService.getMedicineDropDown().subscribe({
      next: (x) => {
        this.medicinesList = x;
        this.medicinesToShow = x;
      }
    })
  }

  getVendorsDropDown(){
    this.vendorService.getVendors().subscribe({
      next: (x) => {
        this.vendorDropDowns = x;
      }
    })
  }

  saveMedicine() {
    console.log(this.purchaseMedicineForm.value)
  }

  packsQtyChnage(value: any, index: number){
    console.log({value, index});
    
  }

  unitsInPackChange(value: any, index: number){
    console.log({value, index});
    
  }

}