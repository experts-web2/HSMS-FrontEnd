import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseEndPoints } from '../../constants/enums/base-end-points';
import { IMedicinerequest } from 'src/app/models/interfaces/medicine-Request';
import { IFetchRequest } from 'src/app/models/interfaces/fetchTableRequest';
import { IDropDown } from 'src/app/models/interfaces/Dropdown';
import { HttpService } from 'src/app/services';

@Injectable({
  providedIn: 'root',
})
export class MedicineService extends HttpService {
  constructor(private readonly http: HttpClient) {
    super(http);
  }
  private baseEndPoint = BaseEndPoints.Medicine;

  addMedicine(medicine: IMedicinerequest): Observable<any> {
    return this.post(`${this.baseEndPoint}/add`, medicine);
  }

  getMedicine(fetchRequest: IFetchRequest = {}) {
    return this.post(`${this.baseEndPoint}/all`, fetchRequest);
  }

  deleteMedicine(deleteMedicine: any) {
    return this.delete(`${this.baseEndPoint}/delete/${deleteMedicine.id}`);
  }

  updateMedicine(id: string, medicine: IMedicinerequest) {
    return this.put(`${this.baseEndPoint}/update/${id}`, medicine);
  }

  getMedicineDropDown(): Observable<Array<IDropDown>> {
    return this.get(`${this.baseEndPoint}/dropdown`);
  }
}
