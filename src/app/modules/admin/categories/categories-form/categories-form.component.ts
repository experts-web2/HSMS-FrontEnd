import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { takeUntil } from 'rxjs';
import { AlertService,TestCategoryService } from 'src/app/services';
import { IAddOrUpdateCategory } from 'src/app/models/interfaces/addOrUpdate-Category';
import { SubscriptionManagmentDirective } from 'src/app/shared/directive/subscription-managment.directive';


@Component({
  selector: 'app-categories-form',
  templateUrl: './categories-form.component.html',
  styleUrls: ['./categories-form.component.scss']
})
export class CategoriesFormComponent extends SubscriptionManagmentDirective implements OnInit {
  categoryForm!: FormGroup;
  testCategoryId!: string;
  category: any;
  action: any;

  constructor(private fb: FormBuilder,
    private readonly labTestCategoryService: TestCategoryService,
    private readonly alertService: AlertService,
    public config: DynamicDialogConfig,
    public ref: DynamicDialogRef,) {
      super();
    this.category = this.config?.data?.category;
    this.action = this.config?.data?.action
  }

  ngOnInit(): void {
    this.categoryForm = this.fb.group({
      name: new FormControl<string | null>(null, Validators.required)
    })

    if (this.action === 'update' && this.category) {
      this.categoryForm.patchValue(
        {
          name: this.category.name,
        });
    }
  }

  formSubmit(e: any) {
    let value = this.categoryForm.value;
    let categorypayLoad: IAddOrUpdateCategory = {
      name: value.name
    }
    if (this.action === 'add') {
      this.labTestCategoryService.addCategory(categorypayLoad).pipe(takeUntil(this.componetDestroyed)).subscribe({
        next: (x: any) => {
          this.alertService.success('Success', 'Lab Test Category was added successfully');
          this.categoryForm.reset();
          this.ref.close(true);
        },
        error: (err: any) => {
          this.alertService.error('Error', 'An error occoured while adding Lab Test Category');
        }
      })
    } else {
      this.labTestCategoryService.updateCategory(this.category.id, categorypayLoad).pipe(takeUntil(this.componetDestroyed)).subscribe({
        next: (x: any) => {
          this.alertService.success('Success', 'Lab Test Category was update successfully');
          this.categoryForm.reset();
          this.ref.close(true);
        },
        error: (err: Error) => {
          this.alertService.error('Error', 'An error occoured while update Lab Test Category');

        }
      })
    }
  }
}
