import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AlertService } from 'src/app/Services/alert/alert.service';
import { TestCategoryService } from 'src/app/Services/testCategory-service/test-category.service';
import { IAddOrUpdateCategory } from 'src/app/models/interfaces/addOrUpdate-Category';

@Component({
  selector: 'app-categories-form',
  templateUrl: './categories-form.component.html',
  styleUrls: ['./categories-form.component.scss']
})
export class CategoriesFormComponent implements OnInit {
  categoryForm!: FormGroup;
  testCategoryId!: string;

  constructor (private fb: FormBuilder, private readonly labTestCategoryService: TestCategoryService, private readonly alertService: AlertService, private readonly activatedRoute: ActivatedRoute){
    this.categoryForm = this.fb.group({
      name: new FormControl<string|null>(null, Validators.required)
    })
  }

  ngOnInit(): void {
    let testCategoryId = this.activatedRoute.snapshot.params['id'];
    if(testCategoryId){ 
      this.testCategoryId = testCategoryId;
      this.setFormForUpdate(this.testCategoryId)
    }
  }

  setFormForUpdate(id: string){

    this.labTestCategoryService.getCategoryById(id).subscribe({
      next: (x: any) => {
        let category: IAddOrUpdateCategory = {name: x.data.name};
        this.categoryForm.controls['name'].setValue(category.name);
        this.alertService.success('Success', 'Lab Test Category was updated successfully');
      },
      error: (err: Error) => {
        this.alertService.error('Error', 'An error occoured while updating Lab Test Category');
      }
    })
  }

  formSubmit(e: any){    
    let value = this.categoryForm.value;
    let categoryToAdd: IAddOrUpdateCategory = {
      name: value.name
    } 
    this.labTestCategoryService.addCategory(categoryToAdd).subscribe({
      next: (x:any) =>{
        this.alertService.success('Success', 'Lab Test Category was added successfully');
        this.categoryForm.reset();
      },
      error: (err: any) =>{
        this.alertService.error('Error', 'An error occoured while adding Lab Test Category');
      }
    })

    console.log(this.categoryForm);    
  }

  updatecategory(){
    let formValue = this.categoryForm.value
    let categoryToUPdate: IAddOrUpdateCategory = {
      name: formValue.name
    }
    this.labTestCategoryService.updateCategory(this.testCategoryId, categoryToUPdate).subscribe({
      next: (x: any) => {

      },
      error: (err: Error) =>  {

      }
    })
  }
}
