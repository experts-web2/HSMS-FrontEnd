import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import * as echarts from 'echarts';
import {
  PatientService,
  AppointmentService,
  TokenService,
} from 'src/app/services';
import EChartOption = echarts.EChartsOption;
import { AddTokenModalComponent } from '../dialog/add-token-modal/add-token-modal.component';
import { UserStateService } from '../../State/user/user.service';
import { IFetchRequest } from '../../models/interfaces/fetchTableRequest';
import { ITableColumns } from 'src/app/models/interfaces/table-Columns';
import { IToken } from 'src/app/models/interfaces/Token';
import { Router } from '@angular/router';
import { SubscriptionManagmentDirective } from 'src/app/shared/directive/subscription-managment.directive';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent
  extends SubscriptionManagmentDirective
  implements OnInit
{
  chartOption: any = {};

  appointmentsData!: Array<any>;
  newTokens: Array<IToken> = [];
  viewdTokens: Array<IToken> = [];
  appointmentsTotalRecords: number = 0;
  roClickAction: Function = this.rowClick.bind(this);

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
    },
  ];

  displayedMessageColumns: Array<ITableColumns> = [
    {
      name: 'Send At#',
      property: 'sendAt',
    },
    {
      name: 'Message',
      property: 'message',
    },
  ];

  displayedTokensColumns: Array<ITableColumns> = [
    {
      name: 'Token#',
      property: 'tokenNo',
    },
    {
      name: 'Patient Name',
      property: 'patientName',
    },
    {
      name: 'Doctor Name',
      property: 'doctorName',
    },
  ];

  filter: any = [
    {
      id: 'week',
      label: 'Last 7 Days',
    },
    {
      id: 'month',
      label: 'Last 30 Days',
    },
    {
      id: 'cutom',
      label: 'Custom Range',
    },
  ];

  constructor(
    private patientService: PatientService,
    private dialog: MatDialog,
    private readonly userStateService: UserStateService,
    private readonly appointmentService: AppointmentService,
    private readonly tokenService: TokenService,
    private readonly router: Router
  ) {
    super();
  }

  ngOnInit(): void {
    this.getAppointments();
    this.getMessagesData();
    this.getUnViewdTokens();
    this.getViewdTokens();
    this.chartOption = this.createChartOption([17, 22, 31, 46, 12, 40, 33, 16]);
  }

  getViewdTokens() {
    this.tokenService
      .getTokensByViewd(true)
      .pipe(takeUntil(this.componetDestroyed))
      .subscribe({
        next: (x) => {
          this.viewdTokens = x;
        },
        error: (err) => {},
      });
  }

  getUnViewdTokens() {
    this.tokenService
      .getTokensByViewd(false)
      .pipe(takeUntil(this.componetDestroyed))
      .subscribe({
        next: (x) => {
          this.newTokens = x;
        },
        error: (err) => {},
      });
  }

  rowClick(rowData: IToken) {
    this.router.navigate([`doctor/appointment/${rowData.id}`]);
  }

  private createChartOption(data: number[]): EChartOption {
    return {
      color: ['#5A79C3'],
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: [
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sep',
          'Oct',
          'Nov',
          'Dec',
        ],
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
          symbol: 'circle',
        },
      ],
    };
  }

  selectedFilter: string = 'Last 7 Days';

  getAppointments(fetchRequest: IFetchRequest = {}) {
    this.appointmentService.getAppointments(fetchRequest).pipe(takeUntil(this.componetDestroyed)).subscribe({
      next: (x: any) => {
        
      },
      error: (err: Error) => {

      }
    })
    this.patientService.getAppointments().pipe(takeUntil(this.componetDestroyed)).subscribe((res: any) => {
      this.appointmentsData = res.appointments
    })
  }

  getMessagesData() {
    this.patientService
      .getMessages()
      .pipe(takeUntil(this.componetDestroyed))
      .subscribe((res: any) => {
        this.messagesData = res;
        this.messageTotalRecords = res.length;
      });
  }

  // getTokensData() {
  //   this.patientService.getTokens().subscribe((res: any) => {
  //     this.tokensData = res
  //   })
  // }

  addToken() {
    this.dialog.open(AddTokenModalComponent, {
      // maxWidth: '100vw',
      width: '90vw',
      maxWidth: '',
      height: '90vh',
      data: { display: true },
    });
  }
}
