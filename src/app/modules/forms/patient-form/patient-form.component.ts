import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { CameraComponent } from 'src/app/modules/camera/camera.component';
import { PatientService } from 'src/app/services';
import { IAddOrUpdatePatient } from 'src/app/models/interfaces/addOrUodate-Patient';
import { AlertService } from 'src/app/services';
import { Relations } from 'src/app/constants/Constants/PatientRelatons';
import { takeUntil } from 'rxjs';
import { SubscriptionManagmentDirective } from 'src/app/shared/directive/subscription-managment.directive';
import { FileUploadService } from 'src/app/services/fileUpload/file-upload.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';

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
  minDate = new Date;

  constructor(
    private fb: FormBuilder,
    private dialog: DialogService,
    // public dialogRef: MatDialogRef<PatientFormComponent>,
    private dialogRef: DynamicDialogRef,
    private readonly patientService: PatientService,
    private readonly alertService: AlertService,
    private readonly fileUploadService: FileUploadService,
  ) {
    super();
    this.patientForm = this.fb.group({
      mrNum: new FormControl({value: null, disabled: true}, [Validators.required]),
      name: new FormControl(null, [Validators.required]),
      phoneNum: new FormControl('', [Validators.required, this.validatePakistaniPhoneNumber]),
      relation: new FormControl(Relations.Self, [Validators.required]),
      gender: new FormControl('Male', [Validators.required]),
      age: new FormControl(null, [Validators.required]),
      registrationDate: new FormControl(new Date(), [Validators.required]),
      addPhoto: new FormControl(this.base64ImagStr)
    });    
  }

  get mrNum(): AbstractControl{
    return this.patientForm.get('mrNum') as AbstractControl;
  }

  get name(): AbstractControl{
    return this.patientForm.get('name') as AbstractControl;
  }

  get phoneNum(): AbstractControl{
    return this.patientForm.get('phoneNum') as AbstractControl;
  }

  get relation(): AbstractControl{
    return this.patientForm.get('relation') as AbstractControl;
  }

  get gender(): AbstractControl{
    return this.patientForm.get('gender') as AbstractControl;
  }

  get age(): AbstractControl{
    return this.patientForm.get('age') as AbstractControl;
  }

  get registrationDate(): AbstractControl{
    return this.patientForm.get('registrationDate') as AbstractControl;
  }
  
  ngOnInit(): void {
    this.generateMrNo();
  }

  generateMrNo(){
    this.patientService.generateMrNo().subscribe({
      next: (x) => {
        // this.alertService.info(x);
        this.mrNum.setValue(x);
      },
      error: (err) => {

      }
    })
  }

  onSubmit() {
    console.log(this.patientForm.value);
    
    if(this.patientForm.invalid){
      this.alertService.error('Please Fill In All Required Fields.');
      return;
    }

    let values = this.patientForm.value;
    let patient: IAddOrUpdatePatient = {
      mrNo: this.mrNum.value,
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
          this.uploadFiles(x.id);
          this.dialogRef.close(x);
        },
        error: (err) => {
          this.alertService.error('An Error Accoured While Adding Patient.')
        },
      });
  }

  resetForm(): void {
    this.patientForm.reset();
  }

  add(event: any): void {
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
    }).onClose.subscribe((data) => {      
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
    if(!this.filesToUpload.length) return;
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

  validatePakistaniPhoneNumber(control: AbstractControl): ValidationErrors | null {
    const phoneNumberRegex = /^3\d{9}$/; // Adjust the regex as needed
    if (control.value && !phoneNumberRegex.test(control.value)) {
      return { invalidPhoneNumber: true };
    }
    return null;
  }
}
