import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CameraComponent } from 'src/app/modules/camera/camera.component';
import { PatientService } from 'src/app/services';
import { IAddOrUpdatePatient } from 'src/app/models/interfaces/addOrUodate-Patient';
import { AlertService } from 'src/app/services';
import { Relations } from 'src/app/constants/Constants/PatientRelatons';
import { takeUntil } from 'rxjs';
import { SubscriptionManagmentDirective } from 'src/app/shared/directive/subscription-managment.directive';
import { FileUploadService } from 'src/app/services/fileUpload/file-upload.service';

@Component({
  selector: 'app-patient-form',
  templateUrl: './patient-form.component.html',
  styleUrls: ['./patient-form.component.scss'],
})
export class PatientFormComponent
  extends SubscriptionManagmentDirective
  implements OnInit
{
  patientForm!: FormGroup;
  relations: any[] = [
    { label: 'Father', value: Relations.Parent },
    { label: 'Mother', value: Relations.Parent },
    { label: 'Sister', value: Relations.Sibling },
    { label: 'Brother', value: Relations.Sibling },
    { label: 'Son', value: Relations.Child },
    { label: 'Daughter', value: Relations.Child },
    { label: 'Wife', value: Relations.Spouse },
    { label: 'Husband', value: Relations.Spouse },
    { label: 'Self', value: Relations.Self },
  ];
  addOnBlur = true;
  base64ImagStr: string = '';
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  tags: any[] = [];
  filesToUpload: Array<File> = [];

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<PatientFormComponent>,
    private readonly patientService: PatientService,
    private readonly alertService: AlertService,
    private readonly fileUploadService: FileUploadService
  ) {
    super();
    this.patientForm = this.fb.group({
      mrNum: [null],
      name: [null, Validators.required],
      phoneNum: [null, Validators.required],
      relation: [null],
      gender: ['Male'],
      age: [null],
      registrationDate: [null],
      addTags: [this.tags],
      addPhoto: [this.base64ImagStr]
    });    
  }
  
  ngOnInit(): void {
  }


  onSubmit() {
    console.log(this.patientForm.value);
    let values = this.patientForm.value;
    let patient: IAddOrUpdatePatient = {
      mrNo: values['mrNum'],
      name: values['name'],
      phoneNumber: values['phoneNum'],
      age: values['age'],
      gender:
        values['gender'] === 'Male' ? 1 : values['gender'] === 'Female' ? 2 : 3,
      relation: values['relation'],
      registrationDate: new Date(values['registrationDate']),
    };
    this.patientService
      .addPatient(patient)
      .pipe(takeUntil(this.componetDestroyed))
      .subscribe({
        next: (x) => {
          this.alertService.success('Patient Added');
          this.patientForm.reset();
          this.dialogRef.close();
          this.uploadFiles(x.id);
        },
        error: (err) => {},
      });
  }

  resetForm(): void {
    this.patientForm.reset();
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

  concatDate(years:string, months?:string, days?:string){
    console.log({years,months,days});
    let date = `${years}`;
    this.patientForm.patchValue({'age': date}); 
  }

  appendFilesToUpload(event: any){
    console.log(event);
    
  }

  remove(tag: any): void {
    const index = this.tags.indexOf(tag);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }
  openCamera() {
    const camera = this.dialog.open(CameraComponent, {
      width: '400px',
    });
    camera.afterClosed().subscribe((data) => {
      this.base64ImagStr = data._imageAsDataUrl;
      this.patientForm.value.addPhoto = this.base64ImagStr ?? '';
    });
  }
  async toBase64(file: any) {
    return await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }
  
  uploadFiles(patientId: string){
    let formData: FormData = new FormData();
    
    for(let file of this.filesToUpload){
      formData.append('files', file);
    }

    this.fileUploadService.uploadFiles(formData, patientId).subscribe({
      next:(x) => {
        this.alertService.success('Files Uploaded Successfully.')
      },
      error: (err) => {
        this.alertService.error('An Error Occoured While Uploading Files.')

      }
    });
  }

  getUploadImage(event: any) {
    // let img = await this.toBase64(file.target.files[0]);
    let files: Array<File> = event.target.files
    console.log(files);
    for(let file of files){

      this.appendFilesToUpload(file)
      this.filesToUpload = [...files];
    }
  }
}
