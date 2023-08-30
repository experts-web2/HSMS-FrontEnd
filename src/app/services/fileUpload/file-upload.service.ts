import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';
import { HttpClient } from '@angular/common/http';
import { BaseEndPoints } from 'src/app/constants/enums/base-end-points';
import { Observable } from 'rxjs';

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
}
