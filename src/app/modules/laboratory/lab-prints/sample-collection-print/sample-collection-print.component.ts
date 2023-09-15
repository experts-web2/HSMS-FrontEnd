import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ILabInvoice } from 'src/app/models/interfaces/lab-Invoice';
import { IPatientSample } from 'src/app/models/interfaces/testSample';
import { PatientService, PatientTestService } from 'src/app/services';

@Component({
  selector: 'app-sample-collection-print',
  templateUrl: './sample-collection-print.component.html',
  styleUrls: ['./sample-collection-print.component.scss']
})
export class SampleCollectionPrintComponent implements OnInit{
  @ViewChild('') printArea?: ElementRef;

  invoice!: ILabInvoice;
  sampleItems!: Array<IPatientSample>;

  constructor(
    private readonly patientService: PatientService, 
    private readonly dialogRef: DynamicDialogRef, 
    private readonly dialogConfig: DynamicDialogConfig<{invoiceId: string, samples: Array<IPatientSample>}>,
    private readonly patientTestService: PatientTestService
  ){
    
  }

  ngOnInit(): void {
    if(this.dialogConfig.data){
      let {invoiceId, samples} = this.dialogConfig.data
      this.sampleItems = samples;
      this.getInvoice(invoiceId);
    }
  }

  getInvoice(invoiceId: string){
    this.patientTestService.getLabTestInvoiceById(invoiceId).subscribe({
      next: (x) => {
          this.invoice = x;
          console.log(this.invoice.invoiceItems);
          
      },
      error: (err) => {

      }
    })
  }

  print(){
    window.print()
  }

  getSampleId(testId: string): string{
    return this.sampleItems.find(x => x.testId === testId)?.sampleId ?? 'N/A'
  }

  close(){
    this.dialogRef.close()
  }
  
}
