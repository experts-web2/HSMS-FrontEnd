import { Component, OnInit } from '@angular/core';
import { DataTypesEnum } from 'src/app/constants/enums/dataTypes';
import { IFetchRequest } from 'src/app/models/interfaces/fetchTableRequest';
import { ILabOrder, ILabOrderDetail } from 'src/app/models/interfaces/labOrder';
import { ITableColumns } from 'src/app/models/interfaces/table-Columns';
import { LabOrderService } from 'src/app/services';
import { TitleCasePipe } from '@angular/common';
import * as moment from 'moment';
import { FiltersOperators } from 'src/app/constants/enums/FilterOperators';
import { FiltersMatchModes } from 'src/app/constants/enums/FilterMatchModes';
import { IFiltersRequest } from 'src/app/models/interfaces/filterRequst';

@Component({
  selector: 'app-lab-orders',
  templateUrl: './lab-orders.component.html',
  styleUrls: ['./lab-orders.component.scss']
})
export class LabOrdersComponent implements OnInit {
labOrders: Array<ILabOrder> = [];
dateRange: Array<Date> = [];
tableColumns: Array<ITableColumns> = [
  {
    property: 'patientName',
    name: 'PatientName',
    columnType: DataTypesEnum.String
  },
  {
    property: 'createdAt',
    name: 'Created At',
    columnType: DataTypesEnum.Date
  },
  {
    property: 'doctorName',
    name: "Doctor's Name",
    columnType: DataTypesEnum.String
  },
  {
    property: 'labOrderDetails',
    name: "Tests",
    valueToShow: this.getTestsList.bind(this)
  }
]

  constructor(private readonly labOrderService: LabOrderService){

  }

  ngOnInit(): void {
    
  }

  getLabOrders(fetchRequest: IFetchRequest = {}){
    this.labOrderService.getLabOrders(fetchRequest).subscribe({
      next: (x) => {
        this.labOrders = x.data;
      },
      error: (err) => {

      }
    })
  }

  getTestsList(data: Array<ILabOrderDetail>): string{
    let testsNames = data.map(x => x.labTestName);
    return testsNames.join('/ ')
  }

  getByDateRange(pageNo: number = 1){
    if(!this.dateRange.length || this.dateRange.some(x => x === null)) return;
    console.log(this.dateRange);
    console.log({startDate: moment(this.dateRange[0]).startOf('day').toDate(), endDate: moment(this.dateRange[1]).endOf('day').toDate()});
    
       let filtersRequest: Array<IFiltersRequest> = [
          {
            field: 'CreatedAt',
            value: moment(this.dateRange[0]).startOf('day').toDate(),
            matchMode: FiltersMatchModes.GreaterThanOrEqual,
            operator: FiltersOperators.And
          },
          {
            field: 'CreatedAt',
            value: moment(this.dateRange[1]).endOf('day').toDate(),
            matchMode: FiltersMatchModes.LessThanOrEqual,
            operator: FiltersOperators.And
          }
        ];    
        // this.filterBuilder(filtersRequest);
  }

  patientQuery(event: any){
    console.log(event.query);
    
  }

  doctorQuery(event: any){
    console.log(event.query);
    
  }

  next(){
    // if(this.filter.pagedListRequest?.pageNo){
    //   this.filter.pagedListRequest.pageNo++;
    // }

  }

  // filterBuilder(filterRequet: Array<IFiltersRequest> = [], filterOperation: FilterOperation = 'Add', pageNo: number = 1){
  //   if(this.filter.queryOptionsRequest?.filtersRequest) {
  //     this.filter.queryOptionsRequest.filtersRequest = this.filter.queryOptionsRequest.filtersRequest.filter(x => !filterRequet.map(y => y.field).includes(x.field))
  //     if(filterOperation === 'Add') this.filter.queryOptionsRequest.filtersRequest = [...this.filter.queryOptionsRequest.filtersRequest, ...filterRequet]
  //     if(filterOperation === 'Remove') this.filter.queryOptionsRequest.filtersRequest = this.filter.queryOptionsRequest.filtersRequest.filter(x => !filterRequet.map(y => y.field).includes(x.field));
  //   }

  //   if(this.filter.pagedListRequest){
  //     this.filter.pagedListRequest.pageNo = pageNo;
  //   }
  // }

  // prev(){
  //   if(this.filter.pagedListRequest?.pageNo && this.filter.pagedListRequest?.pageNo >= 2){
  //     this.filter.pagedListRequest.pageNo--;
  //     this.getHealthRecords();
  //   }

  // }
}
