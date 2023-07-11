import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-shifts',
  templateUrl: './shifts.component.html',
  styleUrls: ['./shifts.component.scss']
})
export class ShiftsComponent {
  shiftForm!: FormGroup;
  
  constructor(private fb: FormBuilder){
    this.shiftForm = this.fb.group({
      name: new FormControl<string>('', [Validators.required]),
      startTime: new FormControl<Date|null>(null, [Validators.required]),
      endTime: new FormControl<Date|null>(null, [Validators.required]),
      type: new FormControl<number|null>(null, [Validators.required])
    })
  }


  submitShift(){
    console.log(this.shiftForm.value);
    
    this.shiftForm.reset();
  }
}
