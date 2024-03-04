import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseEndPoints } from '../../constants/enums/base-end-points';
import { IMedicinerequest } from 'src/app/models/interfaces/medicine-Request';
import { IFetchRequest } from 'src/app/models/interfaces/fetchTableRequest';
import { IDropDown } from 'src/app/models/interfaces/Dropdown';
import { HttpService } from 'src/app/services';
import { IMedicine } from 'src/app/models/interfaces/Medicine';
import { IDataSourceResponse } from 'src/app/models/interfaces/DataSourceResponse';

@Injectable({
  providedIn: 'root',
})
export class MedicineService extends HttpService {
  constructor(private readonly http: HttpClient) {
    super(http);
  }
  private baseEndPoint = BaseEndPoints.Medicine;

  addMedicine(medicine: IMedicinerequest): Observable<any> {
    return this.post(`${this.baseEndPoint}`, medicine);
  }

  getMedicine(fetchRequest: IFetchRequest = {}): Observable<IDataSourceResponse<IMedicine>> {
    return this.post(`${this.baseEndPoint}/all`, fetchRequest);
  }

  deleteMedicine(deleteMedicine: any) {
    return this.delete(`${this.baseEndPoint}/${deleteMedicine.id}`);
  }

  updateMedicine(id: string, medicine: IMedicinerequest) {
    return this.put(`${this.baseEndPoint}/${id}`, medicine);
  }

  getMedicineDropDown(): Observable<Array<IDropDown>> {
    return this.get(`${this.baseEndPoint}/dropdown`);
  }

  importMedicine(file: FormData): Observable<any>{
    return super.post(`${this.baseEndPoint}/import`, file);
  }
}
