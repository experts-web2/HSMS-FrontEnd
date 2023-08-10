import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
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

  constructor(private readonly dialogRef: DynamicDialogRef, public readonly dialogConfig: DynamicDialogConfig<IMedicinePurchase>){
    this.medicinePurchaseInvoice = this.dialogConfig.data;
  }

  ngOnInit(): void {
    
  }

  formatData(){
    
  }
}
