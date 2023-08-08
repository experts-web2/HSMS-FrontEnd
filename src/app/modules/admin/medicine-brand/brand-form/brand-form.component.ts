import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SubscriptionManagmentDirective } from 'src/app/shared/directive/subscription-managment.directive';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { takeUntil } from 'rxjs';
import { AlertService, MedicineBrandService } from 'src/app/services';
import { IAddOrUpdateBrand } from 'src/app/models/interfaces/medicine-brand';

@Component({
  selector: 'app-brand-form',
  templateUrl: './brand-form.component.html',
  styleUrls: ['./brand-form.component.scss']
})
export class BrandFormComponent extends SubscriptionManagmentDirective implements OnInit {
  medicineBrandForm!: FormGroup;
  brand: any;
  action: string;

  constructor(private fb: FormBuilder,
    private readonly alertService: AlertService,
    public config: DynamicDialogConfig,
    public ref: DynamicDialogRef,
    private readonly medicineBrandService: MedicineBrandService
    ) {
      super();
    this.brand = this.config?.data?.brand;
    this.action = this.config?.data?.action
  }

  ngOnInit(): void {
    this.medicineBrandForm = this.fb.group({
      name: new FormControl<string | null>(null, Validators.required)
    })

    if (this.action === 'update' && this.brand) {
      this.medicineBrandForm.patchValue(
        {
          name: this.brand.name,
        });
    }
  }

  formSubmit(e: any) {
    let value = this.medicineBrandForm.value;
    let brandpayLoad: IAddOrUpdateBrand = {
      name: value.name
    }
    if (this.action === 'add') {
      this.medicineBrandService.addBrand(brandpayLoad).pipe(takeUntil(this.componetDestroyed)).subscribe({
        next: (x: any) => {
          this.alertService.success('Success', 'Lab Test Brand was added successfully');
          this.medicineBrandForm.reset();
          this.ref.close(true);
        },
        error: (err: any) => {
          this.alertService.error('Error', 'An error occoured while adding Lab Test Brand');
        }
      })
    } else {
      this.medicineBrandService.updateBrand(this.brand.id, brandpayLoad).pipe(takeUntil(this.componetDestroyed)).subscribe({
        next: (x: any) => {
          this.alertService.success('Success', 'Lab Test Brand was update successfully');
          this.medicineBrandForm.reset();
          this.ref.close(true);
        },
        error: (err: Error) => {
          this.alertService.error('Error', 'An error occoured while update Lab Test Brand');

        }
      })
    }
  }
}
