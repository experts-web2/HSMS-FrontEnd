import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import {COMMA, ENTER} from '@angular/cdk/keycodes'
import { MatDialog } from '@angular/material/dialog';
import { CameraComponent } from 'src/app/camera/camera.component';

@Component({
  selector: 'app-patient-form',
  templateUrl: './patient-form.component.html',
  styleUrls: ['./patient-form.component.scss']
})
export class PatientFormComponent implements OnInit {
  patientForm:any;
  relations:any[] = [{value:'Father'},{value:'Mother'},{value:'Sister'},{value:'Brother'},{value:'Son'},{value:'Daughter'},{value:'Wife'},{value:'Other'}];
  addOnBlur = true;
  age:string = 'age';
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  tags: any[] = [];

  constructor(private fb:FormBuilder, private dialog:MatDialog) { 

    this.patientForm = this.fb.group({
      mrNum: [''],
      name: ['',Validators.required],
      phoneNum: ['',Validators.required],
      relation: [''],
      gender: [''],
      age: [this.age],
      registrationDate: [''],
      addTags: [this.tags],
      addPhoto: ['']
    });
    
  }

  ngOnInit(): void {
  }

  onSubmit(){
    console.log(this.patientForm.value);    
  }


  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our tag
    if (value) {
      this.tags.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  remove(tag: any): void {
    const index = this.tags.indexOf(tag);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }
  openCamera(){
    const camera = this.dialog.open(CameraComponent,{
      width:'400px'
    });
    camera.afterClosed().subscribe(data=>{
      console.log(data._imageAsDataUrl);
      
    });
  }
}