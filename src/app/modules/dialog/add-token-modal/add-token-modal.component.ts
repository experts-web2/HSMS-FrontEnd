import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PatientService } from 'src/app/Services/patient/patient.service';
import { DoctorService } from '../../../Services/doctor.service';

@Component({
  selector: 'app-add-token-modal',
  templateUrl: './add-token-modal.component.html',
  styleUrls: ['./add-token-modal.component.scss']
})
export class AddTokenModalComponent implements OnInit {
  selectedDoctor = ''
  selectedPayment = ''
  addTokenForm!: FormGroup;
  invoiceDescriptionForm!: FormGroup;
  doctors = [];
  discountTypes = [
    {
      label: 'Amount',
      value: 1
    }, {
      label: '%',
      value: 2
    }
  ]
  discriptions: Array<{ id: number, label: string }> = [
    {
      id: 1,
      label: 'Doctor Visit'
    },
    {
      id: 2,
      label: 'Lab Test'
    },
    {
      id: 3,
      label: 'Radiology'
    },
    {
      id: 4,
      label: 'Sonology'
    },
  ];
  patients = [];

  paymentType = [{ id: 'Cash', label: 'Cash' }, { id: 'Card', label: 'Card' }, { id: 'Cash', label: 'Cheque' }, { id: 'Online', label: 'Online Payment' }]

  constructor(public dialogRef: MatDialogRef<AddTokenModalComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private readonly patientService: PatientService, private readonly fb: FormBuilder, private readonly doctorService: DoctorService) {
    this.invoiceDescriptionForm = this.fb.group({
      amount: new FormControl('', [Validators.required]),
      discount: new FormControl('', [Validators.required]),
      discountType: new FormControl(1, [Validators.required])
    })

    this.addTokenForm = this.fb.group({
      patient: new FormControl('', [Validators.required, Validators.minLength(4)]),
      token: new FormControl('', [Validators.required, Validators.minLength(4)]),
      doctor: new FormControl('', [Validators.required]),
      pulse_rate: new FormControl('', [Validators.required, Validators.email, Validators.pattern('[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z, A-Z]{2,3}')]),
      temperature: new FormControl('', [Validators.required, Validators.minLength(11)]),
      bp: new FormControl('', [Validators.required]),
      respiratory: new FormControl('', [Validators.required]),
      sugar: new FormControl('', [Validators.required]),
      weight: new FormControl('', [Validators.required]),
      height: new FormControl('', [Validators.required]),
      bmi: new FormControl('', [Validators.required]),
      bsa: new FormControl('', [Validators.required]),
      saturation: new FormControl('', [Validators.required]),
      total_discount: new FormControl('', [Validators.required]),
      payment_notification: new FormControl('', [Validators.required]),
      checked_in: new FormControl('', [Validators.required]),
      confirmation: new FormControl('', [Validators.required]),
      invoiceItems: this.fb.array([]),
    });

  }

  get invoiceItems(): FormArray {
    return this.addTokenForm.get('invoiceItems') as FormArray;
  }

  ngOnInit(): void { }

  cancel() {
    this.dialogRef.close();
  }

  getDoctors(){
    this.doctorService
  }


  addToken() {
    console.log(this.addTokenForm.value)
  }

  addNewInvoiceItem() {
    const newInvoiceForm = this.fb.group({
      amount: new FormControl('', [Validators.required]),
      discount: new FormControl('', [Validators.required]),
      discountType: new FormControl(1, [Validators.required])

    })
    this.invoiceItems.push(newInvoiceForm)
  }

  removeinvoiceItem(index: number) {
    this.invoiceItems.removeAt(index);
  }

  addInvoice(checked: boolean) {
    if (checked) {
      const newInvoiceForm = this.fb.group({
        amount: new FormControl('', [Validators.required]),
        discount: new FormControl('', [Validators.required]),
        discountType: new FormControl(1, [Validators.required])

      })
      this.invoiceItems.push(newInvoiceForm)
    } else {
      this.invoiceItems.setValue([]);
    }
  }

}
