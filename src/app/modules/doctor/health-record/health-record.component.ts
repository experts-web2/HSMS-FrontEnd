import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserStateService } from 'src/app/State/user/user.service';
import { FiltersMatchModes } from 'src/app/constants/enums/FilterMatchModes';
import { FiltersOperators } from 'src/app/constants/enums/FilterOperators';
import { IDoctor } from 'src/app/models/interfaces/Doctor';
import { IFetchRequest } from 'src/app/models/interfaces/fetchTableRequest';
import { IFiltersRequest } from 'src/app/models/interfaces/filterRequst';
import { IHealthRecord } from 'src/app/models/interfaces/healthRecord';
import { IHealthRecordRequest } from 'src/app/models/interfaces/healthRecordRequest';
import { IPatient } from 'src/app/models/interfaces/patient-model';
import { AlertService, DoctorService, PatientService } from 'src/app/services';
import { HealtRecordService } from 'src/app/services/health-record/healt-record.service';

@Component({
  selector: 'app-health-record',
  templateUrl: './health-record.component.html',
  styleUrls: ['./health-record.component.scss']
})
export class HealthRecordComponent implements OnInit {
  currentDate: Date = new Date();
  doctorsList: Array<IDoctor> = [];
  patientList: Array<IPatient> = [];
  visible: boolean = false;
  doctorId!: string;
  patientIdForHealthRecord!: string;
  healthRecords: Array<IHealthRecord> = [];
  dateRange: Array<Date> = [];
  filter!: IFetchRequest;
  pageNo: number = 0;
  totalRecords: number = 0;
  currentPageSize: number = 0;
  nextPage: number = 0;
  prevPage: number = 0;
  showNextButton: boolean = false;
  showPrevButton: boolean = false;

  constructor(
    private readonly patientService: PatientService,
    private readonly doctorService: DoctorService,
    private readonly healthRecordService: HealtRecordService,
    private readonly router: Router,
    private readonly userStateService: UserStateService,
    private readonly alertService: AlertService
  ){
    this.userStateService.getUserState().subscribe({
      next: (x) => {
        if(x.entityIds){
          this.doctorId = x.entityIds['DoctorId']
        }
      },
      error: (err) => {

      }
    })
  }

  ngOnInit(): void {
    this.resetFilters();
    this.getHealthRecords();
    // this.getPagedHealthRecords();
  }

  getPagedHealthRecords(pageNo?: number){
    let fetchRequest: IFetchRequest = {
      pagedListRequest: {
        pageNo: pageNo ?? 1,
        pageSize: 10
      },
      queryOptionsRequest:{
        filtersRequest: [
          {
            field: 'DoctorId',
            value: this.doctorId,
            matchMode: FiltersMatchModes.Equal
          }
        ]
      }
    }

    this.healthRecordService.getAllHealthRecords(fetchRequest).subscribe({
      next: (x) => {
        this.healthRecords = x.data;
      },
      error: (err) => {

      }
    })
  }

  selectPatientForHealthRecord(){
    this.visible = !this.visible
  }

  selectedPatient(patientId: string){
    console.log(patientId);
    this.patientIdForHealthRecord = patientId;
  }

  addHealthRecord(){
    let healthRecordRequest: IHealthRecordRequest = {
      doctorId: this.doctorId,
      patientId: this.patientIdForHealthRecord
    }
    this.healthRecordService.addHealthRecoed(healthRecordRequest).subscribe({
      next: (x) => {
        console.log(x);
        this.alertService.success('Health Record Created Successfully.');
        this.router.navigate(['doctor/health_record', x.id])
      },
      error: (err) => {
        this.alertService.success('An Error Occoured while Creating Health Record.');
      }
    })
  }

  getPatients(searchQuery: string){

    let query: IFetchRequest = {
      pagedListRequest: {
        pageNo: 1,
        pageSize: 100
      },
      queryOptionsRequest: {
        filtersRequest:[
          {
            field: 'Name',
            operator: FiltersOperators.And,
            matchMode: FiltersMatchModes.Contains,
            ignoreCase: true,
            value: searchQuery
          }
        ]
      }
    } 

    this.patientService.getPatients(query).subscribe({
      next: (x) => {
        this.patientList = x.data;
      },
      error: (err) => {

      }
    })
  }

  patientSelected(patientId: string){
      let filterRequests:Array<IFiltersRequest> = [
        {
          field: 'PatientId',
          value: patientId,
          matchMode: FiltersMatchModes.Equal,
          operator: FiltersOperators.And
        }
      ] 
    this.filterBuilder(filterRequests);
    this.getHealthRecords();
  }

  doctorSelected(doctorId: string){
    let filterRequests:Array<IFiltersRequest> = [
      {
        field: 'DoctorId',
        value: doctorId,
        matchMode: FiltersMatchModes.Equal,
        operator: FiltersOperators.And
      }
    ] 

    this.filterBuilder(filterRequests);
    this.getHealthRecords();
  }

  filterBuilder(filterRequet: Array<IFiltersRequest> = [], filterOperation: FilterOperation = 'Add', pageNo: number = 1){
    if(this.filter.queryOptionsRequest?.filtersRequest) {
      this.filter.queryOptionsRequest.filtersRequest = this.filter.queryOptionsRequest.filtersRequest.filter(x => !filterRequet.map(y => y.field).includes(x.field))
      if(filterOperation === 'Add') this.filter.queryOptionsRequest.filtersRequest = [...this.filter.queryOptionsRequest.filtersRequest, ...filterRequet]
      if(filterOperation === 'Remove') this.filter.queryOptionsRequest.filtersRequest = this.filter.queryOptionsRequest.filtersRequest.filter(x => !filterRequet.map(y => y.field).includes(x.field));
    }

    if(this.filter.pagedListRequest){
      this.filter.pagedListRequest.pageNo = pageNo;
    }
  }

  getHealthRecords(){
    this.healthRecordService.getAllHealthRecords(this.filter).subscribe({
      next: (x) => {
        this.healthRecords = x.data;
        this.totalRecords = x.total;
        this.currentPageSize = x.data.length;
        if(this.filter.pagedListRequest?.pageNo){

          this.pageNo = this.filter.pagedListRequest?.pageNo;
          this.nextPage = this.filter.pagedListRequest?.pageNo + 1;
          if(this.filter.pagedListRequest?.pageNo >= 2) this.prevPage = this.filter.pagedListRequest?.pageNo - 1
        }
      },
      error: (err) => {
        this.alertService.error('An Error Occoured While Fetching Health Records.')
      }
    })
  }

  previewHealthRecord(heathRecordId: string){
    this.router.navigate(['doctor/health_record', heathRecordId]);
  }

  resetFilters(pageNo: number = 1){
    this.filter = {
      pagedListRequest: {
        pageNo: pageNo,
        pageSize: 10
      },
      queryOptionsRequest:{
        filtersRequest: [
          {
            field: 'DoctorId',
            value: this.doctorId,
            matchMode: FiltersMatchModes.Equal,
            operator: FiltersOperators.And
          }
        ]
      }
    }
  }

  getDoctors(searchQuery: string){

    let query: IFetchRequest = {
      pagedListRequest: {
        pageNo: 1,
        pageSize: 100
      },
      queryOptionsRequest: {
        filtersRequest:[
          {
            field: 'Name',
            operator: FiltersOperators.And,
            matchMode: FiltersMatchModes.Contains,
            ignoreCase: true,
            value: searchQuery
          }
        ]
      }
    } 

    this.doctorService.getDoctors(query).subscribe({
      next: (x) => {
        this.doctorsList = x.data;
      },
      error: (err) => {

      }
    })
  }

  getByDateRange(pageNo: number = 1){
    if(!this.dateRange.length || this.dateRange.some(x => x === null)) return;
       let filtersRequest: Array<IFiltersRequest> = [
          {
            field: 'CreatedAt',
            value: this.dateRange[0],
            matchMode: FiltersMatchModes.GreaterThanOrEqual,
            operator: FiltersOperators.And
          },
          {
            field: 'CreatedAt',
            value: this.dateRange[1],
            matchMode: FiltersMatchModes.LessThanOrEqual,
            operator: FiltersOperators.And
          }
        ];    
        this.filterBuilder(filtersRequest);
        this.getHealthRecords();
  }

  patientQuery(event: any){
    console.log(event.query);
    this.getPatients(event.query)
    
  }

  doctorQuery(event: any){
    console.log(event.query);
    this.getDoctors(event.query)
    
  }

  next(){
    if(this.filter.pagedListRequest?.pageNo){
      this.filter.pagedListRequest.pageNo++;
    }

    this.getHealthRecords();
  }

  prev(){
    if(this.filter.pagedListRequest?.pageNo && this.filter.pagedListRequest?.pageNo >= 2){
      this.filter.pagedListRequest.pageNo--;
    }

    this.getHealthRecords();
  }
}

type FilterOperation = 'Add' | 'Remove';