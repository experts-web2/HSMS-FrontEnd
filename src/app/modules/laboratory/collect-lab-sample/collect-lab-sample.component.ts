import { Component, Inject } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { IDropDown } from 'src/app/models/interfaces/Dropdown';
import { AddLabTestComponent } from '../add-lab-test/add-lab-test.component';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { PatientService } from 'src/app/Services/patient/patient.service';
import { TestService } from 'src/app/Services/test-service/test.service';
import { DoctorService } from 'src/app/Services/doctor.service';
import { IInvoice } from 'src/app/models/interfaces/addOrUpdate-Token';
import { PaymentTypes } from 'src/app/constants/enums/PaymenTypes';

@Component({
  selector: 'app-collect-lab-sample',
  templateUrl: './collect-lab-sample.component.html',
  styleUrls: ['./collect-lab-sample.component.scss']
})
export class CollectLabSampleComponent {
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

  testStatus: Array<{ value: string, label: string }> = [{ value: 'Collected', label: 'Collected' }, { value: 'Pending', label: 'Pending' }]

  constructor(public dialogRef: MatDialogRef<CollectLabSampleComponent>,
    private dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: any,
    private readonly patientService: PatientService,
    private readonly fb: FormBuilder,
    private readonly doctorService: DoctorService,
    private readonly testService: TestService) {

    this.invoiceDescriptionForm = this.fb.group({
      testId: new FormControl<string | null>(null, [Validators.required]),
      description: new FormControl<number | null>(null, [Validators.required]),
      sample: new FormControl<number | null>(null, [Validators.required]),
      status: new FormControl<string | null>(null, [Validators.required]),
    })
    this.collectionForm = this.fb.group({
      patientId: new FormControl<string | null>(null, [Validators.required]),
      invoiceItems: this.fb.array([this.invoiceDescriptionForm]),
    });

  }

  get invoiceItems(): FormArray {
    return this.collectionForm.get('invoiceItems') as FormArray;
  }

  ngOnInit(): void {
    this.getPatients();
    this.getTests();
  }

  cancel() {
    this.dialogRef.close();
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
    console.log('description',description);
    this.invoiceItems.at(index).get('description')?.setValue(description?.description);
    this.invoiceItems.at(index).get('sample')?.setValue(description?.testSample);
  }

  

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
          description: x.description,
          status: x.status,
          sample: x.sample,
        }
        return invoiceItem
      }),
    }
    return invoice;
  }

  addNewInvoiceItem() {
    let newForm = this.fb.group({
      description: new FormControl<string | null>(null, [Validators.required]),
      status: new FormControl<string | null>(null, [Validators.required]),
      sample: new FormControl<string | null>(null, [Validators.required]),
      testId: new FormControl<string | null>(null, [Validators.required]),
    })
    this.invoiceItems.push(newForm)
  }

  removeinvoiceItem(index: number) {
    this.invoiceItems.removeAt(index);
    let newForm = this.fb.group({
      description: new FormControl<number | null>(null, [Validators.required]),
      testId: new FormControl<string | null>(null, [Validators.required]),
      status: new FormControl<string | null>(null, [Validators.required]),
      sample: new FormControl<string | null>(null, [Validators.required]),
    })
    if (this.invoiceItems.length < 1) this.invoiceItems.push(newForm);
  }
}
