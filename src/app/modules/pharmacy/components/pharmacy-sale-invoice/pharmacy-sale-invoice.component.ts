import { Component, OnInit } from '@angular/core';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ITableColumns } from 'src/app/models/interfaces/table-Columns';
import { IMedicineSale } from '../../../../models/interfaces/MedicineSale';

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
    {name: 'Packs Qty', property: 'Packs Qty'},
    {name: 'Price', property: 'price'},
    {name: 'Total', property: 'total'},
  ];

  constructor(private readonly dialogRef: DynamicDialogRef, public readonly dialogConfig: DynamicDialogConfig<IMedicineSale>){
    this.medicineSaleinvoice = this.dialogConfig.data;
  }

  ngOnInit(): void {

  }

  closeDialog(){
    this.dialogRef.close();
  }

  formatData(){
    
  }

}
