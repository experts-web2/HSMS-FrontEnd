import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertService } from 'src/app/Services/alert/alert.service';
import { TestService } from 'src/app/Services/test-service/test.service';
import { TestCategoryService } from 'src/app/Services/testCategory-service/test-category.service';
import { IAddOrUpdateTest } from 'src/app/models/interfaces/addOrUpdate-test';
import { ILabTestCategory } from 'src/app/models/interfaces/labTestCategory';

@Component({
  selector: 'app-tests-form',
  templateUrl: './tests-form.component.html',
  styleUrls: ['./tests-form.component.scss']
})
export class TestsFormComponent {
  testForm!: FormGroup;
  categories!: Array<ILabTestCategory>;
  
  constructor(private fb: FormBuilder, private readonly testsService: TestService, private readonly testCategoryService: TestCategoryService, private readonly alertService: AlertService){

    this.testForm = this.fb.group({
      name: new FormControl<string>('', [Validators.required]),
      category: new FormControl<string>('', [Validators.required]),
      description: new FormControl<string>('', [Validators.required]),
      price: new FormControl<number|null>(null, [Validators.required])
    })
    
    this.getTestCategories();
  }


  submitTest(e: any){
    console.log(this.testForm.value);
    let testFormValue = this.testForm.value
    let testToAdd: IAddOrUpdateTest = {
      name: testFormValue.name,
      description: testFormValue.description,
      price: testFormValue.price,
      testCategoryId: testFormValue.category
    } 
    this.testsService.addTest(testToAdd).subscribe({
      next: (x: any) => {
        console.log(x);
        
      },
      error: (err: Error) => {
        this.alertService.error('Something went wrong while adding Lab Test.', 'Error');
      }
    })
    this.testForm.reset();
  }

  getTestCategories(){
    this.testCategoryService.getCategories().subscribe({
      next: (x: any) => {
        console.log(x.data);
        this.categories = x.data        
      },
      error: (err: Error) => {
        this.alertService.error('Something went wrong while getting lab test categories', 'Error');
      }
    })
  }
}
