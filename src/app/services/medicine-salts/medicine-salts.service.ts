import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';
import { HttpClient } from '@angular/common/http';
import { BaseEndPoints } from 'src/app/constants/enums/base-end-points';
import { Observable } from 'rxjs';
import { IDropDown } from 'src/app/models/interfaces/Dropdown';
import { IFetchRequest } from 'src/app/models/interfaces/fetchTableRequest';
import { IAddOrUpdateBrand, IAddOrUpdateBrandRequest } from 'src/app/models/interfaces/medicine-brand';
import { ISaltRequest } from 'src/app/models/interfaces/saltRequest';
import { ISalt } from 'src/app/models/interfaces/salt';
import { IDataSourceResponse } from 'src/app/models/interfaces/DataSourceResponse';

@Injectable({
  providedIn: 'root'
})
export class MedicineSaltsService extends HttpService{

  constructor(private readonly http: HttpClient) {
    super(http)
   }


   private baseEndPoint = BaseEndPoints.salt;

   addSalt(brandPayload: ISaltRequest): Observable<ISalt> {
     return this.post(`${this.baseEndPoint}`, brandPayload);
   }
 
   getSaltsDropDown(): Observable<Array<IDropDown>> {
     // return of(patientData.getBrands())
     return this.get(`${this.baseEndPoint}/dropdown`);
   }
 
   getSaltsList(fetchRequest: IFetchRequest = {}): Observable<IDataSourceResponse<ISalt>>{
     return this.post(`${this.baseEndPoint}/all`, fetchRequest);
   }
 
   deleteSalt(test: any){
     return this.delete(`${this.baseEndPoint}/${test.id}`);
   }
 
   updateSalt(id: string, test: ISaltRequest): Observable<ISalt>{
     return this.put(`${this.baseEndPoint}/${id}`, test)
   }
}
