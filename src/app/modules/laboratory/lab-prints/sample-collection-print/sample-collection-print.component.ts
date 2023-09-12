import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ILabInvoice } from 'src/app/models/interfaces/lab-Invoice';
import { ITestSample } from 'src/app/models/interfaces/test-samples';
import { PatientService, PatientTestService } from 'src/app/services';

@Component({
  selector: 'app-sample-collection-print',
  templateUrl: './sample-collection-print.component.html',
  styleUrls: ['./sample-collection-print.component.scss']
})
export class SampleCollectionPrintComponent implements OnInit{
  @ViewChild('') printArea?: ElementRef
  invoice!: ILabInvoice;

  constructor(
    private readonly patientService: PatientService, 
    private readonly dialogRef: DynamicDialogRef, 
    private readonly dialogConfig: DynamicDialogConfig<{invoiceId: string, samples: Array<ITestSample>}>,
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
