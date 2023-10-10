import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ISaltRequest } from 'src/app/models/interfaces/saltRequest';
import { AlertService } from 'src/app/services';
import { MedicineSaltsService } from 'src/app/services/medicine-salts/medicine-salts.service';

@Component({
  selector: 'app-medicine-salts-form',
  templateUrl: './medicine-salts-form.component.html',
  styleUrls: ['./medicine-salts-form.component.scss']
})
export class MedicineSaltsFormComponent implements OnInit {
  medicineSaltForm!: FormGroup;
  salt: any;
  action: string;

  constructor(private fb: FormBuilder,
    private readonly alertService: AlertService,
    public config: DynamicDialogConfig,
    public ref: DynamicDialogRef,
    private readonly medicineSaltService: MedicineSaltsService
    ) {
    this.salt = this.config?.data?.salt;
    this.action = this.config?.data?.action
  }

  ngOnInit(): void {
    this.medicineSaltForm = this.fb.group({
      name: new FormControl<string | null>(null, Validators.required)
    })

    if (this.action === 'update' && this.salt) {
      this.medicineSaltForm.patchValue(
        {
          name: this.salt.name,
        });
    }
  }

  formSubmit(e: any) {
    let value = this.medicineSaltForm.value;
    let saltpayLoad: ISaltRequest = {
      name: value.name
    }
    if (this.action === 'add') {
      this.medicineSaltService.addSalt(saltpayLoad).subscribe({
        next: (x: any) => {
          this.alertService.success('Success', 'Medicine salt was added successfully');
          this.medicineSaltForm.reset();
          this.ref.close(true);
        },
        error: (err: any) => {
          this.alertService.error('Error', 'An error occoured while adding Medicine salt');
        }
      })
    } else {
      this.medicineSaltService.updateSalt(this.salt.id, saltpayLoad).subscribe({
        next: (x: any) => {
          this.alertService.success('Success', 'Medicine salt was update successfully');
          this.medicineSaltForm.reset();
          this.ref.close(true);
        },
        error: (err: Error) => {
          this.alertService.error('Error', 'An error occoured while update Medicine salt');

        }
      })
    }
  }
}
