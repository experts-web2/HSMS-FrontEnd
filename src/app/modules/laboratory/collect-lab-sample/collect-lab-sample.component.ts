import { Component } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { takeUntil } from 'rxjs';
import { AlertService, PatientService, TestCategoryService } from 'src/app/services';
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
  testCategory: Array<IDropDown> = [];
  patientsToShow: Array<IDropDown> = [];
  submitted = false;
  category = '';
  testCategoryToShow: Array<IDropDown> = [];
  generateId: string='';

  constructor(
    private readonly patientService: PatientService,
    private readonly fb: FormBuilder,
    private readonly testService: TestService,
    private readonly testCategoryService: TestCategoryService,
    private readonly alertService: AlertService,
  ) {
    super();
    this.invoiceDescriptionForm = this.fb.group({
      testId: new FormControl<string | null>(null, [Validators.required]),
      sample: new FormControl<number | null>(null),
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
    this.getTestCategory();
  }


  getPatients() {
    
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

  selectCategory(categoryId: string) {
    console.log({ categoryId })
    this.category = categoryId;
  }

  GenerateSampleID() {
    let payload = {
      patientId: this.collectionForm.controls['patientId'].value,
      testCategoryId: this.category
    }
    this.testService.generateTestSampleID(payload).pipe(takeUntil(this.componetDestroyed)).subscribe(
      {
        next: (x) => {
          console.log(x);
          this.generateId = x
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


  onPatientSelection(selectPatient: string) {
    this.collectionForm.get('patientId')?.setValue(selectPatient);
    this.testService.getTestByPatientid(selectPatient).pipe(takeUntil(this.componetDestroyed)).subscribe({
      next: (x) => {
        this.tests = x;
      }
    })
  }

  onPatientSearch(event: { query: string }): void {
    const searchTerm = event.query.trim();
    if (searchTerm.length >= 3) {
      this.patientService.getPatientsDropdown(searchTerm).pipe(takeUntil(this.componetDestroyed)).subscribe({
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

  get f() {
    return this.collectionForm.controls;
  }

  addTestSample() {
    this.submitted = true;
    console.log(this.collectionForm.value);
    // if (this.collectionForm.invalid) {
    //   return;
    // }
    this.testService.addPatientTestSamples(this.collectionForm.value).pipe(takeUntil(this.componetDestroyed)).subscribe(
      {
        next: (x) => {
          this.alertService.success('Test Sample added successfully', 'Success');
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
        };
        return invoiceItem;
      }),
    };
    return invoice;
  }

  addNewInvoiceItem() {
    let newForm = this.fb.group({
      sample: new FormControl<string | null>(null, [Validators.required]),
      sampleId: new FormControl<string | null>(null, [Validators.required]),
      testId: new FormControl<string | null>(null, [Validators.required]),
    });
    this.testItems.push(newForm);
  }

  removeinvoiceItem(index: number) {
    this.testItems.removeAt(index);
    let newForm = this.fb.group({
      testId: new FormControl<string | null>(null, [Validators.required]),
      sample: new FormControl<string | null>(null, [Validators.required]),
      sampleId: new FormControl<string | null>(null, [Validators.required]),
    });
    if (this.testItems.length < 1) this.testItems.push(newForm);
  }
}
