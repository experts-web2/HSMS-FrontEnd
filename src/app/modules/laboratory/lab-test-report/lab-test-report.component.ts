import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertService } from 'src/app/Services/alert/alert.service';
import { PatientService } from 'src/app/Services/patient/patient.service';
import { PatientFormComponent } from '../../forms/patient-form/patient-form.component';
import { MatDialog } from '@angular/material/dialog';
import { DoctorService } from 'src/app/Services/doctor.service';
import { IDropDown } from 'src/app/models/interfaces/Dropdown';
import { formatDate } from '@angular/common';
import { TestService } from 'src/app/Services/test-service/test.service';
import { AngularEditorConfig } from '@kolkov/angular-editor';

@Component({
  selector: 'app-lab-test-report',
  templateUrl: './lab-test-report.component.html',
  styleUrls: ['./lab-test-report.component.scss']
})
export class LabTestReportComponent implements OnInit {
  selectedDoctor = ''
  selectedPayment = ''
  collectionForm!: FormGroup;
  invoiceDescriptionForm!: FormGroup;
  doctors: Array<IDropDown> = [];
  tests: Array<IDropDown> = [];
  radiology: Array<IDropDown> = [];
  descriptions: Array<any> = [];
  

  dropDown!: Array<{ id: number, label: string }>
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
        {class: 'arial', name: 'Arial'},
        {class: 'times-new-roman', name: 'Times New Roman'},
        {class: 'calibri', name: 'Calibri'},
        {class: 'comic-sans-ms', name: 'Comic Sans MS'}
      ],
      customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
    toolbarHiddenButtons: [
      ['bold', 'italic'],
      ['fontSize']
    ]
}

  constructor(
    private readonly patientService: PatientService,
    private readonly fb: FormBuilder,
    private readonly doctorService: DoctorService,
    private readonly testService: TestService) {

    this.invoiceDescriptionForm = this.fb.group({
      testId: new FormControl<string | null>(null, [Validators.required]),
      report: new FormControl<string | null>(null, [Validators.required]),
      remarks: new FormControl<string | null>(null, [Validators.required]),
    })
    this.collectionForm = this.fb.group({
      patientId: new FormControl<string | null>(null, [Validators.required]),
      doctorId: new FormControl<string | null>(null, [Validators.required]),
      invoiceItems: this.fb.array([this.invoiceDescriptionForm]),
    });

  }

  get invoiceItems(): FormArray {
    return this.collectionForm.get('invoiceItems') as FormArray;
  }

  ngOnInit(): void {
    this.getPatients();
    this.getTests();
    this.getDoctorDropDownList()
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

  getDoctorDropDownList(){
    this.doctorService.getDoctorsDropDown().subscribe({
      next: (x) => {
        this.doctors = x
      },
      error: (err) => {
      }
    })
  }

  // onDescriptionSelect(index: number, descriptionId: string) {
  //   let description = this.descriptions.find(x => x.id === descriptionId);
  //   console.log('description',description);
  //   this.invoiceItems.at(index).get('description')?.setValue(description?.description);
  //   this.invoiceItems.at(index).get('sample')?.setValue(description?.testSample);
  // }

  

  patientSelect(patient: any) {
    this.collectionForm.get('patientId')?.setValue(patient.id);
  }

  searchPatient(query: string) {
    let text = query.toLowerCase();
    this.patientsToShow = this.patients.filter(x => x.name.toLowerCase().includes(text));
  }

  addToken() {
    console.log(this.collectionForm.value)
      
      // let tokenpayload = {
      //   patientId: this.collectionForm.controls['patientId'].value,
      //   doctorId: this.collectionForm.controls['doctorId'].value,
      //   patientCheckedIn: this.collectionForm.controls['patientCheckedIn'].value ? this.collectionForm.controls['patientCheckedIn'].value : true
      // }
      // console.log('tokenpayload',tokenpayload);
      // this.tokenService.addToken(tokenpayload).subscribe({
      //   next: (x) => {
      //     console.log(x);


      //   },
      //   error: (err) => {

      //   }
      // })

  }

  getInvoice() {
    let invoice = {
      invoiceItems: this.invoiceItems.value.map((x: any) => {
        let invoiceItem = {
          testId: x.testId,
          report: x.report,
          remarks: x.remarks,
        }
        return invoiceItem
      }),
    }
    return invoice;
  }

  addNewInvoiceItem() {
    let newForm = this.fb.group({
      testId: new FormControl<string | null>(null, [Validators.required]),
      report: new FormControl<string | null>(null, [Validators.required]),
      remarks: new FormControl<string | null>(null, [Validators.required]),
    })
    this.invoiceItems.push(newForm)
  }

  removeinvoiceItem(index: number) {
    this.invoiceItems.removeAt(index);
    let newForm = this.fb.group({
      testId: new FormControl<string | null>(null, [Validators.required]),
      report: new FormControl<number | null>(null, [Validators.required]),
      remarks: new FormControl<string | null>(null, [Validators.required]),
    })
    if (this.invoiceItems.length < 1) this.invoiceItems.push(newForm);
  }
}
