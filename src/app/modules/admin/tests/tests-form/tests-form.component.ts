import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertService } from 'src/app/Services/alert/alert.service';
import { TestService } from 'src/app/Services/test-service/test.service';
import { TestCategoryService } from 'src/app/Services/testCategory-service/test-category.service';
import { IAddOrUpdateTest } from 'src/app/models/interfaces/addOrUpdate-test';
import { ILabTestCategory } from 'src/app/models/interfaces/labTestCategory';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ILabeTest } from 'src/app/models/interfaces/labTest';
import { TestsReportTime, TestsSample } from 'src/app/constants/Constants/testsConsts';
import { SubscriptionManagmentDirective } from 'src/app/Shared/directive/subscription-managment.directive';
import { takeUntil } from 'rxjs';


@Component({
  selector: 'app-tests-form',
  templateUrl: './tests-form.component.html',
  styleUrls: ['./tests-form.component.scss']
})
export class TestsFormComponent extends SubscriptionManagmentDirective implements OnInit  {
  testForm!: FormGroup;
  categories!: Array<ILabTestCategory>;
  testsSample = TestsSample;
  TestsReportTime = TestsReportTime
  test: ILabeTest;
  action: string;

  constructor(private fb: FormBuilder,
    private readonly testsService: TestService,
    private readonly testCategoryService: TestCategoryService,
    private readonly alertService: AlertService,
    public readonly config: DynamicDialogConfig,
    public readonly ref: DynamicDialogRef,
  ) {
    super();
    this.test = this.config.data.test;
    this.action = this.config.data.action
    this.getTestCategories();
  }
  ngOnInit(): void {
    this.testForm = this.fb.group({
      name: new FormControl<string>('', [Validators.required]),
      testCategoryId: new FormControl<string>('', [Validators.required]),
      description: new FormControl<string>('', [Validators.required]),
      price: new FormControl<number | null>(null, [Validators.required]),
      normalValues: new FormControl<number | null>(null, [Validators.required]),
      testSample: new FormControl<string>('', [Validators.required]),
      reportingTime: new FormControl<string>('', [Validators.required]),
    })

    if(this.action === 'update' && this.test){
      this.testForm.patchValue(
        {
          name: this.test.name,
          testCategoryId: this.test.testCategoryId,
          description: this.test.description,
          price: this.test.price,
          normalValues: this.test.normalValues,
          testSample: this.test.testSample,
          reportingTime: this.test.reportingTime,
        });
    }
  }


  submitTest() {
    let testFormValue = this.testForm.value
    let testToAdd: IAddOrUpdateTest = {
      name: testFormValue.name,
      description: testFormValue.description,
      price: testFormValue.price,
      normalValues: testFormValue.normalValues,
      testCategoryId: testFormValue.testCategoryId,
      testSample: testFormValue.testSample,
      reportingTime: testFormValue.reportingTime,
    }
    if(this.action === 'add'){
      this.testsService.addTest(testToAdd).pipe(takeUntil(this.componetDestroyed)).subscribe({
        next: (x: any) => {
          this.alertService.success('Test added successfully', 'Success');
          this.testForm.reset();
          this.ref.close(true);
        },
        error: (err: Error) => {
          this.alertService.error('Something went wrong while adding Lab Test.', 'Error');
        }
      })
    }else{
      this.testsService.updateTest(this.test.id,testToAdd).pipe(takeUntil(this.componetDestroyed)).subscribe({
        next: (x: any) => {
          this.alertService.success('Test update successfully', 'Success');
          this.testForm.reset();
          this.ref.close(true);
        },
        error: (err: Error) => {
          this.alertService.error('Something went wrong while update Lab Test.', 'Error');
        }
      })
    }
  }

  getTestCategories() {
    this.testCategoryService.getCategories().pipe(takeUntil(this.componetDestroyed)).subscribe({
      next: (x: any) => {
        this.categories = x.data
      },
      error: (err: Error) => {
        this.alertService.error('Something went wrong while getting lab test categories', 'Error');
      }
    })
  }
}
