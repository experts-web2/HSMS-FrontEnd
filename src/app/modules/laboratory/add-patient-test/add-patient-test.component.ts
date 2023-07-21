import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DoctorService } from 'src/app/Services/doctor.service';
import { PatientService } from 'src/app/Services/patient/patient.service';
import { TestService } from 'src/app/Services/test-service/test.service';
import { PaymentTypes } from 'src/app/constants/enums/PaymenTypes';
import { IDropDown } from 'src/app/models/interfaces/Dropdown';
import { IInvoice, IInvoiceItem } from 'src/app/models/interfaces/addOrUpdate-Token';

@Component({
  selector: 'app-add-patient-test',
  templateUrl: './add-patient-test.component.html',
  styleUrls: ['./add-patient-test.component.scss']
})
export class AddPatientTestComponent implements OnInit {
  selectedDoctor = ''
  selectedPayment = ''
  addPatientTestForm!: FormGroup;
  invoiceDescriptionForm!: FormGroup;
  doctors: Array<IDropDown> = [];
  tests: Array<IDropDown> = [];
  radiology: Array<IDropDown> = [];
  descriptions: Array<any> = [];
  
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
  patients: Array<IDropDown> = [];
  patientsToShow: Array<IDropDown> = [];

  paymentType: Array<{ id: number, label: string }> = [{ id: PaymentTypes.Cash, label: 'Cash' }, { id: PaymentTypes.DebitCreditCard, label: 'Card' }, { id: PaymentTypes.OnlinePayment, label: 'Online Payment' }, { id: PaymentTypes.Cheque, label: 'Cheque' }]
  testPriority: Array<{ value: string, label: string }> = [{ value: 'Routine', label: 'Routine' }, { value: 'Urgent', label: 'Urgent' }]

  constructor(
    private readonly patientService: PatientService,
    private readonly fb: FormBuilder,
    private readonly doctorService: DoctorService,
    private readonly testService: TestService) {

    this.invoiceDescriptionForm = this.fb.group({
      paidAmount: new FormControl<number | null>(null, [Validators.required]),
      description: new FormControl<number | null>(null, [Validators.required]),
      discountAmount: new FormControl<number | null>(0, [Validators.required]),
      discountType: new FormControl<number | null>(1, [Validators.required]),
      patientId: new FormControl<string | null>(null, [Validators.required]),
      testId: new FormControl<string | null>(null, [Validators.required]),
      completionDate: new FormControl<string | null>(null, [Validators.required]),
      othersType: new FormControl<number | null>(null),
      othersName: new FormControl<string | null>(null)
    })
    this.addPatientTestForm = this.fb.group({
      doctorId: new FormControl<string | null>(null, [Validators.required]),
      totalDiscount: new FormControl<number | null>(0, [Validators.required]),
      paymentType: new FormControl<number | null>(1, [Validators.required]),
      amountPaid: new FormControl<number | null>(null, [Validators.required]),
      grandTotal: new FormControl<number | null>(0.00, [Validators.required]),
      priority: new FormControl<string | null>('Routine', [Validators.required]),
      invoiceNote: new FormControl<string | null>(null, [Validators.required]),
      invoiceItems: this.fb.array([this.invoiceDescriptionForm]),
    });

  }

  get invoiceItems(): FormArray {
    return this.addPatientTestForm.get('invoiceItems') as FormArray;
  }

  ngOnInit(): void {
    this.getDoctors();
    this.getPatients();
    this.getTests();
  }

  getDoctors() {
    this.doctorService.getDoctorDropDown().subscribe({
      next: (x) => {
        this.doctors = x;
      },
      error: (err) => {

      }
    })
  }

  getTests() {
    this.testService.getTests().subscribe({
      next: (x) => {
        console.log(x);
        this.tests = x.data;
          this.descriptions = this.tests;
      },
      error: (err) => {

      }
    })
  }

  getPatients() {
    this.patientService.getPatientDropDown().subscribe({
      next: (x) => {
        this.patients = x;
        this.patientsToShow = x;
      },
      error: (err) => {

      }
    })
  }

  onDescriptionSelect(index: number, descriptionId: string) {
    let description = this.descriptions.find(x => x.id === descriptionId);
    this.invoiceItems.at(index).get('paidAmount')?.setValue(description?.price);
    this.invoiceItems.at(index).get('description')?.setValue(description?.description);
    this.calculate()

  }

  

  patientSelect(index:number,patient: any) {
    console.log('patient',patient);
    // this.invoiceItems.at(index).get('patientId')?.setValue(description?.price);

    this.addPatientTestForm.get('patientId')?.setValue(patient.id);
    this.addPatientTestForm.get('patientName')?.setValue(patient.name);
  }

  searchPatient(query: string) {
    let text = query.toLowerCase();
    this.patientsToShow = this.patients.filter(x => x.name.toLowerCase().includes(text));
  }

  addToken() {
    console.log(this.addPatientTestForm.value)
    if (this.addPatientTestForm.controls['amountPaid']?.value && this.invoiceItems.valid) {
      
      // let tokenpayload = {
      //   patientId: this.addPatientTestForm.controls['patientId'].value,
      //   doctorId: this.addPatientTestForm.controls['doctorId'].value,
      //   patientCheckedIn: this.addPatientTestForm.controls['patientCheckedIn'].value ? this.addPatientTestForm.controls['patientCheckedIn'].value : true
      // }
      // console.log('tokenpayload',tokenpayload);
      // this.tokenService.addToken(tokenpayload).subscribe({
      //   next: (x) => {
      //     console.log(x);


      //   },
      //   error: (err) => {

      //   }
      // })
    }else{
      console.log('please add paid amount')
    }

  }

  getInvoice(): IInvoice {
    let invoice: IInvoice = {
      amountPaid: this.addPatientTestForm.controls['amountPaid'].value,
      paymentType: this.addPatientTestForm.controls['paymentType'].value,
      invoiceItems: this.invoiceItems.value.map((x: any) => {
        let invoiceItem = {
          testId: x.testId,
          completionDate: x.completionDate,
          patientId: x.patientId,
          paidAmount: x.paidAmount,
          description: x.description,
          discountAmount: x.discountAmount,
          discountType: x.discountType,
          othersType: x.othersType,
          othersName: x.othersName
        }
        return invoiceItem
      }),
      totalDiscount: this.addPatientTestForm.controls['totalDiscount'].value,
      grandTotal: this.addPatientTestForm.controls['grandTotal'].value
    }
    return invoice;
  }

  addNewInvoiceItem() {
    let newForm = this.fb.group({
      paidAmount: new FormControl<number | null>(null, [Validators.required]),
      description: new FormControl<number | null>(null, [Validators.required]),
      discountAmount: new FormControl<number | null>(null, [Validators.required]),
      discountType: new FormControl<number | null>(1, [Validators.required]),
      testId: new FormControl<string | null>(null, [Validators.required]),
      completionDate: new FormControl<string | null>(null, [Validators.required]),
      patientId: new FormControl<string | null>(null, [Validators.required]),
      othersType: new FormControl<number | null>(null),
      othersName: new FormControl<string | null>(null)
    })
    this.invoiceItems.push(newForm)
  }

  removeinvoiceItem(index: number) {
    this.invoiceItems.removeAt(index);
    let newForm = this.fb.group({
      paidAmount: new FormControl<number | null>(null, [Validators.required]),
      description: new FormControl<number | null>(null, [Validators.required]),
      discountAmount: new FormControl<number | null>(null, [Validators.required]),
      discountType: new FormControl<number | null>(1, [Validators.required]),
      testId: new FormControl<string | null>(null, [Validators.required]),
      completionDate: new FormControl<string | null>(null, [Validators.required]),
      patientId: new FormControl<string | null>(null, [Validators.required]),
      othersType: new FormControl<number | null>(null),
      othersName: new FormControl<string | null>(null)
    })
    if (this.invoiceItems.length < 1) this.invoiceItems.push(newForm);
    this.calculate()
  }

  calculate(index?: number) {
    let totalDiscount = this.addPatientTestForm.get('totalDiscount');
    let amountPaid = this.addPatientTestForm.get('amountPaid');
    let grandTotal = this.addPatientTestForm.get('grandTotal');
    let totalGrandTotal = 0;
    let totalDiscountTotal = 0;
    for (let invItem of this.invoiceItems.controls) {
      let amount = invItem.get('paidAmount')?.value;
      let discountType = invItem.get('discountType')?.value;
      console.log(discountType);
      let discount = !invItem.get('discountAmount')?.value || invItem.get('discountAmount')?.value === 0 ? 0 : discountType === 1 ? invItem.get('discountAmount')?.value : (invItem.get('discountAmount')?.value / 100) * amount;
      totalGrandTotal += amount;
      totalDiscountTotal += discount;
    }
    totalDiscount?.setValue(totalDiscountTotal);
    grandTotal?.setValue(totalGrandTotal - totalDiscountTotal);
  }
}
