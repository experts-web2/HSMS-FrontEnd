import { Injectable } from '@angular/core';
import { HttpService } from '../httpService/http.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseEndPoints } from '../../constants/enums/base-end-points';
import { IMedicinerequest } from 'src/app/models/interfaces/medicine-Request';
import { IFetchRequest } from 'src/app/models/interfaces/fetchTableRequest';

@Injectable({
  providedIn: 'root'
})
export class MedicineService extends HttpService{

  constructor(private readonly http: HttpClient) {
    super(http)
  }
  private baseEndPoint = BaseEndPoints.Medicine

  addMedicine(medicine: IMedicinerequest): Observable<any>{
    return this.post(`${this.baseEndPoint}/add`, medicine);
  }

  getMedicine(fetchRequest: IFetchRequest = {}){
    return this.post(`${this.baseEndPoint}/all`, fetchRequest)
  }

  deleteMedicine(id: string){
    return this.delete(`${this.baseEndPoint}/delete/${id}`)
  }

  updateMedicine(id: string, medicine: IMedicinerequest){
    return this.put(`${this.baseEndPoint}/update/${id}`, medicine)
  }
}