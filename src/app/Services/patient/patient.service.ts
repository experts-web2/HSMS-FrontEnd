import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { patientData } from 'src/data'
import { HttpService } from '../httpService/http.service';
import { HttpClient } from '@angular/common/http';
import { BaseEndPoints } from '../../constants/enums/base-end-points';

@Injectable({
  providedIn: 'root'
})
export class PatientService extends HttpService{

  constructor(private http: HttpClient) {
    super(http)
  }
  baseEndPoint: string = BaseEndPoints.Patient

  getData(): Observable<any>{
    return this.get('https://jsonplaceholder.typicode.com/todos');
  }

  addPatient(data: any){
    this.post(`${this.baseEndPoint}/add`, data);
  }

  getAppointments() {
    return of(patientData.getAppointments())
  }

  getMessages() {
    return of(patientData.getMessages())
  }

  getTokens() {
    return of(patientData.getTokenData())
  }
}
