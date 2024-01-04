import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FileUploadService } from '../../../../services/fileUpload/file-upload.service';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CameraComponent } from 'src/app/modules/camera/camera.component';
import { IPatient } from 'src/app/models/interfaces/patient-model';

@Component({
  selector: 'app-add-files-dialog',
  templateUrl: './add-files-dialog.component.html',
  styleUrls: ['./add-files-dialog.component.scss']
})
export class AddFilesDialogComponent implements OnInit{
  filesForm!: FormGroup; 
  filesRequest: FormData = new FormData();
  patient!: IPatient;
  uploadedFiles: any[] = []
  constructor(
    private readonly fb: FormBuilder, 
    private readonly dialogRef: DynamicDialogRef, 
    private readonly fileUploadService: FileUploadService,
    private readonly dynamicDialog: DialogService,
    private readonly dialogConfig: DynamicDialogConfig<{patient: IPatient}>
  )
  {
    
    this.filesForm = this.fb.group({
      files: new FormArray([this.generateNewFormControl()])
    })
  }

  get files(): FormArray{
    return this.filesForm.get('files') as FormArray;
  }

  ngOnInit(): void {
    if(this.dialogConfig.data?.patient) this.patient = this.dialogConfig.data?.patient;
    console.log(this.patient);
    
  }

  generateNewFormControl(): FormGroup{
    return this.fb.group({file: new FormControl<File | null>(null, [Validators.required])});
  }

  appendFile(file: File | string){
    this.filesRequest.append('files', file);
  }

  fileSelected(event: any){
    console.log(event.currentFiles);
    this.uploadedFiles = event.currentFiles;
    this.filesRequest = new FormData();
    for (const file of this.uploadedFiles) {
      this.appendFile(file);
    }
  }

  addFile(){
    this.files.push(this.generateNewFormControl());
  }

  uploadFile(event: any){
    console.log('UPLOAD');
    
    this.fileUploadService.uploadFiles(this.filesRequest, this.patient.id).subscribe({
      next: (x) => {
        console.log(x);
        this.dialogRef.close();
        
      }
    })
  }

  openCamera(){
    let cameraDialog = this.dynamicDialog.open(CameraComponent, {
      width: '40%',
      height: '50%',
    })
    cameraDialog.onClose.subscribe({
      next: (x) => {
        if(x){
          this.appendFile(x);
        }
      }
    })
  }

  close(){
    this.dialogRef.close();
  }
}
