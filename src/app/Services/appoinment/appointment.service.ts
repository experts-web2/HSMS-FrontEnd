import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseEndPoints } from 'src/app/constants/enums/base-end-points';
import { IFetchRequest } from 'src/app/models/interfaces/fetchTableRequest';
import { HttpService } from '../http/http.service';

@Injectable({
  providedIn: 'root',
})
export class AppointmentService extends HttpService {
  baseEndPoints: string = BaseEndPoints.Appointment;

  constructor(private readonly http: HttpClient) {
    super(http);
  }

  addAppointment(data: any): Observable<any> {
    return this.post(`${this.baseEndPoints}`, data);
  }

  getAppointments(fetchRequest: IFetchRequest = {}): Observable<any> {
    return this.post(`${this.baseEndPoints}/all`, fetchRequest);
  }

  updateAppointment(data: any): Observable<any> {
    return this.put(`${this.baseEndPoints}/update`, data);
  }

  getAppointmentById(id: string): Observable<any> {
    return this.get(`${this.baseEndPoints}/${id}`);
  }

  deleteAppointment(id: string): Observable<any> {
    return this.delete(`${this.baseEndPoints}/delete/${id}`);
  }
}
