import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { FileUploadModule } from 'primeng/fileupload';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
  standalone: true,
  imports: [FileUploadModule, ButtonModule]
})
export class FileUploadComponent {

  formatData: FormData = new FormData();
  constructor(private readonly dialogRef: DynamicDialogRef) {

  }

  onUpload({currentFiles}: {currentFiles: Array<File>}){    
    if(currentFiles[0]) this.formatData.append('file', currentFiles[0], currentFiles[0].name);    
  }

  upload(){
    this.close(this.formatData.get('file') ? this.formatData : null);
  }

  close(data: FormData | null){
    this.dialogRef.close(data);
  }
}
