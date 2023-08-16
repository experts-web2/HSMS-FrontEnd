import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { IDropDown } from 'src/app/models/interfaces/Dropdown';
import { IMedicinePurchase } from 'src/app/models/interfaces/MedicinePurchase';
import { ITableColumns } from 'src/app/models/interfaces/table-Columns';

@Component({
  selector: 'app-pharmacy-purchase-invoice',
  templateUrl: './pharmacy-purchase-invoice.component.html',
  styleUrls: ['./pharmacy-purchase-invoice.component.scss']
})
export class PharmacyPurchaseInvoiceComponent implements OnInit {
  billDate: Date = new Date();
  medicines: Array<any> = [];
  medicinePurchaseInvoice?: IMedicinePurchase;
  tableColumns: Array<ITableColumns> = [
    {name: 'Sr#', property: 'number'},
    {name: 'Medicine Name', property: 'name'},
    {name: 'Qty', property: 'quantity'},
    {name: 'Price', property: 'price'},
    {name: 'Total', property: 'total'},
  ];

  constructor(private readonly dialogRef: DynamicDialogRef, public readonly dialogConfig: DynamicDialogConfig<{invoice:IMedicinePurchase, medicines: Array<IDropDown>}>){
    this.medicinePurchaseInvoice = this.dialogConfig.data?.invoice;
    console.log(this.dialogConfig.data?.medicines);
    
    this.medicines = this.medicinePurchaseInvoice?.medicinePurchaseItems?.map((x, i) => {
      return {
        number: i + 1, 
        name: this.dialogConfig.data?.medicines.find(y => y.id === x.medicineId)?.name,
        quantity: x.unitsPerPack * x.packsQty,
        price: x.packPrice / x.unitsPerPack,
        total: x.packsQty * x.packPrice
      }
      }) ?? [];
  }

  ngOnInit(): void {
    
  }

  formatData(){
    
  }

  printScreen(){
    const printableSection = document.getElementById('printableSection');
    if (printableSection) {
      const popupWindow = window.open('', '_blank', 'width=800,height=600');
      if (popupWindow) {
        popupWindow.document.write(printableSection.innerHTML);
        popupWindow.document.close();
        popupWindow.print();
      }
    }
  }
}
