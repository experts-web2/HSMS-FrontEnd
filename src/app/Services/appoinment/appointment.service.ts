import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/services';
import { BaseEndPoints } from 'src/app/constants/enums/base-end-points';
import { IFetchRequest } from 'src/app/models/interfaces/fetchTableRequest';

@Injectable({
  providedIn: 'root',
})
export class AppointmentService extends HttpService {
  baseEndPoints: string = BaseEndPoints.Appointment;

  constructor(private readonly http: HttpClient) {
    super(http);
  }

  addAppointment(data: any): Observable<any> {
    return super.post(`${this.baseEndPoints}/add`, data);
  }

  getAppointments(fetchRequest: IFetchRequest = {}): Observable<any> {
    return super.post(`${this.baseEndPoints}/all`, fetchRequest);
  }

  updateAppointment(data: any): Observable<any> {
    return super.put(`${this.baseEndPoints}/update`, data);
  }

  getAppointmentById(id: string): Observable<any> {
    return super.get(`${this.baseEndPoints}/byid/${id}`);
  }

  deleteAppointment(id: string): Observable<any> {
    return super.delete(`${this.baseEndPoints}/delete/${id}`);
  }
}
