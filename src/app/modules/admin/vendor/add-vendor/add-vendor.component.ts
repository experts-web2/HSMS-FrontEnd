import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { IVendor, IVendorRequest } from 'src/app/models/interfaces/vendorRequest';
import { AlertService, VendorService } from 'src/app/services';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';


@Component({
  selector: 'app-add-vendor',
  templateUrl: './add-vendor.component.html',
  styleUrls: ['./add-vendor.component.scss']
})
export class AddVendorComponent implements OnInit {
  vendorForm!: FormGroup;
  vendorModel!: IVendorRequest;
  vendor: IVendor;
  action: string;

  constructor(
    private readonly fb: FormBuilder,
    private readonly vendorService: VendorService,
    private readonly alertService: AlertService,
    public config: DynamicDialogConfig,
    public ref: DynamicDialogRef
  ) {

    this.vendor = this.config?.data?.vendor;
    this.action = this.config?.data?.action;

    this.vendorForm = this.fb.group({
      firstName: new FormControl<string | null>(null, [Validators.required]),
      lastName: new FormControl<string | null>(null),
      companyName: new FormControl<string | null>(null),
      phoneNumber: new FormControl<string | null>(null),
      address: new FormControl<string | null>(null),
    });

    if (this.action === 'update' && this.vendor) {
      this.vendorForm.patchValue(
        {
          firstName: this.vendor.firstName,
          lastName: this.vendor.lastName,
          companyName: this.vendor.companyName,
          phoneNumber: this.vendor.phoneNumber,
          address: this.vendor.address,
        });
    }else {
      this.action = 'add'
    }
  }

  ngOnInit(): void { }

  addVendor() {
    this.vendorModel = {
      firstName: this.vendorForm.controls['firstName'].value,
      lastName: this.vendorForm.controls['lastName'].value,
      companyName: this.vendorForm.controls['companyName'].value,
      phoneNumber: this.vendorForm.controls['phoneNumber'].value,
      address: this.vendorForm.controls['address'].value,
    };
    if(this.action === 'add'){
      this.vendorService.addVendor(this.vendorModel).subscribe({
        next: (x) => {
          this.alertService.success('Vendor Added Successfully.');
          this.ref.close(true);
        },
        error: (err) => {
          this.alertService.error('An error occoured shile adding vendor');
        },
      });
    }else{
      this.vendorService.updateVendor(this.vendor.id,this.vendorModel).subscribe({
        next: (x) => {
          this.alertService.success('Vendor Added Successfully.');
          this.ref.close(true);
        },
        error: (err) => {
          this.alertService.error('An error occoured shile adding vendor');
        },
      });
    }
  }
}
