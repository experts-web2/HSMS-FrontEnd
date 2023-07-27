import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { VendorService } from 'src/app/Services/vendor.service';
import { IVendorRequest } from 'src/app/models/interfaces/vendorRequest';
import { AlertService } from '../../../Services/alert/alert.service';

@Component({
  selector: 'app-add-vendor',
  templateUrl: './add-vendor.component.html',
  styleUrls: ['./add-vendor.component.scss'],
  standalone: true,
  providers: [],
  imports: [FormsModule, ReactiveFormsModule, MatDialogModule]
})
export class AddVendorComponent implements  OnInit {

  vendorForm!: FormGroup;
  vendorModel!: IVendorRequest;

  constructor(private readonly fb: FormBuilder, private readonly vendorService: VendorService, private readonly dialog: MatDialogRef<AddVendorComponent>, private readonly alertService: AlertService){
    this.vendorForm = this.fb.group({
      firstName: new FormControl<string | null>(null, [Validators.required]),
      lastName: new FormControl<string | null>(null),
      companyName: new FormControl<string | null>(null),
      phoneNumber: new FormControl<string | null>(null),
      address: new FormControl<string | null>(null)
    });
  }

  ngOnInit(): void {
    
  }


  addVendor(){
    if(this.vendorForm.invalid) {
      this.alertService.error('Please provide required fields')
      return
    }

    this.vendorModel = {
      firstName: this.vendorForm.controls['firstName'].value,
      lastName: this.vendorForm.controls['lastName'].value,
      companyName: this.vendorForm.controls['companyName'].value,
      phoneNumber: this.vendorForm.controls['phoneNumber'].value,
      address: this.vendorForm.controls['address'].value      
    }

    this.vendorService.addVendor(this.vendorModel).subscribe({
      next: (x) => {
        this.alertService.success('Vendor Added Successfully.');
        this.dialog.close(true);
      },
      error: (err) => {
        this.alertService.error('An error occoured shile adding vendor');
      }
    })
  }


}
