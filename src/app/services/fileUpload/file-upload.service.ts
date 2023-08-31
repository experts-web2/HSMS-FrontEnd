import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';
import { HttpClient } from '@angular/common/http';
import { BaseEndPoints } from 'src/app/constants/enums/base-end-points';
import { Observable } from 'rxjs';
import { IFile } from 'src/app/models/interfaces/file';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService extends HttpService {

  private baseEndPoint = BaseEndPoints.FileAttachment;

  constructor(private readonly http: HttpClient) {
    super(http)
  }

  uploadFiles(files: FormData, patientId: string): Observable<any>{
    return super.post(`${this.baseEndPoint}/uploadfiles?patientId=${patientId}`, files)
  }
  

  getFilesByPatientId(patientId: string): Observable<Array<IFile>>{
    return this.get(`${this.baseEndPoint}/getbypatientid/${patientId}`);
  }

  downloadFile(fileName: string): Observable<any>{
    return this.get(`${this.baseEndPoint}/download/${fileName}`)
  }
  
  deleteFile(fileId: string): Observable<any>{
    return this.delete(`${this.baseEndPoint}/${fileId}`);

  }

}
