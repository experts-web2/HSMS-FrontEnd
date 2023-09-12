import { Component } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { takeUntil } from 'rxjs';
import { AlertService, PatientService, PatientTestService, TestCategoryService } from 'src/app/services';
import { IDropDown } from 'src/app/models/interfaces/Dropdown';
import { TestService } from 'src/app/services';
import { SubscriptionManagmentDirective } from 'src/app/shared/directive/subscription-managment.directive';
import { ILabTest } from 'src/app/models/interfaces/addOrUpdate-test';
import { DialogService } from 'primeng/dynamicdialog';
import { SampleCollectionPrintComponent } from '../lab-prints/sample-collection-print/sample-collection-print.component';
import { ITestSample } from 'src/app/models/interfaces/test-samples';

@Component({
  selector: 'app-collect-lab-sample',
  templateUrl: './collect-lab-sample.component.html',
  styleUrls: ['./collect-lab-sample.component.scss'],
})
export class CollectLabSampleComponent extends SubscriptionManagmentDirective {
  collectionForm!: FormGroup;
  tests: Array<ILabTest> = [];
  testToView: Array<ILabTest> = [];
  patients: Array<IDropDown> = [];
  testCategory: Array<IDropDown> = [];
  patientsToShow: Array<any> = [];
  submitted = false;
  category='';
  testCategoryToShow: Array<IDropDown> = [];
  generateId: string='';

  constructor(
    private readonly fb: FormBuilder,
    private readonly testCategoryService: TestCategoryService,
    private readonly alertService: AlertService,
    private readonly patientTestService: PatientTestService,
    private readonly dialogService: DialogService
  ) {
    super();
    this.collectionForm = this.fb.group({
      patientId: new FormControl<string | null>(null, [Validators.required]),
      testItems: this.fb.array(
        [],
        Validators.required
      ),
    });
  }

  get testItems(): FormArray {
    return this.collectionForm.get('testItems') as FormArray;
  }

  get patientId(): AbstractControl {
    return this.collectionForm.get('patientId') as AbstractControl;
  }

  ngOnInit(): void {
    this.getTestCategory();
  }


  getTestCategory() {
    this.testCategoryService.getTestCategoryList().pipe(takeUntil(this.componetDestroyed)).subscribe({
      next: (x) => {
        this.testCategory = x;
        console.log('this.patients', this.testCategory);
      },
      error: (err) => {

      }
    })
  }

  getLabTestItem(): FormGroup{
    return this.fb.group({
      testId: new FormControl<string | null>(null, [Validators.required]),
      labTest: new FormControl<ILabTest | null>(null),
      testCategory: new FormControl<string | null>(null),
      sample: new FormControl<number | null>(null),
      sampleId: new FormControl<string | null>(null, [Validators.required]),
      patientTestInvoiceItemId: new FormControl<string | null>(null, [Validators.required]),
    });
  }

  selectCategory(categoryId: string) {
    console.log({ categoryId })
    this.category = categoryId;
  }

  generateSampleID(category?: string) {
    let payload = {
      patientId: this.collectionForm.controls['patientId'].value,
      testCategoryId: category ?? this.category
    }

    this.patientTestService.generateTestSampleID(payload).pipe(takeUntil(this.componetDestroyed)).subscribe(
      {
        next: (x) => {
          console.log(x);
          this.generateId = x.sampleId

          this.alertService.success('Sample Id Generate successfully', 'Success');

        },
        error: (err) => {
          console.log('errrr')
          this.alertService.error('Something went wrong while generating sample id.', 'Error');
        }
      }
    )
  }


  onTestSelect(index: number, labTest: any) {
    console.log(labTest)
    let description = this.testToView.find((x) => x.id === labTest.id);
    this.testItems.at(index).get('testId')?.setValue(description?.id);
    this.testItems.at(index).get('sample')?.setValue(description?.testSample);
    this.testItems.at(index).get('patientTestInvoiceItemId')?.setValue(description?.patientTestInvoiceItemId);
  }

  onTestSearch(event: any) {
    console.log(event.query);
    const query = event.query.trim().toLowerCase();
    this.testToView = this.tests.filter(
      (test) =>
        test.name.toLowerCase().includes(query) || // Filter by name
        test.code.toString().includes(query) // Filter by code
    );
  }


  onPatientSelection(invoiceId: string, patientId: string) {
    this.patientTestService.getLabtestsBytodayInvoicedByPatientid(invoiceId).pipe(takeUntil(this.componetDestroyed)).subscribe({
      next: (x) => {
        this.tests = x;
        this.clearForm();
        this.collectionForm.get('patientId')?.setValue(patientId);
        this.loadPatientTests(x);
      }
    })
  }

  clearForm(){
    this.collectionForm.reset();
    this.testItems.clear();
  }

  onPatientSearch(event: { query: string }): void {
    const searchTerm = event.query.trim();
    if (searchTerm.length >= 3) {
      this.patientTestService.patientTestInvoice(searchTerm).pipe(takeUntil(this.componetDestroyed)).subscribe({
        next: (x) => {
          this.patientsToShow = x;
          console.log('this.patients', this.patients);
        },
        error: (err) => {
  
        }
      })
    }
  }

  onSearchCategory(event: { query: string }): void {
    const searchTerm = event.query.trim();
    // if (searchTerm.length >= 3) {
    this.testCategoryToShow = this.testCategory.filter(x => x.name.toLowerCase().includes(searchTerm));
    // }
  }

  loadPatientTests(tests: Array<ILabTest>){
    for (const test of tests) {
      this.testMapper(test);
    }
  }

  testMapper(test: ILabTest){
    let testRow = this.getLabTestItem();
    let valueSetter = (controllName: string, value: any) => testRow.controls[controllName].setValue(value);
    valueSetter("testId", test.id);
    valueSetter("sample", test.testSample);
    valueSetter("patientTestInvoiceItemId", test.patientTestInvoiceItemId);
    valueSetter("labTest", test);
    valueSetter("testCategory", test.testCategoryId);
    this.testItems.push(testRow);
  }

  get f() {
    return this.collectionForm.controls;
  }

  addTestSample() {
    this.submitted = true;
    if (this.collectionForm.invalid) {
      return;
    }
    this.patientTestService.addPatientTestSamples(this.collectionForm.value).pipe(takeUntil(this.componetDestroyed)).subscribe(
      {
        next: (x) => {
          this.alertService.success('Test Sample added successfully', 'Success');
          this.collectionForm.reset();
          console.log(x);

        },
        error: (err) => {

        }
      }
    )
  }

  getInvoice() {
    let invoice = {
      testItems: this.testItems.value.map((x: any) => {
        let invoiceItem = {
          testId: x.testId,
          sample: x.sample,
          sampleId: x.sampleId,
          patientTestInvoiceItemId: x.patientTestInvoiceItemId,
        };
        return invoiceItem;
      }),
    };
    return invoice;
  }

  addNewInvoiceItem() {
    this.testItems.push(this.getLabTestItem());
  }

  GenerateSampleIDForField(index: number){
    let category = this.testItems.at(index).get('testCategory')?.value ?? '';
    let payload = {
      patientId: this.collectionForm.controls['patientId'].value,
      testCategoryId: category
    }

    this.patientTestService.generateTestSampleID(payload).pipe(takeUntil(this.componetDestroyed)).subscribe(
      {
        next: (x) => {
          this.testItems.at(index).get('sampleId')?.setValue(x.sampleId)
          this.alertService.success('Sample Id Generate successfully', 'Success');
        },
        error: (err) => {
          this.alertService.error('Something went wrong while generating sample id.', 'Error');
        }
      }
    )
  }

  saveAndPrint(invoiceId: string, testSamples: Array<ITestSample>){
    this.dialogService.open(SampleCollectionPrintComponent,{
      width: '70%',
      height: '90%',
      data: {invoiceId: invoiceId, samples: testSamples}
    })
  }

  removeinvoiceItem(index: number) {
    this.testItems.removeAt(index);

    if (this.testItems.length < 1) this.testItems.push(this.getLabTestItem());
  }
}
