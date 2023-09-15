import { Component, OnInit } from '@angular/core';
import { DataTypesEnum } from 'src/app/constants/enums/dataTypes';
import { IFetchRequest } from 'src/app/models/interfaces/fetchTableRequest';
import { ILabOrder, ILabOrderDetail } from 'src/app/models/interfaces/labOrder';
import { ITableColumns } from 'src/app/models/interfaces/table-Columns';
import { DoctorService, LabOrderService, PatientService } from 'src/app/services';
import { TitleCasePipe } from '@angular/common';
import * as moment from 'moment';
import { FiltersOperators } from 'src/app/constants/enums/FilterOperators';
import { FiltersMatchModes } from 'src/app/constants/enums/FilterMatchModes';
import { IFiltersRequest } from 'src/app/models/interfaces/filterRequst';
import { ILabeTest } from 'src/app/models/interfaces/labTest';
import { IDoctor } from 'src/app/models/interfaces/Doctor';
import { IPatient } from 'src/app/models/interfaces/patient-model';

@Component({
  selector: 'app-lab-orders',
  templateUrl: './lab-orders.component.html',
  styleUrls: ['./lab-orders.component.scss']
})
export class LabOrdersComponent implements OnInit {
  labOrders: Array<ILabOrder> = [];
  dateRange: Array<Date> = [];
  doctors: Array<IDoctor> = [];
  patients: Array<IPatient> = [];
  defaultFetchRequest: IFetchRequest = {
    pagedListRequest: {
      pageNo: 1,
      pageSize: 10
    },
    queryOptionsRequest: {
      filtersRequest: []
    }
  }
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

  constructor(private readonly labOrderService: LabOrderService, private readonly doctorService: DoctorService, private readonly patientService: PatientService) {

  }

  ngOnInit(): void {
    this.getLabOrders();
  }

  getLabOrders(fetchRequest: IFetchRequest = this.defaultFetchRequest) {
    this.labOrderService.getLabOrders(fetchRequest).subscribe({
      next: (x) => {
        this.labOrders = x.data;
      },
      error: (err) => {

      }
    })
  }

  getTestsList(data: Array<ILabOrderDetail>): string {
    let testsNames = data.map(x => x.labTestName);
    return testsNames.join('/ ')
  }

  getByDateRange(pageNo: number = 1) {
    if (!this.dateRange.length || this.dateRange.some(x => x === null)) return;
    console.log(this.dateRange);
    console.log({ startDate: moment(this.dateRange[0]).startOf('day').toDate(), endDate: moment(this.dateRange[1]).endOf('day').toDate() });

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


  next() {
    // if(this.filter.pagedListRequest?.pageNo){
    //   this.filter.pagedListRequest.pageNo++;
    // }

  }

  patientSelect(patientId: string) {

  }

  doctorSelect(doctorId: string) {

  }

  searchDoctor(searchQuery: string) {
    let query: IFetchRequest = {
      pagedListRequest: {
        pageNo: 1,
        pageSize: 10
      },
      queryOptionsRequest: {
        filtersRequest: [
          {
            field: 'Name',
            operator: FiltersOperators.And,
            value: searchQuery,
            matchMode: FiltersMatchModes.Contains,
            ignoreCase: true
          }
        ]
      }
    }

    this.getDoctors(query);
  }

  searchPatient(searchQuery: string) {
    let query: IFetchRequest = {
      pagedListRequest: {
        pageNo: 1,
        pageSize: 10
      },
      queryOptionsRequest: {
        filtersRequest: [
          {
            field: 'PatientId',
            operator: FiltersOperators.And,
            value: ['12964e4d-106b-4509-af76-22a3fb78f949', '3032ad4f-3ad0-467e-a3d8-507dd6d9dbd7'],
            matchMode: FiltersMatchModes.Contains,
            ignoreCase: true
          }
        ]
      }
    }
    this.getLabOrders(query)

    // this.getPatients(query);
  }

  getDoctors(fetchRequest: IFetchRequest = {}) {
    this.doctorService.getDoctors(fetchRequest).subscribe({
      next: (x) => {
        this.doctors = x.data;
      },
      error: (err) => {

      }
    })
  }

  getPatients(fetchRequest: IFetchRequest = {}) {
    this.patientService.getPatients(fetchRequest).subscribe({
      next: (x) => {
        this.patients = x.data;
      },
      error: (err) => {

      }
    })
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
