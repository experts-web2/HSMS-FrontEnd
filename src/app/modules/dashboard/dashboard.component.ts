import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
// import { FormControl } from '@angular/forms';
import * as echarts from 'echarts';
// import { EChartOption } from 'echarts';
// import { appointmentModel } from '../models/patient-model';
import { PatientService } from '../../Services/patient/patient.service';
// import { ChartColors } from '@app/types/chart'
import EChartOption = echarts.EChartsOption
import { AddTokenModalComponent } from '../dialog/add-token-modal/add-token-modal.component';
import { UserStateService } from '../../State/user/user.service';
import { AppointmentService } from '../../Services/appointment.service';
import { IFetchRequest } from '../../models/interfaces/fetchTableRequest';
import { ITableColumns } from 'src/app/models/interfaces/table-Columns';
import { TableColumnFilterTypes } from 'src/app/constants/enums/table-column-filterTypes';
import { DataTypesEnum } from 'src/app/constants/enums/dataTypes';
import { TokenService } from 'src/app/Services/token.service';





// const APPOINTMENTS_DATA: any[] = [
//   {name: '', time: 'There Are No Tokens For Today', doctor: ''},
// ];

// const MESSAGES_DATA: any[] = [
//   {sendAt: '12 Days Ago', message: 'Dear Anwar, welcome to MedicaZon Hospital Multan, Thank you for choosing us.'},
//   {sendAt: '12 Days Ago', message: 'Dear Zohaib, welcome to MedicaZon Hospital Multan, Thank you for choosing us.'},
//   {sendAt: '12 Days Ago', message: 'Dear Abdullah, welcome to MedicaZon Hospital Multan, Thank you for choosing us.'},
//   {sendAt: '12 Days Ago', message: 'Dear Waqas, welcome to MedicaZon Hospital Multan, Thank you for choosing us.'},
//   {sendAt: '12 Days Ago', message: 'Dear Mohsin, welcome to MedicaZon Hospital Multan, Thank you for choosing us.'},
//   {sendAt: '', message: 'There Are No Tokens For Today'},
// ];


// const TOKENS_DATA: any[] = [
//   {token: '', patient: 'There Are No Tokens For Today', doctor: ''},
// ]

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  // grid: EChartOption.Grid = {
  //   top: 5,
  //   bottom: 5,
  //   left: -10,
  //   right: 0,
  // }
  chartOption: any = {}

  // displayedAppointmentColumns: string[] = ['name', 'time', 'doctor'];
  // displayedMessageColumns: string[] = ['sendAt', 'message'];
  // displayedTokensColumns: string[] = ['token', 'patient', 'doctor'];
  appointmentsData!: Array<any>;
  appointmentsTotalRecords: number = 0;

  tokensData!: Array<any>;
  tokneTotalRecords: number = 0;

  messagesData!: Array<any>;
  messageTotalRecords: number = 0;


  displayedAppointmentColumns: Array<ITableColumns> = [
    {
      name: 'Patient Name',
      property: 'name',
    },
    {
      name: 'Appointment Time',
      property: 'time',
    },
    {
      name: 'Doctor Name',
      property: 'doctor',
    }
  ];
  displayedMessageColumns: Array<ITableColumns> = [
    {
      name: 'Send At#',
      property: 'sendAt',
    },
    {
      name: 'Message',
      property: 'message',
    }
  ];
  displayedTokensColumns: Array<ITableColumns> = [
    {
      name: 'Token#',
      property: 'token',
    },
    {
      name: 'Patient Name',
      property: 'patient',
    },
    {
      name: 'Doctor Name',
      property: 'doctor',
    }
  ];
 


  constructor(private patientService: PatientService,private dialog: MatDialog, private readonly userStateService: UserStateService, private readonly appointmentService: AppointmentService, private readonly tokenService: TokenService) { }

  filter: any = [
    {
      id: "week",
      label: "Last 7 Days"
    },
    {
      id: "month",
      label: "Last 30 Days"
    },
    {
      id: "cutom",
      label: "Custom Range"
    }
  ];

  ngOnInit(): void {
    this.getAppointments();
    this.getMessagesData();
    // this.getTokensData();
    this.chartOption = this.createChartOption([17, 22, 31, 46, 12, 40, 33, 16])

  }

  getViewdTokens(){
    this.tokenService.getTokensByViewd(true).subscribe({
      next: (x) => {
        console.log(x);
        
      },
      error: (err) => {

      }
    })
  }

  getUnViewdTokens(){
    this.tokenService.getTokensByViewd(false).subscribe({
      next: (x) => {
        console.log(x);
        
      },
      error: (err) => {
        
      }
    })
  }

  private createChartOption(data: number[]): EChartOption {
    return {
      color: ['#5A79C3'],
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        show: true,
      },
      yAxis: {
        type: 'value',
        show: true,
        // Scale, min & max: specifies whether not to contain zero position and adjust axis values in case of scattered data.
        scale: true,
        // min: Math.min(...data),
        // max: Math.max(...data),
      },
      series: [
        {
          data,
          type: 'line',
          symbol: 'circle'
        },
      ],
    }
  }

  selectedFilter: string = "Last 7 Days";

  getAppointments(fetchRequest: IFetchRequest = {}) {
    this.appointmentService.getAppointments(fetchRequest).subscribe({
      next: (x: any) => {
        console.log(x);
        
      },
      error: (err: Error) => {

      }
    })
    this.patientService.getAppointments().subscribe((res: any) => {
      this.appointmentsData = res.appointments
    })
  }

  getMessagesData() {
    this.patientService.getMessages().subscribe((res: any) => {
      this.messagesData = res
      this.messageTotalRecords = res.length
    })
  }

  // getTokensData() {
  //   this.patientService.getTokens().subscribe((res: any) => {
  //     this.tokensData = res
  //   })
  // }

  addToken(){
    this.dialog.open(AddTokenModalComponent, {
      // maxWidth: '100vw',
      width: '90vw',
      maxWidth: '',
      height: '90vh',
      data: {},
    });    
  }

}
