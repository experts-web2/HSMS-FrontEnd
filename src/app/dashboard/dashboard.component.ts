import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
// import { FormControl } from '@angular/forms';
import * as echarts from 'echarts';
import { AddTokenModalComponent } from '../dialog/add-token-modal/add-token-modal.component';
// import { EChartOption } from 'echarts';
// import { appointmentModel } from '../models/patient-model';
import { PatientService } from '../Services/patient/patient.service';
// import { ChartColors } from '@app/types/chart'
import EChartOption = echarts.EChartsOption





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

  displayedColumns: string[] = ['name', 'time', 'doctor'];
  displayedMessageColumns: string[] = ['sendAt', 'message'];
  displayedTokensColumns: string[] = ['token', 'patient', 'doctor'];
  appointmentsData: any;
  messagesData: any;
  tokensData: any;


  constructor(private patientService: PatientService,private dialog: MatDialog) { }

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
    this.getTokensData();
    this.chartOption = this.createChartOption([17, 22, 31, 46, 12, 40, 33, 16])

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

  getAppointments() {
    this.patientService.getAppointments().subscribe((res: any) => {
      this.appointmentsData = res.appointments
    })
  }

  getMessagesData() {
    this.patientService.getMessages().subscribe((res: any) => {
      this.messagesData = res
    })
  }

  getTokensData() {
    this.patientService.getTokens().subscribe((res: any) => {
      this.tokensData = res
    })
  }

  addToken(){
    this.dialog.open(AddTokenModalComponent, {
      maxWidth: '100vw',
      width: 'calc(100vw - 515px)',
      height: 'calc(100vh - 35px)',
      data: {},
    });    
  }

}
