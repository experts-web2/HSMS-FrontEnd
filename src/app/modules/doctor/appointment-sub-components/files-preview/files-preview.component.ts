import { Component, OnInit, Input } from '@angular/core';
import { IFile } from 'src/app/models/interfaces/file';
import { LabOrderService } from 'src/app/services';
import { FileUploadService } from 'src/app/services/fileUpload/file-upload.service';

@Component({
  selector: 'app-files-preview',
  templateUrl: './files-preview.component.html',
  styleUrls: ['./files-preview.component.scss']
})
export class FilesPreviewComponent implements OnInit{
  @Input() patientId!: string;

  files: Array<IFile> = []
  constructor(private readonly fileUploadService: FileUploadService){}

  ngOnInit(): void {
    this.getFiels();
  }
  
  getFiels(){
    console.log(this.patientId);
    
    this.fileUploadService.getFilesByPatientId(this.patientId).subscribe({
      next: (x) => {
        console.log(x);
        this.files = x;
      }
    })    

  }

  downloadFile(fileName: string){
    console.log(fileName);
    
    this.fileUploadService.downloadFile(fileName).subscribe({
      next: (x) => {

      },
      error: (err) => {

      }
    })
  }

  deleteFile(fileId: string){
    this.fileUploadService.deleteFile(fileId).subscribe({
      next: (x) => {
        this.getFiels();
      },
      error: (err) => {

      }
    })
  }

}
