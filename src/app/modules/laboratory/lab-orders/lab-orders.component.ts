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
import { SortOrder } from '../../../constants/enums/SortOrder';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lab-orders',
  templateUrl: './lab-orders.component.html',
  styleUrls: ['./lab-orders.component.scss']
})
export class LabOrdersComponent implements OnInit {
  labOrders: Array<LabOrderData> = [];
  filtersForm!: FormGroup;
  dateRange: Array<Date> = [];
  doctors: Array<IDoctor> = [];
  rowClickAction: ((data: LabOrderData) => void) = this.rowClick.bind(this); 
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
      name: 'Patient Name',
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
      property: 'tests',
      name: "Tests",
    }
  ]

  constructor(
    private readonly labOrderService: LabOrderService, 
    private readonly doctorService: DoctorService, 
    private readonly patientService: PatientService,
    private readonly formBuilber: FormBuilder,
    private readonly router: Router
  ) {
    this.filtersForm = this.formBuilber.group({
      doctor: new FormControl<IDoctor | null>(null),
      patient: new FormControl<IPatient | null>(null),
      dateRange: new FormControl<any | null>(null),
      labOrderId: new FormControl<string | null>(null)
    })
  }

  ngOnInit(): void {
    this.getLabOrders();
    this.filtersForm.valueChanges.subscribe(x => {
      console.log('form Value', x);
      
    })
  }

  getLabOrders(fetchRequest: IFetchRequest = this.defaultFetchRequest) {
    this.labOrderService.getLabOrders(fetchRequest).subscribe({
      next: (x) => {
        this.labOrders = x.data.map(y => {
          let obj: LabOrderData = {
            doctorName: y.doctor?.name ?? '',
            patientName: y.patient?.name ?? '',
            createdAt: y.createdAt,
            tests: y.labOrderDetails.map(z => z.labTestName).join(' | '),
            labOrderId: y.id
          } 
          return obj;
        });

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

  rowClick(data: LabOrderData): void{
    console.log(data);
    
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
            field: 'name',
            operator: FiltersOperators.And,
            value: searchQuery,
            matchMode: FiltersMatchModes.Contains,
            ignoreCase: true
          }
        ]
      }
    }
    // this.getLabOrders(query)

    this.getPatients(query);
  }

  createDoctorQuery(id: string){
    let query: IFiltersRequest = {
      field: 'DoctorId',
      value: id,
      matchMode: FiltersMatchModes.Equal,
      operator: FiltersOperators.And
    }
  }

  createPatientQuery(id: string){
    let query: IFiltersRequest = {
      field: 'PatientId',
      value: id,
      matchMode: FiltersMatchModes.Equal,
      operator: FiltersOperators.And
    }
  }

  createDateRangeQuery(startDate: Date, endDate: Date){
    let startDateQuery: IFiltersRequest = {
      field: 'CreatedAt',
      value: startDate,
      matchMode: FiltersMatchModes.GreaterThanOrEqual,
      operator: FiltersOperators.And
    }

    let endDateQuery: IFiltersRequest = {
      field: 'CreatedAt',
      value: endDate,
      matchMode: FiltersMatchModes.LessThanOrEqual,
      operator: FiltersOperators.And
    }
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

  filterBuilder(filterRequet: Array<IFiltersRequest> = [], filterOperation: FilterOperation = 'Add', pageNo: number = 1){
    let filters = this.defaultFetchRequest.queryOptionsRequest?.filtersRequest;
    
    for (let filter of filterRequet) {
      if(filters?.includes(filter)){
        filters = filters.filter(x => x.field === filter.field && x.value) 
      }
      
    }

    if(filters) {
      filters = filters.filter(x => !filterRequet.map(y => y.field).includes(x.field))
      if(filterOperation === 'Add') filters = [...filters, ...filterRequet]
      if(filterOperation === 'Remove') filters= filters.filter(x => !filterRequet.map(y => y.field).includes(x.field));
    }

    if(this.defaultFetchRequest.pagedListRequest){
      this.defaultFetchRequest.pagedListRequest.pageNo = pageNo;
    }
  }

  prev(){
    if(this.defaultFetchRequest.pagedListRequest?.pageNo && this.defaultFetchRequest.pagedListRequest?.pageNo >= 2){
      this.defaultFetchRequest.pagedListRequest.pageNo--;
      // this.getHealthRecords();
    }

  }
}

type FilterOperation = 'Add' | 'Remove';

interface LabOrderData{
  patientName: string;
  doctorName: string;
  createdAt: Date;
  tests: string;
  labOrderId: string;
}