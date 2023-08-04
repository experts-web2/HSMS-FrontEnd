import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { takeUntil } from 'rxjs';
import { AlertService, PatientService } from 'src/app/services';
import { TestService, DoctorService } from 'src/app/services';
import { SubscriptionManagmentDirective } from 'src/app/shared/directive/subscription-managment.directive';
import { IDropDown } from 'src/app/models/interfaces/Dropdown';

@Component({
  selector: 'app-lab-test-report',
  templateUrl: './lab-test-report.component.html',
  styleUrls: ['./lab-test-report.component.scss'],
})
export class LabTestReportComponent
  extends SubscriptionManagmentDirective
  implements OnInit {
  selectedDoctor = '';
  selectedPayment = '';
  labReportForm!: FormGroup;
  invoiceDescriptionForm!: FormGroup;
  doctors: Array<IDropDown> = [];
  tests: Array<any> = [];
  radiology: Array<IDropDown> = [];
  descriptions: Array<any> = [];

  dropDown!: Array<{ id: number; label: string }>;
  patients: Array<IDropDown> = [];
  patientsToShow: Array<IDropDown> = [];

  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '15rem',
    minHeight: '5rem',
    maxHeight: 'auto',
    width: 'auto',
    minWidth: '0',
    translate: 'yes',
    enableToolbar: true,
    showToolbar: true,
    placeholder: 'Enter text here...',
    defaultParagraphSeparator: '',
    defaultFontName: '',
    defaultFontSize: '',
    fonts: [
      { class: 'arial', name: 'Arial' },
      { class: 'times-new-roman', name: 'Times New Roman' },
      { class: 'calibri', name: 'Calibri' },
      { class: 'comic-sans-ms', name: 'Comic Sans MS' },
    ],
    customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText',
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
    toolbarHiddenButtons: [['bold', 'italic'], ['fontSize']],
  };
  submitted = false;
  testToView: Array<IDropDown> = [];
  doctorsToView: Array<IDropDown> = [];
  labTest: any[]=[];

  constructor(
    private readonly patientService: PatientService,
    private readonly fb: FormBuilder,
    private readonly doctorService: DoctorService,
    private readonly testService: TestService,
    private readonly alertService: AlertService,
  ) {
    super();
    this.invoiceDescriptionForm = this.fb.group({
      testId: new FormControl<string | null>(null, [Validators.required]),
      normalValues: new FormControl<string | null>(null, [Validators.required]),
      testValue: new FormControl<string | null>(null, [Validators.required]),
      report: new FormControl<string | null>(null, [Validators.required]),
      remarks: new FormControl<string | null>(null, [Validators.required]),
    });
    this.labReportForm = this.fb.group({
      patientId: new FormControl<string | null>(null, [Validators.required]),
      doctorId: new FormControl<string | null>(null, [Validators.required]),
      testReport: this.fb.array([this.invoiceDescriptionForm]),
    });
  }

  get testReport(): FormArray {
    return this.labReportForm.get('testReport') as FormArray;
  }

  ngOnInit(): void {
    this.getTests();
    this.getDoctorDropDownList();
  }

  getTests() {
    this.testService
      .getTests()
      .pipe(takeUntil(this.componetDestroyed))
      .subscribe({
        next: (x) => {
          console.log(x);
          this.labTest = this.tests;
        },
        error: (err) => {},
      });
  }

  getDoctorDropDownList() {
    this.doctorService
      .getDoctorsDropDown()
      .pipe(takeUntil(this.componetDestroyed))
      .subscribe({
        next: (x) => {
          this.doctors = x;
          this.doctorsToView = x;
        },
        error: (err) => { },
      });
  }

  onDoctorSelection(doctorId:string){
    this.labReportForm.get('doctorId')?.setValue(doctorId);

  }

  onSearchDoctor(event: any) {
    console.log(event.query);
    const query = event.query.trim().toLowerCase();
    this.doctorsToView = this.doctors.filter(
      (doctor) =>
        doctor.name.toLowerCase().includes(query)
    );
  }

  onTestSelect(index: number, test: any) {
    let selectedTest = this.tests.find((x) => x.id === test.id);
    console.log('description', selectedTest);
    this.testReport.at(index).get('testId')?.setValue(selectedTest?.id);
    this.testReport.at(index).get('normalValues')?.setValue(selectedTest?.normalValues);
  }

  onTestSearch(event: any) {
    console.log(event.query);
    const query = event.query.trim().toLowerCase();
    this.testToView = this.tests?.filter(
      (test) =>
        test.name.toLowerCase().includes(query) || // Filter by name
        test.code.toString().includes(query) // Filter by code
    );
  }

  get f() {
    return this.labReportForm.controls;
  }


  onPatientSearch(event: { query: string }): void {
    const searchTerm = event.query.trim();
    if (searchTerm.length >= 3) {
      this.patientService.patientTestInvoice(searchTerm).pipe(takeUntil(this.componetDestroyed)).subscribe({
        next: (x) => {
          this.patientsToShow = x;
        },
        error: (err) => {

        }
      })
    }
  }

  onPatientSelection(selectPatient: string) {
    this.labReportForm.get('patientId')?.setValue(selectPatient);
    this.testService.getLabtestsBytodayInvoicedByPatientid(selectPatient).pipe(takeUntil(this.componetDestroyed)).subscribe({
      next: (x) => {
        this.tests = x;
      }
    })
  }

  addToken() {
    this.submitted = true;

    if (this.labReportForm.invalid) {
      return;
    }
    console.log('this.labReportForm.value',this.labReportForm.value)
    this.testService.addPatientTestReport(this.labReportForm.value).pipe(takeUntil(this.componetDestroyed)).subscribe({
      next: (x) => {
        console.log(x);
        this.alertService.success('Add test Report successfully', 'Success');
        this.labReportForm.reset();
        this.testReport.clear();
      },
      error: (err) => {
        this.alertService.error('Something went wrong while generating sample id.', 'Error');

      }
    })
  }

  getInvoice() {
    let invoice = {
      testReport: this.testReport.value.map((x: any) => {
        let invoiceItem = {
          testId: x.testId,
          normalValues: x.normalValues,
          testValue: x.testValue,
          report: x.report,
          remarks: x.remarks,
        };
        return invoiceItem;
      }),
    };
    return invoice;
  }

  addNewInvoiceItem() {
    let newForm = this.fb.group({
      testId: new FormControl<string | null>(null, [Validators.required]),
      normalValues: new FormControl<string | null>(null, [Validators.required]),
      testValue: new FormControl<string | null>(null, [Validators.required]),
      report: new FormControl<string | null>(null, [Validators.required]),
      remarks: new FormControl<string | null>(null, [Validators.required]),
    });
    this.testReport.push(newForm);
  }

  removeinvoiceItem(index: number) {
    this.testReport.removeAt(index);
    let newForm = this.fb.group({
      testId: new FormControl<string | null>(null, [Validators.required]),
      normalValues: new FormControl<string | null>(null, [Validators.required]),
      testValue: new FormControl<string | null>(null, [Validators.required]),
      report: new FormControl<string | null>(null, [Validators.required]),
      remarks: new FormControl<string | null>(null, [Validators.required]),
    });
    if (this.testReport.length < 1) this.testReport.push(newForm);
  }
}
