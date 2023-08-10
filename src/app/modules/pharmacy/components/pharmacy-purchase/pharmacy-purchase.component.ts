import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MedicineService, VendorService, MedicineBrandService } from 'src/app/services';
import { IDropDown } from 'src/app/models/interfaces/Dropdown';
import { takeUntil } from 'rxjs';
import { SubscriptionManagmentDirective } from 'src/app/shared/directive/subscription-managment.directive';
import { MedicinePurchaseService } from 'src/app/services/medicinePurchase/medicine-purchase.service';
import { IMedicinePurchaseRequest } from 'src/app/models/interfaces/MedicinePurchase-request';

@Component({
  selector: 'app-pharmacy-purchase',
  templateUrl: './pharmacy-purchase.component.html',
  styleUrls: ['./pharmacy-purchase.component.scss']
})
export class PharmacyPurchaseComponent extends SubscriptionManagmentDirective implements OnInit {

  purchaseMedicineForm!: FormGroup;
  vendors: Array<IDropDown> = [];
  vendorsToView: Array<IDropDown> = [];
  medicinesList!: Array<IDropDown>;
  medicinesToShow!: Array<IDropDown>;
  medicineToView: Array<any> = [];
  brandToView: Array<IDropDown> = [];
  medicineList: Array<any> = [];
  brandList: Array<IDropDown> = [];
  discountTypes: Array<{label: string, value: number}> = [{label: 'Amount', value: 1}, {label: 'Percentage %', value: 2}];

  constructor(private readonly fb: FormBuilder, private readonly vendorService: VendorService, private readonly medicineService: MedicineService, private readonly medicaineBrandService: MedicineBrandService, private readonly medicinePurchaseService: MedicinePurchaseService){
    super();
    let initialMedicine = this.fb.group({
      medicineId: new FormControl<string | null>(null, [Validators.required]),
      packsQty: new FormControl<number | null>(0, [Validators.required]),
      unitsPerPack: new FormControl<number | null>(1, [Validators.required]),
      packPrice: new FormControl<number | null>(0, [Validators.required]),
      unitPrice: new FormControl<number | null>(0, [Validators.required]),
      brandId: new FormControl<string | null>(null, [Validators.required]),
      mfgDate: new FormControl<Date | null>(null, [Validators.required]),
      expDate: new FormControl<Date | null>(null, [Validators.required]),
    });

    initialMedicine.controls['unitPrice'].disable({onlySelf: true});

    this.purchaseMedicineForm = this.fb.group({
      vendorId: new FormControl<string | null>(null, [Validators.required]),
      medicinePurchaseItems: this.fb.array([initialMedicine]),
      disountType: new FormControl<number>(1, [Validators.required]),
      discountAmount: new FormControl<number | null>(0 ,[Validators.required]),
      totalAmount: new FormControl<number>(0, [Validators.required]),
      netTotalAmount: new FormControl<number>(0, [Validators.required]), 
      discountInp: new FormControl<number | null>(null, [Validators.required]) 
    })
  }

  get medicines(): FormArray {
    return this.purchaseMedicineForm.get('medicinePurchaseItems') as FormArray;
  }

  get discountType() : AbstractControl {
    return this.purchaseMedicineForm.get('disountType') as AbstractControl;
  }

  get totalAmount() : AbstractControl {
    return this.purchaseMedicineForm.get('totalAmount') as AbstractControl;
  }

  get netTotalAmount() : AbstractControl {
    return this.purchaseMedicineForm.get('netTotalAmount') as AbstractControl;
  }

  get discountAmount(): AbstractControl{
    return this.purchaseMedicineForm.get('discountAmount') as AbstractControl;
  }

  get discountInp(): AbstractControl{
    return this.purchaseMedicineForm.get('discountInp') as AbstractControl;
  }

  ngOnInit(): void {
    this.getVendorsDropDown();
    this.getMedicineDropDown();
    this.getBrandsDropDown();

    this.discountType.valueChanges.subscribe({
      next: (x) =>{
        this.calculate();
        this.discountAmountChange();
      }
    });

    this.medicines.valueChanges.subscribe({
      next: (x) => {
      this.calculate();
      this.discountAmountChange();
  
      }
    })
  }

  addMedicine() {
    let initialMedicine = this.fb.group({
      medicineId: new FormControl<string | null>(null, Validators.required),
      packsQty: new FormControl<number | null>(0, Validators.required),
      unitsPerPack: new FormControl<number | null>(1, Validators.required),
      packPrice: new FormControl<number | null>(0, Validators.required),
      unitPrice: new FormControl<number | null>(0, Validators.required),
      brandId: new FormControl<string | null>(null, Validators.required),
      mfgDate: new FormControl<Date | null>(null, Validators.required),
      expDate: new FormControl<Date | null>(null, Validators.required),
    });
    initialMedicine.controls['unitPrice'].disable({onlySelf: true});
    this.medicines.push(initialMedicine);

  }

  removeMedicine(index: number) {
    this.medicines.removeAt(index);
    if (this.medicines.length < 1) {
      let initialMedicine = this.fb.group({
        medicineId: new FormControl<string | null>(null, Validators.required),
        packsQty: new FormControl<number | null>(0, Validators.required),
        unitsPerPack: new FormControl<number | null>(1, Validators.required),
        packPrice: new FormControl<number | null>(0, Validators.required),
        unitPrice: new FormControl<number | null>(0, Validators.required),
        brandId: new FormControl<string | null>(null, Validators.required),
        mfgDate: new FormControl<Date | null>(null, Validators.required),
        expDate: new FormControl<Date | null>(null, Validators.required),
      });
      initialMedicine.controls['unitPrice'].disable({onlySelf: true});

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

  discountAmountChange(){
    let disc = this.discountInp.value;
    let discAmt = 0;
    
    if (this.discountType.value === 1){
      discAmt = disc;
    } else {
      discAmt = (this.totalAmount.value / 100) * disc;
    }

    this.discountAmount.setValue(discAmt);
    this.calculate();
  }

  // discountTypeChange(){
  //   console.log(this.discountType.value);
    
  //   let disc = this.discountInp.value;
  //   let discAmt = 0;
    
  //   if (this.discountType.value === 1){
  //     discAmt = disc;
  //   } else {
  //     discAmt = (this.totalAmount.value / 100) * disc;
  //   }

  //   this.discountAmount.setValue(discAmt);
  //   this.calculate();
  // }

  getVendorsDropDown() {
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

  onSearchMedicine(event: any) {
    const query = event.query.trim().toLowerCase();
    this.medicineToView = this.medicinesList.filter(
      (medicine) =>
        medicine.name.toLowerCase().includes(query)
    );
    
  }

  onSearchBrand(event: any) {
    const query = event.query.trim().toLowerCase();
    this.brandToView = this.brandList.filter(
      (medicine) =>
        medicine.name.toLowerCase().includes(query)
    );
    
  }

  getMedicineDropDown(){
    this.medicineService.getMedicineDropDown().pipe(takeUntil(this.componetDestroyed)).subscribe({
      next: (x) => {
        this.medicinesList = x;
        this.medicinesToShow = x;

      },
      error: (err: Error)=>{

      }
    })
  }

  getBrandsDropDown(){
    this.medicaineBrandService.getBrandsDropDown().subscribe({
      next: (x) => {
        this.brandList = x;
      },
      error: (err: Error) => {

      }
    })
  }

  saveMedicine() {
    console.log(JSON.stringify(this.purchaseMedicineForm.value));
    let purchaseInvoicePayload: IMedicinePurchaseRequest = this.purchaseMedicineForm.value;
    this.medicinePurchaseService.addMedicinePurchaseInvoice(purchaseInvoicePayload).subscribe({
      next: (x) => {

      },
      error: (err: Error) => {

      }
    })
  }

  packsQtyChnage(value: any, index: number){
    this.calculateUnitPrice(index);    
  } 

  calculatePriceAndMedicineUnits(index: number){
    let medicine = this.medicines.at(index);
    let packsQty = medicine.get('packsQty')?.value
    
    let unitsPerPack = medicine.get('unitsPerPack')?.value
    // let packsQty = medicine.get('packsQty')?.value
    // let packsQty = medicine.get('packsQty')?.value
    this.calculateUnitPrice(index);

  }

  unitsInPackChange(value: any, index: number){
    this.calculateUnitPrice(index);    
  }

  packPriceChange(packPrice: any, index: number){
    this.calculateUnitPrice(index);   
    this.calculate(); 
  }

  calculateUnitPrice(index: number){
    let selectedMedicine = this.medicines.at(index);    
    let unitsPerPack = selectedMedicine.get('unitsPerPack')?.value;
    let pricePerPack = selectedMedicine.get('packPrice')?.value;
    selectedMedicine.get('unitPrice')?.setValue((pricePerPack / unitsPerPack));
  }

  calculate(){
    let totalBill = 0;
     this.medicines.value.forEach((x: any) => {
      totalBill+= x.packsQty * x.packPrice;
      
     });

     this.totalAmount.setValue(totalBill);
     this.netTotalAmount.setValue(this.totalAmount.value - this.discountAmount.value)
  }
}
