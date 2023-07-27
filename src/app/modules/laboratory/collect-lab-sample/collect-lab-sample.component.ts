import { Component, Inject } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { IDropDown } from 'src/app/models/interfaces/Dropdown';
import { PatientService } from 'src/app/Services/patient/patient.service';
import { TestService } from 'src/app/Services/test-service/test.service';
import { SubscriptionManagmentDirective } from 'src/app/Shared/directive/subscription-managment.directive';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'app-collect-lab-sample',
  templateUrl: './collect-lab-sample.component.html',
  styleUrls: ['./collect-lab-sample.component.scss']
})
export class CollectLabSampleComponent extends SubscriptionManagmentDirective {
  collectionForm!: FormGroup;
  invoiceDescriptionForm!: FormGroup;
  tests: Array<IDropDown> = [];
  descriptions: Array<any> = [];
  patients: Array<any> = [];
  patientsToShow: Array<any> = [];

  testStatus: Array<{ value: string, label: string }> = [{ value: 'Collected', label: 'Collected' }, { value: 'Pending', label: 'Pending' }]
  submitted = false;

  constructor(
    private readonly patientService: PatientService,
    private readonly fb: FormBuilder,
    private readonly testService: TestService) {
    super();
    this.invoiceDescriptionForm = this.fb.group({
      testId: new FormControl<string | null>(null, [Validators.required]),
      description: new FormControl<number | null>(null, [Validators.required]),
      sample: new FormControl<number | null>(null),
      status: new FormControl<string | null>(null, [Validators.required]),
      sampleId: new FormControl<string | null>(null, [Validators.required]),
    })
    this.collectionForm = this.fb.group({
      patientId: new FormControl<string | null>(null, [Validators.required]),
      testItems: this.fb.array([this.invoiceDescriptionForm], Validators.required),
    });

  }

  get testItems(): FormArray {
    return this.collectionForm.get('testItems') as FormArray;
  }



  ngOnInit(): void {
    this.getPatients();
    this.getTests();
  }

  getTests() {
    this.testService.getTests().pipe(takeUntil(this.componetDestroyed)).subscribe({
      next: (x) => {
        console.log(x);
        // this.tests = x;
        console.log('this.tests', this.tests);
        this.descriptions = x;
      },
      error: (err) => {

      }
    })
  }

  getPatients() {
    this.testService.getTestPatientDropdown().pipe(takeUntil(this.componetDestroyed)).subscribe({
      next: (x) => {
        this.patients = x;
        this.patientsToShow = this.getAutoCompleteValueAndObject(x);
      },
      error: (err) => {

      }
    })
  }

  onDescriptionSelect(index: number, descriptionId: string) {
    let description = this.descriptions.find(x => x.id === descriptionId);
    this.testItems.at(index).get('description')?.setValue(description?.description);
    this.testItems.at(index).get('sample')?.setValue(description?.testSample);
  }



  patientSelect(patient: any) {
    console.log('patient', patient, this.descriptions);
    this.tests = this.patients.filter(x => x.patientId == patient);
    console.log('this.tests',this.tests);
    console.log('this.tests', this.tests);
  }

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


  get f() { return this.collectionForm.controls; }

  addTestSample() {
    this.submitted = true;
    console.log(this.collectionForm.value)
    if (this.collectionForm.invalid) {
      return
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
      sampleId: new FormControl<string | null>(null, [Validators.required]),
      testId: new FormControl<string | null>(null, [Validators.required]),
    })
    this.testItems.push(newForm)
  }

  removeinvoiceItem(index: number) {
    this.testItems.removeAt(index);
    let newForm = this.fb.group({
      description: new FormControl<number | null>(null, [Validators.required]),
      testId: new FormControl<string | null>(null, [Validators.required]),
      status: new FormControl<string | null>(null, [Validators.required]),
      sample: new FormControl<string | null>(null, [Validators.required]),
      sampleId: new FormControl<string | null>(null, [Validators.required]),
    })
    if (this.testItems.length < 1) this.testItems.push(newForm);
  }
}
