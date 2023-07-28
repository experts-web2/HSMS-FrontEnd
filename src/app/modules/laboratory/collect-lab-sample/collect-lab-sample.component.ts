import { Component } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { takeUntil } from 'rxjs';
import { PatientService } from 'src/app/services';
import { IDropDown } from 'src/app/models/interfaces/Dropdown';
import { TestService } from 'src/app/services';
import { SubscriptionManagmentDirective } from 'src/app/shared/directive/subscription-managment.directive';
import { ILabTest } from 'src/app/models/interfaces/addOrUpdate-test';

@Component({
  selector: 'app-collect-lab-sample',
  templateUrl: './collect-lab-sample.component.html',
  styleUrls: ['./collect-lab-sample.component.scss'],
})
export class CollectLabSampleComponent extends SubscriptionManagmentDirective {
  collectionForm!: FormGroup;
  invoiceDescriptionForm!: FormGroup;
  tests: Array<ILabTest> = [];
  testToView: Array<ILabTest> = [];
  patients: Array<IDropDown> = [];
  patientsToShow: Array<IDropDown> = [];

  testStatus: Array<{ value: string; label: string }> = [
    { value: 'Collected', label: 'Collected' },
    { value: 'Pending', label: 'Pending' },
  ];
  submitted = false;

  constructor(
    private readonly patientService: PatientService,
    private readonly fb: FormBuilder,
    private readonly testService: TestService
  ) {
    super();
    this.invoiceDescriptionForm = this.fb.group({
      testId: new FormControl<string | null>(null, [Validators.required]),
      description: new FormControl<number | null>(null, [Validators.required]),
      sample: new FormControl<number | null>(null),
      status: new FormControl<string | null>(null, [Validators.required]),
      sampleId: new FormControl<string | null>(null, [Validators.required]),
    });
    this.collectionForm = this.fb.group({
      patientId: new FormControl<string | null>(null, [Validators.required]),
      testItems: this.fb.array(
        [this.invoiceDescriptionForm],
        Validators.required
      ),
    });
  }

  get testItems(): FormArray {
    return this.collectionForm.get('testItems') as FormArray;
  }

  ngOnInit(): void {
    this.getPatients();
  }


  getPatients() {
    this.patientService.getPatientsDropdown().pipe(takeUntil(this.componetDestroyed)).subscribe({
      next: (x) => {
        this.patients = x;
        console.log('this.patients',this.patients);
      },
      error: (err) => {

      }
    })
  }


  onDescriptionSelect(index: number, labTest: any) {
    console.log(labTest)
    let description = this.testToView.find((x) => x.id === labTest.id);
    this.testItems.at(index).get('description')?.setValue(description?.description);
    this.testItems.at(index).get('sample')?.setValue(description?.testSample);
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


  onPatientSelection(selectPatient:string) {
    this.collectionForm.get('patientId')?.setValue(selectPatient);
    this.testService.getTestByPatientid(selectPatient).pipe(takeUntil(this.componetDestroyed)).subscribe({
      next: (x) => {
        this.tests = x;

      }
    })
  }

  onSearch(event: { query: string }): void {
    const searchTerm = event.query.trim();
    // if (searchTerm.length >= 3) {
    this.patientsToShow = this.patients.filter(x => x.name.toLowerCase().includes(searchTerm));
    // }
  }

  // patientSelect(patient: any) {
  //   console.log('patient', patient, this.descriptions);
  //   this.tests = this.patients.filter((x) => x.patientId == patient);
  //   console.log('this.tests', this.tests);
  //   console.log('this.tests', this.tests);
  // }

  getAutoCompleteValueAndObject(arr: any[]) {
    let result: any[] = [];
    let uniqueIds = new Set();
    arr.forEach((element) => {
      if (!uniqueIds.has(element.patientId)) {
        uniqueIds.add(element.patientId);
        let temp = { id: element.patientId, name: element.patientName };
        result.push(temp);
      }
    });

    return result;
  }

  get f() {
    return this.collectionForm.controls;
  }

  addTestSample() {
    this.submitted = true;
    console.log(this.collectionForm.value);
    if (this.collectionForm.invalid) {
      return;
    }
    // let tokenpayload = {
    //   patientId: this.collectionForm.controls['patientId'].value,
    //   doctorId: this.collectionForm.controls['doctorId'].value,
    //   patientCheckedIn: this.collectionForm.controls['patientCheckedIn'].value ? this.collectionForm.controls['patientCheckedIn'].value : true
    // }
    // console.log('tokenpayload',tokenpayload);
    // this.tokenService.addToken(tokenpayload).pipe(takeUntil(this.componetDestroyed)).subscribe({
    //   next: (x) => {
    //     console.log(x);

    //   },
    //   error: (err) => {

    //   }
    // })
  }

  getInvoice() {
    let invoice = {
      testItems: this.testItems.value.map((x: any) => {
        let invoiceItem = {
          testId: x.testId,
          description: x.description,
          status: x.status,
          sample: x.sample,
          sampleId: x.sampleId,
        };
        return invoiceItem;
      }),
    };
    return invoice;
  }

  addNewInvoiceItem() {
    let newForm = this.fb.group({
      description: new FormControl<string | null>(null, [Validators.required]),
      status: new FormControl<string | null>(null, [Validators.required]),
      sample: new FormControl<string | null>(null, [Validators.required]),
      sampleId: new FormControl<string | null>(null, [Validators.required]),
      testId: new FormControl<string | null>(null, [Validators.required]),
    });
    this.testItems.push(newForm);
  }

  removeinvoiceItem(index: number) {
    this.testItems.removeAt(index);
    let newForm = this.fb.group({
      description: new FormControl<number | null>(null, [Validators.required]),
      testId: new FormControl<string | null>(null, [Validators.required]),
      status: new FormControl<string | null>(null, [Validators.required]),
      sample: new FormControl<string | null>(null, [Validators.required]),
      sampleId: new FormControl<string | null>(null, [Validators.required]),
    });
    if (this.testItems.length < 1) this.testItems.push(newForm);
  }
}
