import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { patientData } from 'src/data'

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  constructor() { }

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
