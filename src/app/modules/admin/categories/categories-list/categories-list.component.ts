import { Component } from '@angular/core';
import { TestCategoryService } from 'src/app/Services/testCategory-service/test-category.service';
import { DataTypesEnum } from 'src/app/constants/enums/dataTypes';
import { TableColumnFilterTypes } from 'src/app/constants/enums/table-column-filterTypes';
import { IFetchRequest } from 'src/app/models/interfaces/fetchTableRequest';
import { IFiltersRequest } from 'src/app/models/interfaces/filterRequst';
import { ILabTestCategory } from 'src/app/models/interfaces/labTestCategory';
import { ITableColumns } from 'src/app/models/interfaces/table-Columns';

@Component({
  selector: 'app-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.scss']
})
export class CategoriesListComponent {
  labTestCategoryList: Array<ILabTestCategory> = [];
  totalRecords: number = 0;
  
  columns: Array<ITableColumns> = [
  {
    name: 'Name',
    property: 'name',
    filter: true,
    filterType: TableColumnFilterTypes.Text
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

  constructor(private readonly testCategoryService: TestCategoryService){

  }

  ngOnInit(): void {
    this.getMedicine();
  }

  getMedicine(filterRequest: IFetchRequest = {}){
    this.testCategoryService.getCategories(filterRequest).subscribe(x => {
      console.log(x);
      this.labTestCategoryList = x.data;
      this.totalRecords = x.total      
    })
  }

  edit(e: any){
    console.log(e);
    
    
  }

  delete(e: any){
    console.log(e);
    
  }
}
