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
  base64ImagStr:string = '';
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  tags: any[] = [];

  constructor(private fb:FormBuilder, private dialog:MatDialog) { 

    this.patientForm = this.fb.group({
      mrNum: [''],
      name: ['',Validators.required],
      phoneNum: ['',Validators.required],
      relation: [''],
      gender: [''],
      age: [''],
      registrationDate: [''],
      addTags: [this.tags],
      addPhoto: [this.base64ImagStr]
    });    
  }

  ngOnInit(): void {
  }

  onSubmit(){
    console.log(this.patientForm.value);
    this.patientForm.reset();  
  }
  resetForm():void{
    Object.keys(this.patientForm.value).forEach(key => this.patientForm.value[key] = '');
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our tag
    if (value !== null || value !== '') {
      this.tags.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();
  }
  concatDate(years:string, months:string, days:string){
    console.log({years,months,days});
    let age;
    let date = `${months}-${days}-${years}`;
    age = new Date(date);
    this.patientForm.value.age = age.toLocaleString();
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
      this.base64ImagStr=data._imageAsDataUrl;
      this.patientForm.value.addPhoto = this.base64ImagStr ?? '';

      
    });
  }
 async toBase64(file:any){
    return await new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
  }
 async getUploadImage(file:any){
   
    let img = await this.toBase64(file.target.files[0]);
    console.log(img)
  }
}