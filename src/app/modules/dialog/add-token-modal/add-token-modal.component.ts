import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PatientService } from 'src/app/Services/patient/patient.service';
import { DoctorService } from '../../../Services/doctor.service';
import { TokenTypes } from '../../../constants/Constants/TokenTypes';
import { IDoctor } from 'src/app/models/interfaces/Doctor';

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
  doctors: Array<IDoctor> = [];
  tokentypes: Array<{value: TokenTypes, label: string}> = [
    {
      label: 'Doctor',
      value: TokenTypes.Doctor
    },
    {
      label: 'Lab Test',
      value: TokenTypes.Lab
    },
    {
      label: 'Radiology',
      value: TokenTypes.Radiology
    },
    {
      label: 'Sonology',
      value: TokenTypes.Sonology
    },
    {
      label: 'Therapy',
      value: TokenTypes.Therapy
    },
  ]
  discountTypes = [
    {
      label: 'Amount',
      value: 1
    }, {
      label: '%',
      value: 2
    }
  ]
  dropDown!: Array<{ id: number, label: string }>
  patients = [];

  paymentType = [{ id: 'Cash', label: 'Cash' }, { id: 'Card', label: 'Card' }, { id: 'Cash', label: 'Cheque' }, { id: 'Online', label: 'Online Payment' }]

  constructor(public dialogRef: MatDialogRef<AddTokenModalComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private readonly patientService: PatientService, private readonly fb: FormBuilder, private readonly doctorService: DoctorService) {
    this.invoiceDescriptionForm = this.fb.group({
      paidAmount: new FormControl<number | null>(null, [Validators.required]),
      discountAmount: new FormControl<number | null>(null, [Validators.required]),
      discountType: new FormControl<number | null>(1, [Validators.required]),
      treatmentId: new FormControl<string| null>(null, [Validators.required]),
      othersType: new FormControl<number | null>(null),
      othersName: new FormControl<string | null>(null)
    })

    this.addTokenForm = this.fb.group({
      patientId: new FormControl<string | null>(null, [Validators.required]),
      tokenTypes: new FormControl<TokenTypes | null>(null, [Validators.required]),
      doctorId: new FormControl<string | null>(null, [Validators.required]),
      totalDiscount: new FormControl<number | null>(null, [Validators.required]),
      paymentType: new FormControl<number | null>(null, [Validators.required]),
      amountPaid: new FormControl<number | null>(null, [Validators.required]),
      grandTotal: new FormControl<number | null>(null, [Validators.required]),
      pulseHeartRate: new FormControl<number | null>(null, [Validators.required]),
      temperature: new FormControl<number | null>(null, [Validators.required]),
      bloodPressure: new FormControl<string | null>(null, [Validators.required]),
      respiratoryRate: new FormControl<number  | null>(null, [Validators.required]),
      bloodSugar: new FormControl<number | null>(null, [Validators.required]),
      weight: new FormControl<number | null>(null, [Validators.required]),
      height: new FormControl<number | null>(null, [Validators.required]),
      bodyMassIndex: new FormControl<number | null>(null, [Validators.required]),
      bodySurfaceArea: new FormControl<number | null>(null, [Validators.required]),
      oxygenSaturation: new FormControl<number | null>(null, [Validators.required]),
      payment_notification: new FormControl<boolean | null>(null, [Validators.required]),
      patientCheckedIn: new FormControl<boolean | null>(null, [Validators.required]),
      confirmation: new FormControl('', [Validators.required]),
      invoiceItems: this.fb.array([this.invoiceDescriptionForm]),
    });

  }

  get invoiceItems(): FormArray {
    return this.addTokenForm.get('invoiceItems') as FormArray;
  }

  ngOnInit(): void { 
    this.getDoctors();
   }

  cancel() {
    this.dialogRef.close();
  }

  getDoctors(){
    this.doctorService.getDoctors().subscribe({
      next: (x) => {
        console.log(x);
        
        this.doctors = x.data;
      },
      error: (err) => {
        
      }
    })
  }


  addToken() {
    console.log(this.addTokenForm.value)
  }

  addNewInvoiceItem() {
    let newForm = this.fb.group({
      paidAmount: new FormControl<number | null>(null, [Validators.required]),
      discountAmount: new FormControl<number | null>(null, [Validators.required]),
      discountType: new FormControl<number | null>(1, [Validators.required]),
      treatmentId: new FormControl<string| null>(null, [Validators.required]),
      othersType: new FormControl<number | null>(null),
      othersName: new FormControl<string | null>(null)
    })
    this.invoiceItems.push(newForm)
  }

  removeinvoiceItem(index: number) {
    this.invoiceItems.removeAt(index);
    let newForm = this.fb.group({
      paidAmount: new FormControl<number | null>(null, [Validators.required]),
      discountAmount: new FormControl<number | null>(null, [Validators.required]),
      discountType: new FormControl<number | null>(1, [Validators.required]),
      treatmentId: new FormControl<string| null>(null, [Validators.required]),
      othersType: new FormControl<number | null>(null),
      othersName: new FormControl<string | null>(null)
    })
    if(this.invoiceItems.length < 1) this.invoiceItems.push(newForm)
  }



}
