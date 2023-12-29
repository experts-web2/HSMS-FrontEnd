import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { LabSaleColumns } from 'src/app/constants/Constants/labSaleInvoiceColumns';
import { ILabInvoice } from 'src/app/models/interfaces/lab-Invoice';
import { ITableColumns } from 'src/app/models/interfaces/table-Columns';
import { PatientService, PatientTestService } from 'src/app/services';

@Component({
  selector: 'app-lab-invoice-print',
  templateUrl: './lab-invoice-print.component.html',
  styleUrls: ['./lab-invoice-print.component.scss']
})
export class LabInvoicePrintComponent implements OnInit{
  @ViewChild('') printArea?: ElementRef;

  invoice!: ILabInvoice;
  columns: Array<ITableColumns> = LabSaleColumns;
  testsToShow: Array<{name: string, testCategoryName: string, price: number, sample: string}> = [];
  constructor(
    private readonly patientService: PatientService, 
    private readonly dialogRef: DynamicDialogRef, 
    private readonly dialogConfig: DynamicDialogConfig<{invoiceId: string}>,
    private readonly patientTestService: PatientTestService
  ){
    
  }

  ngOnInit(): void {
    console.log('this.dialogConfig.data', this.dialogConfig.data);
    if(this.dialogConfig.data){
      let { invoiceId } = this.dialogConfig.data;
      // this.invoice = invoice;
      this.getInvoice(invoiceId);
    }
  }

  getInvoice(invoiceId: string){
    this.patientTestService.getLabTestInvoiceById(invoiceId).subscribe({
      next: (x) => {
          this.invoice = x;
          console.log(this.invoice);
          this.testsToShow = x.invoiceItems.map(y => {
            return {
              name: y.labTest.name,
              testCategoryName: y.labTest.categoryName ?? '',
              price: y.labTest.price,
              sample: y.labTest.testSample
            }
          })
      },
      error: (err) => {

      }
    })
  }

  print(){
    window.print()
  }

  close(){
    this.dialogRef.close()
  }
  
}