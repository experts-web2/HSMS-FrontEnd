import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { patientData } from 'src/data'
import { HttpService } from '../httpService/http.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PatientService extends HttpService{

  constructor(private http: HttpClient) {
    super(http)
  }

  getData(): Observable<any>{
    return this.get('https://jsonplaceholder.typicode.com/todos');
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
