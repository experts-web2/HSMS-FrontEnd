import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { VendorService } from 'src/app/services';
import { IDropDown } from 'src/app/models/interfaces/Dropdown';

@Component({
  selector: 'app-pharmacy-purchase',
  templateUrl: './pharmacy-purchase.component.html',
  styleUrls: ['./pharmacy-purchase.component.scss']
})
export class PharmacyPurchaseComponent implements OnInit {

  purchaseMedicineForm!: FormGroup;
  vendors: Array<IDropDown> = [];
  vendorsToView: Array<IDropDown> = [];

  constructor(private readonly fb: FormBuilder, private readonly vendorService: VendorService){
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

  onVendorSelection(vendorId:string){
    this.purchaseMedicineForm.get('vendorId')?.setValue(vendorId);
  }

  getVendorsDropDown(){
    this.vendorService.getVendors().subscribe({
      next: (x) => {
        this.vendors = x;
      }
    })
  }


  onSearchVendor(event: any) {
    console.log(event.query);
    const query = event.query.trim().toLowerCase();
    this.vendorsToView = this.vendors.filter(
      (vendor) =>
        vendor.name.toLowerCase().includes(query)
    );
  }


  saveMedicine(){
    console.log(this.purchaseMedicineForm.value)
  }

}
