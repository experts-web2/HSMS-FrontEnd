import { Component, OnInit, Input } from '@angular/core';
import { DataTypesEnum } from 'src/app/constants/enums/dataTypes';
import { ICustomActions } from 'src/app/models/interfaces/customActions';
import { IFile } from 'src/app/models/interfaces/file';
import { ITableColumns } from 'src/app/models/interfaces/table-Columns';
import { LabOrderService } from 'src/app/services';
import { FileUploadService } from 'src/app/services/fileUpload/file-upload.service';

@Component({
  selector: 'app-files-preview',
  templateUrl: './files-preview.component.html',
  styleUrls: ['./files-preview.component.scss']
})
export class FilesPreviewComponent implements OnInit{
  @Input() patientId!: string;
  columnsToShow: Array<ITableColumns> = [
    {
      property: 'name',
      name: 'File Name',
    },
    {
      property: 'createdAt',
      name: 'Uploaded On'
    },
    {
      property: 'createdBy',
      name: 'Uploaded By'
    }
  ]

  customActions: Array<ICustomActions> = [
    {
      name: 'Download',
      action: this.downloadFile.bind(this),
      style: {
        // width: '40%'
      }
    },
    {
      name: 'Delete',
      action: this.deleteFile.bind(this),
      style: {
        // width: '40%'
      }
    }
  ]
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

  downloadFile(file: IFile){
    console.log(file.name);
    
    this.fileUploadService.downloadFile(file.name).subscribe({
      next: (x) => {

      },
      error: (err) => {

      }
    })
  }

  deleteFile(file: IFile){
    this.fileUploadService.deleteFile(file.id).subscribe({
      next: (x) => {
        this.getFiels();
        
      },
      error: (err) => {

      }
    })
  }

}
