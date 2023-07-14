import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-token-modal',
  templateUrl: './add-token-modal.component.html',
  styleUrls: ['./add-token-modal.component.scss']
})
export class AddTokenModalComponent implements OnInit {
  selectedDoctor = ''
  selectedPayment = ''
  addTokenForm!:FormGroup;
  description=[1]


  constructor(public dialogRef: MatDialogRef<AddTokenModalComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.addTokenForm = new FormGroup({
      patient: new FormControl('', [Validators.required,Validators.minLength(4)]),
      token: new FormControl('', [Validators.required,Validators.minLength(4)]),
      doctor: new FormControl('', [Validators.required]),
      pulse_rate: new FormControl('', [Validators.required,Validators.email, Validators.pattern('[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z, A-Z]{2,3}')]),
      temperature: new FormControl('', [Validators.required,Validators.minLength(11)]),
      bp: new FormControl('', [Validators.required]),
      respiratory: new FormControl('', [Validators.required]),
      sugar: new FormControl('', [Validators.required]),
      weight: new FormControl('', [Validators.required]),
      height: new FormControl('', [Validators.required]),
      bmi: new FormControl('', [Validators.required]),
      bsa: new FormControl('', [Validators.required]),
      saturation: new FormControl('', [Validators.required]),
      invoice: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      amount: new FormControl('', [Validators.required]),
      discount: new FormControl('', [Validators.required]),
      total_discount: new FormControl('', [Validators.required]),
      payment_notification: new FormControl('', [Validators.required]),
      checked_in: new FormControl('', [Validators.required]),
      confirmation: new FormControl('', [Validators.required]),
    }); 
   }

  ngOnInit(): void { }

  cancel() {
    this.dialogRef.close();
  }


  doctors = [{
    id: 'Ahsan',
    label: 'Dr Ahsan'
  },
  {
    id: 'Waqas',
    label: 'Dr Waqas'
  },
  {
    id: 'Zohaib',
    label: 'Dr Zohaib'
  }, {
    id: 'Faisal',
    label: 'Dr Faisal'
  }, {
    id: 'Inaam',
    label: 'Dr Inaam'
  }, {
    id: 'Mohsin',
    label: 'Dr Mohsin'
  }, {
    id: 'Abdullah',
    label: 'Dr Abdullah'
  }]
  patients=['inam','mohsin']

  paymentType = [{ id: 'Cash', label: 'Cash' }, { id: 'Card', label: 'Card' }, { id: 'Cash', label: 'Cheque' },{ id: 'Online', label: 'Online Payment' }]

addToken(){
}

addNew(){
  this.description.push(1)
}

}
