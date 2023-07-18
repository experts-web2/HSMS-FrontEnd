import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertService } from 'src/app/Services/alert/alert.service';
import { TestService } from 'src/app/Services/test-service/test.service';
import { TestCategoryService } from 'src/app/Services/testCategory-service/test-category.service';
import { IAddOrUpdateTest } from 'src/app/models/interfaces/addOrUpdate-test';
import { ILabTestCategory } from 'src/app/models/interfaces/labTestCategory';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ILabeTest } from 'src/app/models/interfaces/labTest';


@Component({
  selector: 'app-tests-form',
  templateUrl: './tests-form.component.html',
  styleUrls: ['./tests-form.component.scss']
})
export class TestsFormComponent implements OnInit  {
  testForm!: FormGroup;
  categories!: Array<ILabTestCategory>;
  test: ILabeTest;
  action: string;

  constructor(private fb: FormBuilder,
    private readonly testsService: TestService,
    private readonly testCategoryService: TestCategoryService,
    private readonly alertService: AlertService,
    public readonly config: DynamicDialogConfig,
    public readonly ref: DynamicDialogRef,
  ) {
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
      normalValues: new FormControl<number | null>(null, [Validators.required])
    })

    if(this.action === 'update' && this.test){
      this.testForm.patchValue(
        {
          name: this.test.name,
          testCategoryId: this.test.testCategoryId,
          description: this.test.description,
          price: this.test.price,
          normalValues: this.test.normalValues,
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
      testCategoryId: testFormValue.testCategoryId
    }
    if(this.action === 'add'){
      this.testsService.addTest(testToAdd).subscribe({
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
      this.testsService.updateTest(this.test.id,testToAdd).subscribe({
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
    this.testCategoryService.getCategories().subscribe({
      next: (x: any) => {
        this.categories = x.data
      },
      error: (err: Error) => {
        this.alertService.error('Something went wrong while getting lab test categories', 'Error');
      }
    })
  }
}
