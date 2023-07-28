import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { takeUntil } from 'rxjs';
import { SubscriptionManagmentDirective } from 'src/app/shared/directive/subscription-managment.directive';
import { PaymentTypes } from 'src/app/constants/enums/PaymenTypes';
import { IDropDown } from 'src/app/models/interfaces/Dropdown';
import { IInvoice } from 'src/app/models/interfaces/addOrUpdate-Token';
import {
  AlertService,
  DoctorService,
  PatientService,
  TestService,
} from 'src/app/services';
import { ILabTest } from 'src/app/models/interfaces/addOrUpdate-test';

@Component({
  selector: 'app-add-patient-test',
  templateUrl: './add-patient-test.component.html',
  styleUrls: ['./add-patient-test.component.scss'],
})
export class AddPatientTestComponent
  extends SubscriptionManagmentDirective
  implements OnInit
{
  selectedDoctor = '';
  selectedPayment = '';
  addPatientTestForm!: FormGroup;
  invoiceDescriptionForm!: FormGroup;
  doctors: Array<IDropDown> = [];
  tests: Array<ILabTest> = [];
  testToView: Array<ILabTest> = [];
  radiology: Array<IDropDown> = [];

  discountTypes = [
    {
      label: 'Amount',
      value: 1,
    },
    {
      label: '%',
      value: 2,
    },
  ];
  dropDown!: Array<{ id: number; label: string }>;
  patients: Array<IDropDown> = [];
  patientsToShow: Array<IDropDown> = [];

  paymentType: Array<{ id: number, label: string }> = [{ id: PaymentTypes.Cash, label: 'Cash' }, { id: PaymentTypes.DebitCreditCard, label: 'Card' }, { id: PaymentTypes.OnlinePayment, label: 'Online Payment' }, { id: PaymentTypes.Cheque, label: 'Cheque' }]
  testPriority: Array<{ value: string, label: string }> = [{ value: 'Routine', label: 'Routine' }, { value: 'Urgent', label: 'Urgent' }]
  doctorsToView: Array<IDropDown> = [];
  labTest: Array<any> = [];

  constructor(
    private readonly patientService: PatientService,
    private readonly fb: FormBuilder,
    private readonly doctorService: DoctorService,
    private readonly alertService: AlertService,
    private readonly testService: TestService
  ) {
    super();
    this.invoiceDescriptionForm = this.fb.group({
      paidAmount: new FormControl<number | null>(null, [Validators.required]),
      description: new FormControl<number | null>(null, [Validators.required]),
      discountAmount: new FormControl<number | null>(0, [Validators.required]),
      discountType: new FormControl<number | null>(1, [Validators.required]),
      testId: new FormControl<string | null>(null, [Validators.required]),
      reportingHours: new FormControl<string | null>(null, [
        Validators.required,
      ]),
      othersType: new FormControl<number | null>(null),
      othersName: new FormControl<string | null>(null),
    });
    this.addPatientTestForm = this.fb.group({
      doctorId: new FormControl<string | null>(null, [Validators.required]),
      patientId: new FormControl<string | null>(null, [Validators.required]),
      totalDiscount: new FormControl<number | null>(0, [Validators.required]),
      paymentType: new FormControl<number | null>(1, [Validators.required]),
      amountPaid: new FormControl<number | null>(null, [Validators.required]),
      grandTotal: new FormControl<number | null>(0.0, [Validators.required]),
      completionDate: new FormControl<number | null>(0.0, [
        Validators.required,
      ]),
      priority: new FormControl<string | null>('Routine', [
        Validators.required,
      ]),
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
    // this.getTests();
  }

  getDoctors() {
    this.doctorService.getDoctorDropDown().pipe(takeUntil(this.componetDestroyed)).subscribe({
      next: (x) => {
        this.doctors = x;
        this.doctorsToView = x;
      },
      error: (err) => {

      }
    })
  }

  getTests() {
    this.testService.getTests().pipe(takeUntil(this.componetDestroyed)).subscribe({
      next: (x) => {
        console.log(x);
        this.labTest = x.data;
      },
      error: (err) => {

      }
    })
  }

  getPatients() {
    this.patientService.getPatientsDropdown().pipe(takeUntil(this.componetDestroyed)).subscribe({
      next: (x) => {
        this.patients = x;
      },
      error: (err) => {

      }
    })
  }

  onSearch(event: { query: string }): void {
    const searchTerm = event.query.trim().toLowerCase();
    // if (searchTerm.length >= 3) {
    this.patientsToShow = this.patients.filter(x => x.name.toLowerCase().includes(searchTerm));
    // }
  }

  search(event: any) {
    console.log(event.query);
    const query = event.query.trim().toLowerCase();
    this.testToView = this.tests.filter(
      (test) =>
        test.name.toLowerCase().includes(query) || // Filter by name
        test.code.toString().includes(query) // Filter by code
    );
  }

  onSearchDoctor(event: any) {
    console.log(event.query);
    const query = event.query.trim().toLowerCase();
    this.doctorsToView = this.doctors.filter(
      (doctor) =>
        doctor.name.toLowerCase().includes(query)
    );
  }

  onDescriptionSelect(index: number, labTest: any) {
    console.log({ index, labTest })
    let description = this.testToView.find(x => x.id === labTest.id);
    this.invoiceItems.at(index).get('testId')?.setValue(description?.id);
    this.invoiceItems.at(index).get('paidAmount')?.setValue(description?.price);
    this.invoiceItems
      .at(index)
      .get('description')
      ?.setValue(description?.description);
    this.invoiceItems
      .at(index)
      .get('reportingHours')
      ?.setValue(description?.reportingTime);
    this.calculate();
  }

  onPatientSelection(selectPatient:string) {
    console.log('selectPatient', selectPatient);
    this.addPatientTestForm.get('patientId')?.setValue(selectPatient);
    this.testService.getTestByPatientid(selectPatient).pipe(takeUntil(this.componetDestroyed)).subscribe({
      next: (x) => {
        this.tests = x.length ? x : this.labTest;

        console.log('this.descriptions', this.testToView);
        console.log({ x });
      }
    })
  }


  onDoctorSelection(doctorId:string){
    this.addPatientTestForm.get('doctorId')?.setValue(doctorId);

  }

  searchPatient(query: string) {
    let text = query.toLowerCase();
    if(text.length>=3){
      this.patientsToShow = this.patients.filter((x) =>
        x.name.toLowerCase().includes(text)
      );
    }
  }

  addToken() {
    if (this.addPatientTestForm.controls['amountPaid']?.value >= this.addPatientTestForm.controls['grandTotal'].value) {
      if (this.addPatientTestForm.controls['amountPaid']?.value) {
        console.log('this.addPatientTestForm.value', this.addPatientTestForm.value);
        // this.testService.addPatientTest(this.addPatientTestForm.value).pipe(takeUntil(this.componetDestroyed)).subscribe({
        //   next: (x) => {
        //     console.log(x);
        //     this.alertService.success('Patient Test add successfully', 'Success');
        //   },
        //   error: (err) => {
        //     this.alertService.error('Something went wrong while adding patient Test.', 'Error');
        //   }
        // })
      }
    } else {
      this.alertService.error('add payment greater than total', 'Error');
    }
  }

  getInvoice(): IInvoice {
    let invoice: IInvoice = {
      amountPaid: this.addPatientTestForm.controls['amountPaid'].value,
      paymentType: this.addPatientTestForm.controls['paymentType'].value,
      invoiceItems: this.invoiceItems.value.map((x: any) => {
        let invoiceItem = {
          testId: x.testId,
          reportingHours: x.reportingHours,
          paidAmount: x.paidAmount,
          description: x.description,
          discountAmount: x.discountAmount,
          discountType: x.discountType,
          othersType: x.othersType,
          othersName: x.othersName,
        };
        return invoiceItem;
      }),
      totalDiscount: this.addPatientTestForm.controls['totalDiscount'].value,
      grandTotal: this.addPatientTestForm.controls['grandTotal'].value,
    };
    return invoice;
  }

  addNewInvoiceItem() {
    let newForm = this.fb.group({
      paidAmount: new FormControl<number | null>(null, [Validators.required]),
      description: new FormControl<number | null>(null, [Validators.required]),
      discountAmount: new FormControl<number | null>(0, [Validators.required]),
      discountType: new FormControl<number | null>(1, [Validators.required]),
      testId: new FormControl<string | null>(null, [Validators.required]),
      reportingHours: new FormControl<string | null>(null, [
        Validators.required,
      ]),
      othersType: new FormControl<number | null>(null),
      othersName: new FormControl<string | null>(null),
    });
    this.invoiceItems.push(newForm);
  }

  removeinvoiceItem(index: number) {
    this.invoiceItems.removeAt(index);
    let newForm = this.fb.group({
      paidAmount: new FormControl<number | null>(null, [Validators.required]),
      description: new FormControl<number | null>(null, [Validators.required]),
      discountAmount: new FormControl<number | null>(0, [Validators.required]),
      discountType: new FormControl<number | null>(1, [Validators.required]),
      testId: new FormControl<string | null>(null, [Validators.required]),
      reportingHours: new FormControl<string | null>(null, [
        Validators.required,
      ]),
      othersType: new FormControl<number | null>(null),
      othersName: new FormControl<string | null>(null),
    });
    if (this.invoiceItems.length < 1) this.invoiceItems.push(newForm);
    this.calculate();
  }

  // calculate(index?: number) {
  //   let totalDiscount = this.addPatientTestForm.get('totalDiscount');
  //   let amountPaid = this.addPatientTestForm.get('amountPaid');
  //   let grandTotal = this.addPatientTestForm.get('grandTotal');
  //   let totalGrandTotal = 0;
  //   let totalDiscountTotal = 0;
  //   for (let invItem of this.invoiceItems.controls) {
  //     let amount = invItem.get('paidAmount')?.value;
  //     let discountType = invItem.get('discountType')?.value;
  //     console.log(discountType);
  //     let discount =
  //       !invItem.get('discountAmount')?.value ||
  //       invItem.get('discountAmount')?.value === 0
  //         ? 0
  //         : discountType === 1
  //         ? invItem.get('discountAmount')?.value
  //         : (invItem.get('discountAmount')?.value / 100) * amount;
  //     totalGrandTotal += amount;
  //     totalDiscountTotal += discount;
  //   }
  //   totalDiscount?.setValue(totalDiscountTotal);
  //   grandTotal?.setValue(totalGrandTotal - totalDiscountTotal);
  // }


  calculate(totalInput?: boolean) {
    let totalDiscountType = this.addPatientTestForm.get('totalDiscountType');
    let totalDiscount = this.addPatientTestForm.get('totalDiscount');
    if (totalDiscount?.value && totalDiscount.value > 0 && totalInput) {
      for (let invItem of this.invoiceItems.controls) {
        invItem.get('discountAmount')?.setValue(0);
      }
    }
    let amountPaid = this.addPatientTestForm.get('amountPaid');
    let grandTotal = this.addPatientTestForm.get('grandTotal');
    let totalGrandTotal = 0;
    let totalDiscountTotal = 0;
    for (let invItem of this.invoiceItems.controls) {
      let amount = invItem.get('paidAmount')?.value;
      let discountType = invItem.get('discountType')?.value;
      let discount =
        !invItem.get('discountAmount')?.value ||
        invItem.get('discountAmount')?.value === 0
          ? 0
          : discountType === 1
          ? invItem.get('discountAmount')?.value
          : (invItem.get('discountAmount')?.value / 100) * amount;
      totalGrandTotal += amount;
      totalDiscountTotal += discount;
    }
    console.log(totalDiscount?.value * (totalGrandTotal / 100));

    if (totalDiscount?.value && totalDiscount.value > 0 && totalInput)
      totalDiscountTotal = totalDiscount.value;

    totalDiscount?.setValue(totalDiscountTotal);
    grandTotal?.setValue(
      totalGrandTotal -
        (totalDiscountType?.value === 2
          ? (totalDiscountTotal / 100) * totalDiscount?.value
          : totalDiscountTotal)
    );
  }
}
