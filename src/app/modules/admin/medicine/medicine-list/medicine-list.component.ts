import { Component, OnInit } from '@angular/core';
import { MedicineService } from '../../../../Services/medicine-service/medicine.service';
import { IFiltersRequest } from 'src/app/models/interfaces/filterRequst';
import { ITableColumns } from 'src/app/models/interfaces/table-Columns';
import { TableColumnFilterTypes } from 'src/app/constants/enums/table-column-filterTypes';
import { DataTypesEnum } from 'src/app/constants/enums/dataTypes';
import { PotencyUnits } from 'src/app/constants/enums/potency-units';
import { IFetchRequest } from 'src/app/models/interfaces/fetchTableRequest';

@Component({
  selector: 'app-medicine-list',
  templateUrl: './medicine-list.component.html',
  styleUrls: ['./medicine-list.component.scss']
})
export class MedicineListComponent implements OnInit {
  medicineList: Array<any> = [];
  totalRecords: number = 0;
  
  columns: Array<ITableColumns> = [
  {
    name: 'Name',
    property: 'name',
    filter: true,
    filterType: TableColumnFilterTypes.Text
  },
  {
    name: 'Salts',
    property: 'salt',
    filter: true
  },
  {
    name: 'Potency Unit',
    property: 'potencyUnits',
    filter: true,
    columnType: DataTypesEnum.Enum,
    enum: PotencyUnits
  },
  {
    name: 'Potency',
    property: 'potency',
    filter: true,
    filterType: TableColumnFilterTypes.Numeric
  },
  {
    name: 'Price (Per Unit)',
    property: 'price',
    filter: true,
    filterType: TableColumnFilterTypes.Numeric
  },
  {
    name: 'Created By',
    property: 'createdBy',
    filter: true
  },
  {
    name: 'Date Created',
    property: 'createdAt',
    filter: true,
    filterType: TableColumnFilterTypes.Date,
    columnType: DataTypesEnum.Date
  }  
  ];

  constructor(private readonly medicineService: MedicineService){

  }

  ngOnInit(): void {
    this.getMedicine();
  }

  getMedicine(fetchRequest: IFetchRequest = {}){
    this.medicineService.getMedicine(fetchRequest).subscribe(x => {
      console.log(x);
      this.medicineList = x.data; 
      this.totalRecords = x.total;     
    })
  }

  edit(e: any){
    console.log(e);
    
  }

  delete(e: any){
    console.log(e);
    
  }

}
