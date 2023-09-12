import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ILabInvoice } from 'src/app/models/interfaces/lab-Invoice';
import { PatientService, PatientTestService } from 'src/app/services';

@Component({
  selector: 'app-lab-invoice-print',
  templateUrl: './lab-invoice-print.component.html',
  styleUrls: ['./lab-invoice-print.component.scss']
})
export class LabInvoicePrintComponent implements OnInit{
  @ViewChild('') printArea?: ElementRef
  invoice!: ILabInvoice;

  constructor(
    private readonly patientService: PatientService, 
    private readonly dialogRef: DynamicDialogRef, 
    private readonly dialogConfig: DynamicDialogConfig<{invoiceId: string}>,
    private readonly patientTestService: PatientTestService
  ){
    
  }

  ngOnInit(): void {
    if(this.dialogConfig.data?.invoiceId){
      this.getInvoice(this.dialogConfig.data.invoiceId);
    }
  }

  getInvoice(invoiceId: string){
    this.patientTestService.getLabTestInvoiceById(invoiceId).subscribe({
      next: (x) => {
          this.invoice = x;
      },
      error: (err) => {

      }
    })
  }

  print(){

  }

  close(){
    this.dialogRef.close()
  }
  
}