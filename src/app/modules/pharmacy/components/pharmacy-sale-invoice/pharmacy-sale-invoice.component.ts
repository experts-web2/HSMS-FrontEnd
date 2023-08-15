import { Component, OnInit } from '@angular/core';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ITableColumns } from 'src/app/models/interfaces/table-Columns';
import { IMedicineSale } from '../../../../models/interfaces/MedicineSale';
import { IDropDown } from 'src/app/models/interfaces/Dropdown';

@Component({
  selector: 'app-pharmacy-sale-invoice',
  templateUrl: './pharmacy-sale-invoice.component.html',
  styleUrls: ['./pharmacy-sale-invoice.component.scss']
})
export class PharmacySaleInvoiceComponent implements OnInit {
  billDate: Date = new Date();
  medicines: Array<any> = [];
  medicineSaleinvoice?: IMedicineSale;
  tableColumns: Array<ITableColumns> = [
    {name: 'Sr#', property: 'number'},
    {name: 'Medicine Name', property: 'name'},
    {name: 'Qty', property: 'quantity'},
    {name: 'Price', property: 'price'},
    {name: 'Total', property: 'total'},
  ];

  constructor(private readonly dialogRef: DynamicDialogRef, public readonly dialogConfig: DynamicDialogConfig<{invoice: IMedicineSale, medicines: Array<IDropDown>}>){
    this.medicineSaleinvoice = this.dialogConfig.data?.invoice;
    this.medicines = this.medicineSaleinvoice?.medicineSaleItemsResponse?.map((x, i) => {
      return {
        number: i+1,
        name: this.dialogConfig.data?.medicines.find((y) => y.id === x.medicineId)?.name,
        quantity: x.unitQty,
        price: x.unitPrice,
        total: x.unitPrice * x.unitQty
      }
    }) ?? []
  }

  ngOnInit(): void {

  }

  closeDialog(){
    this.dialogRef.close();
  }

  formatData(){
    
  }

  print(){
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
