import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseEndPoints } from 'src/app/constants/enums/base-end-points';
import { Observable, of } from 'rxjs';
import { IAddOrUpdateBrand, IAddOrUpdateBrandRequest } from 'src/app/models/interfaces/medicine-brand';
import { IDropDown } from 'src/app/models/interfaces/Dropdown';
import { IFetchRequest } from 'src/app/models/interfaces/fetchTableRequest';
import { HttpService } from 'src/app/services';
import { patientData } from 'src/data';


@Injectable({
  providedIn: 'root'
})
export class MedicineBrandService extends HttpService {

  constructor(private readonly http: HttpClient) {
    super(http)
  }

  private baseEndPoint = BaseEndPoints.Brand;

  addBrand(vendor: IAddOrUpdateBrand): Observable<IAddOrUpdateBrandRequest> {
    return this.post(`${this.baseEndPoint}/add`, vendor);
  }

  getBrands(): Observable<Array<IDropDown>> {
    return of(patientData.getBrands())
    // return this.get(`${this.baseEndPoint}/dropdown`);
  }

  getBrandsList(fetchRequest: IFetchRequest = {}){
    return this.post(`${this.baseEndPoint}/all`, fetchRequest);
  }

  deleteBrand(test: any){
    return this.delete(`${this.baseEndPoint}/delete/${test.id}`);
  }

  updateBrand(id: string, test: IAddOrUpdateBrand){
    return this.put(`${this.baseEndPoint}/update/${id}`, test)
  }
}
