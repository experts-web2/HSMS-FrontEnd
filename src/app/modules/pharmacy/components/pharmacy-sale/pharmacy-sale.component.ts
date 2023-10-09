import { Component, OnInit, Inject } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MedicineService, VendorService } from 'src/app/services';
import { IDropDown } from 'src/app/models/interfaces/Dropdown';
import { SubscriptionManagmentDirective } from 'src/app/shared/directive/subscription-managment.directive';
import { MedicineSaleService } from 'src/app/services/medicineSale/medicine-sale.service';
import { IMedicineSaleRequest } from 'src/app/models/interfaces/MedicineSale-Request';
import { DialogService } from 'primeng/dynamicdialog';
import { PharmacySaleInvoiceComponent } from '../pharmacy-sale-invoice/pharmacy-sale-invoice.component';
import { IMedicineSale } from 'src/app/models/interfaces/MedicineSale';
import { IMedicine } from 'src/app/models/interfaces/Medicine';
import { IFetchRequest } from 'src/app/models/interfaces/fetchTableRequest';
import { FiltersMatchModes } from 'src/app/constants/enums/FilterMatchModes';
import { PotencyUnits } from 'src/app/constants/enums/potency-units';
import { MedicineType } from 'src/app/constants/enums/Medicine-Type-Enum';
import { StockService } from 'src/app/services/stock/stock.service';
import { FiltersOperators } from 'src/app/constants/enums/FilterOperators';

@Component({
  selector: 'app-pharmacy-sale',
  templateUrl: './pharmacy-sale.component.html',
  styleUrls: ['./pharmacy-sale.component.scss']
})
export class PharmacySaleComponent extends SubscriptionManagmentDirective implements OnInit {

  currentDate: Date = new Date();
  saleMedicineForm!: FormGroup;
  vendorDropDowns: Array<IDropDown> = [];
  medicinesList: Array<IMedicine> = [];
  medicinesToShow: Array<IMedicine> = [];
  discountTypes: Array<{label: string, value: number}> = [{label: 'Amount', value: 1}, {label: 'Percentage %', value: 2}];


  constructor(
    private readonly fb: FormBuilder, 
    private readonly vendorService: VendorService, 
    private readonly medicineService: MedicineService, 
    private readonly medicineSaleService: MedicineSaleService, 
    private readonly dialogService: DialogService,
    private readonly stockService: StockService
  ){
    super();
    let initialMedicine = this.fb.group({
      medicineId: new FormControl<string | null>(null, [Validators.required]),
      unitQty: new FormControl<number | null>(1, [Validators.required]),
      unitPrice: new FormControl<number | null>(0, [Validators.required]),
      stock: new FormControl<number | null>(0, [Validators.required]),
    });

    this.saleMedicineForm = this.fb.group({
      customerName: new FormControl<string | null>(null, [Validators.required]),
      medicineSaleItems: this.fb.array([initialMedicine]),      
      disountType: new FormControl<number>(1, [Validators.required]),
      discountAmount: new FormControl<number | null>(0 ,[Validators.required]),
      totalAmount: new FormControl<number>(0, [Validators.required]),
      netTotalAmount: new FormControl<number>(0, [Validators.required]), 
      discountInp: new FormControl<number | null>(0, [Validators.required]) 
    })
  }

  get medicines(): FormArray{
    return this.saleMedicineForm.get('medicineSaleItems') as FormArray;
  }

  
  get discountType() : AbstractControl {
    return this.saleMedicineForm.get('disountType') as AbstractControl;
  }

  get totalAmount() : AbstractControl {
    return this.saleMedicineForm.get('totalAmount') as AbstractControl;
  }

  get netTotalAmount() : AbstractControl {
    return this.saleMedicineForm.get('netTotalAmount') as AbstractControl;
  }

  get discountAmount(): AbstractControl{
    return this.saleMedicineForm.get('discountAmount') as AbstractControl;
  }

  get discountInp(): AbstractControl{
    return this.saleMedicineForm.get('discountInp') as AbstractControl;
  }

  ngOnInit(): void {
    // this.getVendorsDropDown();
    this.getMedicine();

    this.discountType.valueChanges.subscribe({
      next: (x) => {
        this.calculate();
        this.discountAmountChange();
      }
    });

    this.medicines.valueChanges.subscribe({
      next: (x) => {
        this.calculate();
        this.discountAmountChange();
      }
    });
  }

  addMedicine(){ 
    let newMedicine = this.fb.group({
      medicineId: new FormControl<string | null>(null, [Validators.required]),
      unitQty: new FormControl<number | null>(1, [Validators.required]),
      unitPrice: new FormControl<number | null>(0, [Validators.required]),
      stock: new FormControl<number | null>(0, [Validators.required]),
    });

    this.medicines.push(newMedicine);
    
  }

  removeMedicine(index: number){
    this.medicines.removeAt(index);
    if(this.medicines.length < 1){
      let initialMedicine = this.fb.group({
        medicineId: new FormControl<string | null>(null, [Validators.required]),
        qty: new FormControl<number | null>(1, [Validators.required]),
        price: new FormControl<number | null>(0, [Validators.required]),
      });

      this.medicines.push(initialMedicine);

    }
  }

  getMedicine(query: IFetchRequest = {}){
    this.medicineService.getMedicine(query).subscribe({
      next: (x) => {
        this.medicinesList = x.data;
        this.medicinesToShow = x.data;
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

  saveMedicine(print: boolean = false) {
    console.log(JSON.stringify(this.saleMedicineForm.value));
    let saleInvoicePayload: IMedicineSaleRequest = this.saleMedicineForm.value;
    saleInvoicePayload.medicineSaleItems = this.medicines.value;
    this.medicineSaleService.addMedicineSaleInvoice(saleInvoicePayload).subscribe({
      next: (x) => {
        if(print) this.openDialog({invoice: x, medicines: this.medicinesList});
        this.saleMedicineForm.reset();

        for (let i = 0; i < this.medicines.length; i++) {
          this.medicines.removeAt(i);          
        }

        this.addMedicine()
      },
      error: (err: Error) => {

      }
    })
  }

  onMedicineSelection(index: number, medicine: IMedicine) {
    this.medicines.at(index).get('medicineId')?.setValue(medicine.id);
    this.medicines.at(index).get('unitPrice')?.setValue(medicine.price);
    
    let stockRequest: IFetchRequest = {
      pagedListRequest: {
        pageNo: 1,
        pageSize: 100,
      },
      queryOptionsRequest:{
        filtersRequest: [
          {
            field: 'MedicineId',
            value: medicine.id,
            matchMode: FiltersMatchModes.Equal
          },
          
        ]
      }
    };

    this.stockService.getStockDetails(stockRequest).subscribe({
      next: (x) => {
        console.log(x.data);
        
      },
      error: (err) => {

      }
    })
  }

  onSearchMedicine(event: any) {
    const query = event.query.trim().toLowerCase();

    let request: IFetchRequest = {
      pagedListRequest:{
        pageNo: 1,
        pageSize: 100
      },
      queryOptionsRequest:{
        filtersRequest:[
          {
            field: 'Name',
            matchMode: FiltersMatchModes.Contains,
            value: query,
            ignoreCase: true,
            operator: FiltersOperators.Or
          },
          {
            field: 'Salt',
            matchMode: FiltersMatchModes.Contains,
            value: query,
            ignoreCase: true,
            operator: FiltersOperators.Or
          }
        ]
      }
    }
    this.getMedicine(request)
    
  }

  packsQtyChnage(value: any, index: number){
    console.log({value, index});
    
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

  unitsInPackChange(value: any, index: number){
    console.log({value, index});
    
  }
  
  calculate(){
    let totalBill = 0;
     this.medicines.value.forEach((x: any) => {
      totalBill += x.unitPrice * x.unitQty;      
     });

     this.totalAmount.setValue(totalBill);
     this.netTotalAmount.setValue(this.totalAmount.value - this.discountAmount.value)
  }

  getPotencyUnit(potency: number): string{
    return PotencyUnits[potency];
  }

  getMedicineType(potency: number): string{
    return MedicineType[potency];
  }

  openDialog(data: {invoice: IMedicineSale, medicines: Array<IDropDown>}){
    this.dialogService.open(PharmacySaleInvoiceComponent,{
      width: '60%',
      height: '90%',
      data: data
    });
  }
}