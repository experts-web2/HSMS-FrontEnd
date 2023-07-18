import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PatientService } from 'src/app/Services/patient/patient.service';
import { DoctorService } from '../../../Services/doctor.service';
import { TokenTypes } from '../../../constants/Constants/TokenTypes';
import { IDoctor } from 'src/app/models/interfaces/Doctor';
import { IDropDown } from 'src/app/models/interfaces/Dropdown';
import { TestService } from '../../../Services/test-service/test.service';
import { PaymentTypes } from 'src/app/constants/enums/PaymenTypes';
import { TokenService } from 'src/app/Services/token.service';
import { IAddOrUpdateToken, IInvoice, IInvoiceItem, ITokenDetail } from 'src/app/models/interfaces/addOrUpdate-Token';

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
  doctors: Array<IDropDown> = [];
  tests: Array<IDropDown> = [];
  radiology: Array<IDropDown> = [];
  descriptions: Array<IDropDown> = [];
  tokentypes: Array<{value: number, label: string}> = [
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
  patients: Array<IDropDown> = [];
  patientsToShow: Array<IDropDown> = [];

  paymentType : Array<{id: number, label: string}> = [{ id: PaymentTypes.Cash, label: 'Cash' }, { id: PaymentTypes.DebitCreditCard, label: 'Card' }, { id: PaymentTypes.OnlinePayment, label: 'Online Payment' },{ id: PaymentTypes.Cheque, label: 'Cheque'} ]

  constructor(public dialogRef: MatDialogRef<AddTokenModalComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private readonly patientService: PatientService, private readonly fb: FormBuilder, private readonly doctorService: DoctorService, private readonly testService: TestService, private readonly tokenService: TokenService) {
    this.invoiceDescriptionForm = this.fb.group({
      paidAmount: new FormControl<number | null>(null, [Validators.required]),
      discountAmount: new FormControl<number | null>(0, [Validators.required]),
      discountType: new FormControl<number | null>(1, [Validators.required]),
      treatmentId: new FormControl<string| null>(null, [Validators.required]),
      othersType: new FormControl<number | null>(null),
      othersName: new FormControl<string | null>(null)
    })
    this.addTokenForm = this.fb.group({
      patientId: new FormControl<string | null>(null, [Validators.required]),
      patientName: new FormControl<string | null>(null),
      tokenTypes: new FormControl<number | null>(null, [Validators.required]),
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

  get tokenTypes(){
    return this.addTokenForm.get('tokenTypes');
  }

  ngOnInit(): void { 
    this.getDoctors();
    this.getPatients();
    this.getTests();
  }

  cancel() {
    this.dialogRef.close();
  }

  getDoctors(){
    this.doctorService.getDoctorDropDown().subscribe({
      next: (x) => {
        console.log(x);        
        this.doctors = x;
      },
      error: (err) => {
        
      }
    })
  }

  getTests(){
    this.testService.getTestDropDown().subscribe({
      next: (x) => {
        console.log(x);        
        this.tests = x;
      },
      error: (err) => {
        
      }
    })
  }

  onDescriptionSelect(index: number, descriptionId: string){
    let description = this.descriptions.find(x => x.id === descriptionId);
    this.invoiceItems.at(index).get('paidAmount')?.setValue(description?.price);
    this.calculate()

  }

  getPatients(){
    this.patientService.getPatientDropDown().subscribe({
      next: (x) => {
        this.patients = x;
        this.patientsToShow = x;
      },
      error: (err) => {

      }
    })
  }

  patientSelect(patient: IDropDown){
    this.addTokenForm.get('patientId')?.setValue(patient.id);
    this.addTokenForm.get('patientName')?.setValue(patient.name);
  }

  searchPatient(query: string){
    let text = query.toLowerCase();
    this.patientsToShow = this.patients.filter( x => x.name.toLowerCase().includes(text));
  }

  addToken() {
    console.log(this.addTokenForm.value)
    if(this.addTokenForm.controls['patientId']?.valid && this.invoiceItems.valid){
      let tokenpayload: IAddOrUpdateToken = {
        patientId: this.addTokenForm.controls['patientId'].value,
        tokenDetails: [this.getTokenDetail()],
        doctorId: this.addTokenForm.controls['doctorId'].value,
        patientCheckedIn: true
      }
      this.tokenService.addToken(tokenpayload).subscribe({
        next: (x) => {
          console.log(x);
          
          
        },
        error: (err) => {

        }
      })
    }

  }

  getTokenDetail(): ITokenDetail{
    let tokenDetail: ITokenDetail = {
      invoice: this.getInvoice(),
      tokenTypes: this.addTokenForm.controls['tokenTypes'].value,
      pulseHeartRate: this.addTokenForm.controls['pulseHeartRate'].value,
      temperature: this.addTokenForm.controls['temperature'].value,
      bloodPressure: this.addTokenForm.controls['bloodPressure'].value,
      respiratoryRate: this.addTokenForm.controls['respiratoryRate'].value,
      bloodSugar: this.addTokenForm.controls['bloodSugar'].value,
      height:  this.addTokenForm.controls['height'].value,
      weight: this.addTokenForm.controls['weight'].value,
      bodyMassIndex: this.addTokenForm.controls['bodyMassIndex'].value,
      bodySurfaceArea: this.addTokenForm.controls['bodySurfaceArea'].value,
      oxygenSaturation: this.addTokenForm.controls['oxygenSaturation'].value
    }
    return tokenDetail;
  }

  getInvoice(): IInvoice{
    let invoice: IInvoice ={
      amountPaid: this.addTokenForm.controls['amountPaid'].value,
      paymentType: this.addTokenForm.controls['paymentType'].value,
      invoiceItems: this.invoiceItems.value.map((x: any) => {
        let invoiceItem: IInvoiceItem = {
          treatmentId: x.treatmentId,
          paidAmount: x.paidAmount,
          discountAmount: x.discountAmount,
          discountType: x.discountType,
          othersType: x.othersType,
          othersName: x.othersName
        }
        return invoiceItem
      }),
      totalDiscount: this.addTokenForm.controls['totalDiscount'].value,
      grandTotal: this.addTokenForm.controls['grandTotal'].value
    } 
    return invoice;
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

  tokenTypeChange(e: any){
    console.log(e);
    let tokentype = 1;
    
    switch (tokentype){
      case TokenTypes.Doctor:
        this.descriptions = this.doctors;
        console.log(this.descriptions);
        
      break;
      case TokenTypes.Lab:
        this.descriptions = this.tests;
        break;
      default:
        break;
    }
  }

  calculate(index?: number){
    let totalDiscount = this.addTokenForm.get('totalDiscount');
    let amountPaid = this.addTokenForm.get('amountPaid');
    let grandTotal = this.addTokenForm.get('grandTotal');
    let totalGrandTotal = 0;
    let totalDiscountTotal = 0;
    for(let invItem of this.invoiceItems.controls){
      let amount = invItem.get('paidAmount')?.value;
      let discountType = invItem.get('discountType')?.value;
      console.log(discountType);
      let discount = !invItem.get('discountAmount')?.value || invItem.get('discountAmount')?.value === 0 ? 0 : discountType === 1 ? invItem.get('discountAmount')?.value  : (invItem.get('discountAmount')?.value / 100) * amount;
      totalGrandTotal += amount;
      totalDiscountTotal += discount;
    }
    totalDiscount?.setValue(totalDiscountTotal);
    grandTotal?.setValue(totalGrandTotal - totalDiscountTotal);
  }


}
