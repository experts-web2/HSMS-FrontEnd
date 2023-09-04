import { Component, OnInit } from '@angular/core';
import { FiltersMatchModes } from 'src/app/constants/enums/FilterMatchModes';
import { FiltersOperators } from 'src/app/constants/enums/FilterOperators';
import { IDoctor } from 'src/app/models/interfaces/Doctor';
import { IFetchRequest } from 'src/app/models/interfaces/fetchTableRequest';
import { IPatient } from 'src/app/models/interfaces/patient-model';
import { DoctorService, PatientService } from 'src/app/services';
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


  constructor(
    private readonly patientService: PatientService,
    private readonly doctorService: DoctorService,
    private readonly healthRecordService: HealtRecordService
    // private readonly 
  ){}

  ngOnInit(): void {
    
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

  patientQuery(event: any){
    console.log(event.query);
    this.getPatients(event.query)
    
  }

  doctorQuery(event: any){
    console.log(event.query);
    this.getDoctors(event.query)
    
  }
}
