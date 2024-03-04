import { Component, Inject, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { PatientService } from 'src/app/services';
import { TokenTypes } from '../../../constants/Constants/TokenTypes';
import { IDoctor } from 'src/app/models/interfaces/Doctor';
import { IDropDown } from 'src/app/models/interfaces/Dropdown';
import { PaymentTypes } from 'src/app/constants/enums/PaymenTypes';
import {
  TokenService,
  TestService,
  AlertService,
  DoctorService,
} from 'src/app/services';
import {
  IAddOrUpdateToken,
  IInvoice,
  IInvoiceItem,
  ITokenDetail,
} from 'src/app/models/interfaces/addOrUpdate-Token';
import { PatientFormComponent } from '../../forms/patient-form/patient-form.component';
import { SubscriptionManagmentDirective } from 'src/app/shared/directive/subscription-managment.directive';
import { takeUntil } from 'rxjs';
import { IFetchRequest } from 'src/app/models/interfaces/fetchTableRequest';
import { FiltersMatchModes } from 'src/app/constants/enums/FilterMatchModes';
import { FilterOperator } from 'primeng/api';
import { FiltersOperators } from 'src/app/constants/enums/FilterOperators';
import { IPatient } from 'src/app/models/interfaces/patient-model';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { TriggerService } from 'src/app/services/trigger.service';

@Component({
  selector: 'app-add-token-modal',
  templateUrl: './add-token-modal.component.html',
  styleUrls: ['./add-token-modal.component.scss'],
})
export class AddTokenModalComponent
  extends SubscriptionManagmentDirective
  implements OnInit
{
  selectedDoctor = '';
  currentDate: Date = new Date();
  selectedPayment = '';
  addTokenForm!: FormGroup;
  invoiceDescriptionForm!: FormGroup;
  totalDiscountType: number = 1;
  doctors: Array<IDropDown> = [];
  tests: Array<IDropDown> = [];
  radiology: Array<IDropDown> = [];
  descriptions: Array<IDropDown> = [];
  tokenToShow:Array<{ value: number; label: string }>=[]
  tokentypes: Array<{ value: number; label: string }> = [
    {
      label: 'Doctor',
      value: TokenTypes.Doctor,
    },
    {
      label: 'Lab Test',
      value: TokenTypes.Lab,
    },
    {
      label: 'Radiology',
      value: TokenTypes.Radiology,
    },
    {
      label: 'Sonology',
      value: TokenTypes.Sonology,
    },
    {
      label: 'Therapy',
      value: TokenTypes.Therapy,
    },
  ];

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
  patientsToShow: Array<IPatient> = [];

  paymentTypes: Array<{ id: number; label: string }> = [
    { id: PaymentTypes.Cash, label: 'Cash' },
    { id: PaymentTypes.DebitCreditCard, label: 'Card' },
    { id: PaymentTypes.OnlinePayment, label: 'Online Payment' },
    { id: PaymentTypes.Cheque, label: 'Cheque' },
  ];
  display = true;

  constructor(
    private dialogService: DialogService,
    private config: DynamicDialogConfig,
    private dialogRef:DynamicDialogRef,
    private readonly patientService: PatientService,
    private readonly fb: FormBuilder,
    private readonly doctorService: DoctorService,
    private readonly testService: TestService,
    private readonly tokenService: TokenService,
    private readonly alertService: AlertService,
    private readonly triggerService: TriggerService
  ) {
    super();
    this.display = this.config.data.display;

    this.invoiceDescriptionForm = this.fb.group({
      paidAmount: new FormControl<number | null>(null, [Validators.required]),
      discountAmount: new FormControl<number | null>(0, [Validators.required]),
      discountType: new FormControl<number | null>(1, [Validators.required]),
      treatmentId: new FormControl<string | null>(null, [Validators.required]),
      othersType: new FormControl<number | null>(null),
      othersName: new FormControl<string | null>(null),
    });
    this.addTokenForm = this.fb.group({
      patientId: new FormControl<string | null>(null, [Validators.required]),
      patientName: new FormControl<string | null>(null),
      patient: new FormControl<any | null>(null),
      tokenTypes: new FormControl<number | null>(null, [Validators.required]),
      doctorId: new FormControl<string | null>(null, [Validators.required]),
      totalDiscount: new FormControl<number | null>(null, [
        Validators.required,
      ]),
      paymentType: new FormControl<number | null>(1, [Validators.required]),
      amountPaid: new FormControl<number | null>(null, [Validators.required]),
      grandTotal: new FormControl<number | null>(null, [Validators.required]),
      pulseHeartRate: new FormControl<number | null>(null),
      temperature: new FormControl<number | null>(null),
      bloodPressure: new FormControl<string | null>(null),
      respiratoryRate: new FormControl<number | null>(null),
      bloodSugar: new FormControl<number | null>(null),
      weight: new FormControl<number | null>(null, [Validators.min(0)]),
      height: new FormControl<number | null>(null),
      feet: new FormControl<number | null>(null, [Validators.min(0)]),
      inches: new FormControl<number | null>(null, [Validators.min(0), Validators.max(11)]),
      bodyMassIndex: new FormControl<number | null>(null),
      bodySurfaceArea: new FormControl<number | null>(null),
      oxygenSaturation: new FormControl<number | null>(null),
      payment_notification: new FormControl<boolean | null>(null, [
        Validators.required,
      ]),
      patientCheckedIn: new FormControl<boolean | null>(false, [
        Validators.required,
      ]),
      confirmation: new FormControl('', [Validators.required]),
      totalDiscountType: new FormControl<number | null>(1),
      invoiceItems: this.fb.array([this.invoiceDescriptionForm]),
    });

    // this.addTokenForm.get('tokenTypes')?.setValue(1);
  }

  get invoiceItems(): FormArray {
    return this.addTokenForm.get('invoiceItems') as FormArray;
  }

  get doctorId(): AbstractControl {
    return this.addTokenForm.get('doctorId') as AbstractControl;
  }

  get tokenTypes(): AbstractControl {
    return this.addTokenForm.get('tokenTypes') as AbstractControl;
  }

  get patientId(): AbstractControl {
    return this.addTokenForm.get('patientId') as AbstractControl;
  }

  get patientName(): AbstractControl {
    return this.addTokenForm.get('patientName') as AbstractControl;
  }

  get patient(): AbstractControl {
    return this.addTokenForm.get('patient') as AbstractControl;
  }

  get feet(): AbstractControl {
    return this.addTokenForm.get('feet') as AbstractControl;
  }

  get inches(): AbstractControl {
    return this.addTokenForm.get('inches') as AbstractControl;
  }

  get weight(): AbstractControl {
    return this.addTokenForm.get('weight') as AbstractControl;
  }

  get bodyMassIndex(): AbstractControl {
    return this.addTokenForm.get('bodyMassIndex') as AbstractControl;
  }

  get amountPaid(): AbstractControl {
    return this.addTokenForm.get('amountPaid') as AbstractControl;
  }

  get paymentType(): AbstractControl {
    return this.addTokenForm.get('paymentType') as AbstractControl;
  }

  ngOnInit(): void {
    this.getDoctors();
    this.getPatients();
    this.getTests();
  }

  cancel() {
    this.dialogRef.close();
  }

  getDoctors() {
    this.doctorService
      .getDoctorDropDown()
      .pipe(takeUntil(this.componetDestroyed))
      .subscribe({
        next: (x) => {
          this.doctors = x;
        },
        error: (err) => {},
      });
  }

  getTests() {
    this.testService
      .getTestDropDown()
      .pipe(takeUntil(this.componetDestroyed))
      .subscribe({
        next: (x) => {
          this.tests = x;
          if (!this.display) {
            this.descriptions = this.tests;
          }
        },
        error: (err) => {},
      });
  }

  onDescriptionSelect(index: number, descriptionId: string) {
    let description = this.descriptions.find((x) => x.id === descriptionId);
    this.addTokenForm.controls['doctorId'].setValue(description?.id);
    this.invoiceItems.at(index).get('paidAmount')?.setValue(description?.price);
    this.calculate();
  }

  getPatients() {
    this.patientService
      .getPatientDropDown()
      .pipe(takeUntil(this.componetDestroyed))
      .subscribe({
        next: (x) => {
          this.patients = x;
          // this.patientsToShow = x;
        },
        error: (err) => {},
      });
  }

  calculateBmi(){
    let bmi = 0;       
    let meters = this.feetAndInchesToCentimeters(this.feet.value ?? 0, this.inches.value ?? 0) / 100; 
    bmi =  (this.weight.value ?? 0) / (meters * meters);
    this.bodyMassIndex.setValue(bmi);
  }

  feetAndInchesToCentimeters(feet: number, inches: number): number {
    // Convert feet to centimeters
    const feetInCentimeters = feet * 30.48;

    // Convert inches to centimeters
    const inchesInCentimeters = inches * 2.54;

    // Total length in centimeters
    const totalCentimeters = feetInCentimeters + inchesInCentimeters;

    return totalCentimeters;
}

  patientSelect(patient: IPatient) {
    this.addTokenForm.get('patientId')?.setValue(patient.id);
    this.addTokenForm.get('patientName')?.setValue(patient.name);
  }

  searchPatient(event: any) {
    // let text = event.query.trim().toLowerCase();
    // this.patientsToShow = this.patients.filter((x) =>
    //   x.name.toLowerCase().includes(text)
    // );
    this.getQueryPatients(event.query);
  }

  addToken() {
    if (this.addTokenForm.controls['patientId']?.valid && this.invoiceItems.valid) {
      let tokenpayload: IAddOrUpdateToken = {
        patientId: this.addTokenForm.controls['patientId'].value,
        tokenDetails: [this.getTokenDetail()],
        doctorId: this.addTokenForm.controls['doctorId'].value,
        patientCheckedIn: this.addTokenForm.controls['patientCheckedIn'].value
          ? this.addTokenForm.controls['patientCheckedIn'].value
          : true,
      };
      this.tokenService
        .addToken(tokenpayload)
        .pipe(takeUntil(this.componetDestroyed))
        .subscribe({
          next: (x) => {
            this.alertService.success('Token added successfully.');
            this.triggerService.tokenTrigger.next(x);
            this.dialogRef.close();
          },
          error: (err) => {
            this.alertService.error('An error accourd while adding token.');
          },
        });
    }
  }

  getQueryPatients(searchQuery: string){
    let query: IFetchRequest = {
      pagedListRequest:{
        pageNo: 1,
        pageSize: 100
      },
      queryOptionsRequest:{
        filtersRequest: [
          {
            field: 'Name',
            matchMode: FiltersMatchModes.Contains,
            operator: FiltersOperators.Or,
            value: searchQuery,
            ignoreCase: true
          },
          {
            field: 'MRNo',
            matchMode: FiltersMatchModes.Contains,
            operator: FiltersOperators.Or,
            value: searchQuery,
            ignoreCase: true
          },
          {
            field: 'PhoneNumber',
            matchMode: FiltersMatchModes.Contains,
            operator: FiltersOperators.Or,
            value: searchQuery,
            ignoreCase: true
          },
        ]
      }
    }
    this.patientService.getPatients(query).subscribe({
      next: (x) => {
        this.patientsToShow = x.data;
      },
      error: (err) => {

      }
    })
  }

  getTokenDetail(): ITokenDetail {
    let tokenDetail: ITokenDetail = {
      invoice: this.getInvoice(),
      tokenTypes: this.addTokenForm.controls['tokenTypes'].value,
      pulseHeartRate: this.addTokenForm.controls['pulseHeartRate'].value,
      temperature: this.addTokenForm.controls['temperature'].value,
      bloodPressure: this.addTokenForm.controls['bloodPressure'].value,
      respiratoryRate: this.addTokenForm.controls['respiratoryRate'].value,
      bloodSugar: this.addTokenForm.controls['bloodSugar'].value,
      height: this.addTokenForm.controls['height'].value,
      weight: this.addTokenForm.controls['weight'].value,
      bodyMassIndex: this.addTokenForm.controls['bodyMassIndex'].value,
      bodySurfaceArea: this.addTokenForm.controls['bodySurfaceArea'].value,
      oxygenSaturation: this.addTokenForm.controls['oxygenSaturation'].value,
    };
    return tokenDetail;
  }

  getInvoice(): IInvoice {
    let invoice: IInvoice = {
      amountPaid: this.addTokenForm.controls['amountPaid'].value,
      paymentType: this.addTokenForm.controls['paymentType'].value,
      invoiceItems: this.invoiceItems.value.map((x: any) => {
        let invoiceItem: IInvoiceItem = {
          treatmentId: x.treatmentId,
          paidAmount: x.paidAmount,
          discountAmount: x.discountAmount,
          discountType: x.discountType,
          othersType: x.othersType,
          othersName: x.othersName,
        };
        return invoiceItem;
      }),
      totalDiscount: this.addTokenForm.controls['totalDiscount'].value,
      grandTotal: this.addTokenForm.controls['grandTotal'].value,
    };
    return invoice;
  }

  addNewInvoiceItem() {
    let newForm = this.fb.group({
      paidAmount: new FormControl<number | null>(null, [Validators.required]),
      discountAmount: new FormControl<number | null>(0, [
        Validators.required,
      ]),
      discountType: new FormControl<number | null>(1, [Validators.required]),
      treatmentId: new FormControl<string | null>(null, [Validators.required]),
      othersType: new FormControl<number | null>(null),
      othersName: new FormControl<string | null>(null),
    });
    this.invoiceItems.push(newForm);
  }

  removeinvoiceItem(index: number) {
    this.invoiceItems.removeAt(index);
    let newForm = this.fb.group({
      paidAmount: new FormControl<number | null>(null, [Validators.required]),
      discountAmount: new FormControl<number | null>(0, [
        Validators.required,
      ]),
      discountType: new FormControl<number | null>(1, [Validators.required]),
      treatmentId: new FormControl<string | null>(null, [Validators.required]),
      othersType: new FormControl<number | null>(null),
      othersName: new FormControl<string | null>(null),
    });
    if (this.invoiceItems.length < 1) this.invoiceItems.push(newForm);
  }


  searchToken(event: any) {
    let text = event.query.trim().toLowerCase();
    this.tokenToShow = this.tokentypes.filter((x) =>
      x.label.toLowerCase().includes(text)
    );
  }

  tokenTypeChange(tockenType: any) {    
    this.addTokenForm.get('tokenTypes')?.setValue(tockenType);
    let tokentype = this.addTokenForm.get('tokenTypes')?.value;
    switch (tokentype) {
      case TokenTypes.Doctor:
        this.descriptions = this.doctors;
        break;
      case TokenTypes.Lab:
        this.descriptions = this.tests;
        break;
      default:
        break;
    }
  }

  calculate(totalInput?: boolean) {
    let totalDiscountType = this.addTokenForm.get('totalDiscountType');
    let totalDiscount = this.addTokenForm.get('totalDiscount');
    if (totalDiscount?.value && totalDiscount.value > 0 && totalInput) {
      for (let invItem of this.invoiceItems.controls) {
        invItem.get('discountAmount')?.setValue(0);
      }
    }
    let amountPaid = this.addTokenForm.get('amountPaid');
    let grandTotal = this.addTokenForm.get('grandTotal');
    let totalGrandTotal = 0;
    let totalDiscountTotal = 0;
     for(let invItem of this.invoiceItems.controls){
       let amount = invItem.get('paidAmount')?.value;
       let discountType = invItem.get('discountType')?.value;
       let discount = !invItem.get('discountAmount')?.value || invItem.get('discountAmount')?.value === 0 ? 0 : discountType === 1 ? invItem.get('discountAmount')?.value  : (invItem.get('discountAmount')?.value / 100) * amount;
       totalGrandTotal += amount;
       totalDiscountTotal += discount;
       
     }
     
     if(totalDiscount?.value && totalDiscount.value > 0 && totalInput) totalDiscountTotal = totalDiscount.value;

     grandTotal?.setValue(
       totalGrandTotal - (totalDiscountType?.value === 1 ? totalDiscountTotal : ((totalDiscountTotal / 100) * totalDiscount?.value))
     );
    totalDiscount?.setValue(totalDiscountTotal);
  }

  addPatient() {
    const dialogRef = this.dialogService.open(PatientFormComponent, {
      header: 'Add Patient',
      width: '600px',
    });

    dialogRef.onClose.subscribe({
      next: (x: IPatient) => {
        this.patientId.setValue(x.id);
        this.patientName.setValue(x.name);
        this.patient.setValue(x);
      },
    });
  }
}
