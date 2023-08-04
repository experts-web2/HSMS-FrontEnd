import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MedicineService, VendorService } from 'src/app/services';
import { IDropDown } from 'src/app/models/interfaces/Dropdown';
import { MedicineBrandService } from 'src/app/Services/medicine-brand/medicine-brand.service';

@Component({
  selector: 'app-pharmacy-purchase',
  templateUrl: './pharmacy-purchase.component.html',
  styleUrls: ['./pharmacy-purchase.component.scss']
})
export class PharmacyPurchaseComponent implements OnInit {

  purchaseMedicineForm!: FormGroup;
  vendors: Array<IDropDown> = [];
  vendorsToView: Array<IDropDown> = [];
  medicineList: Array<IDropDown> = [];
  medicineToView: Array<IDropDown> = [];
  brandList: Array<IDropDown> = [];
  brandToView: Array<IDropDown> = [];

  constructor(private readonly fb: FormBuilder,
    private readonly vendorService: VendorService,
    private readonly medicineService: MedicineService,
    private readonly medicineBrandService: MedicineBrandService,


  ) {
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

  get medicines(): FormArray {
    return this.purchaseMedicineForm.get('medicines') as FormArray;
  }

  ngOnInit(): void {
    this.getVendorsDropDown();
    this.getMedicineDropDown();
    this.getMedicineBrandDropDown();
  }

  addMedicine() {
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

  removeMedicine(index: number) {
    this.medicines.removeAt(index);
    if (this.medicines.length < 1) {
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

  onVendorSelection(vendorId: string) {
    this.purchaseMedicineForm.get('vendorId')?.setValue(vendorId);
  }
  onMedicineSelection(index: number, medicineId: string) {
    this.medicines.at(index).get('medicineId')?.setValue(medicineId);
  }
  onBrandSelection(index: number, brandId: string) {
    this.medicines.at(index).get('brandId')?.setValue(brandId);
  }

  getVendorsDropDown() {
    this.vendorService.getVendors().subscribe({
      next: (x) => {
        this.vendors = x;
      }
    })
  }

  getMedicineDropDown() {
    this.medicineService.getMedicineDropDown().subscribe({
      next: (x) => {
        this.medicineList = x;
      }
    })
  }
  getMedicineBrandDropDown() {
    this.medicineBrandService.getBrands().subscribe({
      next: (x) => {
        this.brandList = x;
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
  onSearchMedicine(event: any) {
    console.log(event.query);
    const query = event.query.trim().toLowerCase();
    this.medicineToView = this.medicineList.filter(
      (medicine) =>
        medicine.name.toLowerCase().includes(query)
    );
  }
  onSearchBrand(event: any) {
    console.log(event.query);
    const query = event.query.trim().toLowerCase();
    this.brandToView = this.brandList.filter(
      (medicine) =>
        medicine.name.toLowerCase().includes(query)
    );
  }


  saveMedicine() {
    console.log(this.purchaseMedicineForm.value)
  }

}
