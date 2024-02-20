import { Component, OnInit } from '@angular/core';
import { PatientService, AppointmentService, TokenService, UserService } from 'src/app/services';
import { AddTokenModalComponent } from '../dialog/add-token-modal/add-token-modal.component';
import { UserStateService } from '../../State/user/user.service';
import { IFetchRequest } from '../../models/interfaces/fetchTableRequest';
import { ITableColumns } from 'src/app/models/interfaces/table-Columns';
import { IToken } from 'src/app/models/interfaces/Token';
import { Router } from '@angular/router';
import { SubscriptionManagmentDirective } from 'src/app/shared/directive/subscription-managment.directive';
import { takeUntil } from 'rxjs';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { EChartsOption } from 'echarts';
import { xAxis } from 'src/app/constants/Constants/chartViews';
import { clone, cloneDeep } from 'lodash';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent extends SubscriptionManagmentDirective implements OnInit {
  chartOption: any = {};

  appointmentsData!: Array<any>;
  newTokens: Array<IToken> = [];
  viewdTokens: Array<IToken> = [];
  appointmentsTotalRecords: number = 0;
  roClickAction: Function = this.rowClick.bind(this);

  numberOfpatients: number = 0;
  numberOfRegisteredUsers: number = 0;

  tokensData!: Array<any>;
  tokneTotalRecords: number = 0;
  rangeDates?: [Date, Date];

  messagesData!: Array<any>;
  messageTotalRecords: number = 0;

  userIsAdmin: boolean = false;
  userIsDoctor: boolean = false;

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
      label: 'Current Week',
    },
    {
      id: 'month',
      label: 'Current Month',
    },
    {
      id: 'year',
      label: 'Last Year',
    },
    {
      id: 'custom',
      label: 'Custom Range',
    },
  ];

  selectedFilter: string = 'week';

  constructor(
    private patientService: PatientService,
    private readonly userStateService: UserStateService,
    private readonly appointmentService: AppointmentService,
    private readonly tokenService: TokenService,
    private readonly router: Router,
    private readonly userService: UserService,
    private dialog: DialogService,
    private dialogRef: DynamicDialogRef,
  ) {
    super();
  }

  get allTokens (){
    return [...this.viewdTokens, ...this.newTokens].sort((a: IToken, b: IToken) => a.createdAt.getTime() - b.createdAt.getTime())
  }

  ngOnInit(): void {
    this.getAppointments();
    this.getMessagesData();
    this.getUnViewdTokens();
    this.getViewdTokens();
    this.getTotalpatients();
    this.getAllUsers();
    this.chartOption = this.createChartOption([17, 22, 31, 46, 12, 40, 33, 16]);

    this.userStateService.getUserState().subscribe({
      next: (x) => {
        this.userIsAdmin = x.roles.includes('Admin');
        this.userIsDoctor = x.roles.includes('Doctor');
      }
    })
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

  getTotalpatients(){
    this.patientService.getPatientDropDown().subscribe({
      next: (x) => {
        this.numberOfpatients = x.length;
      }
    })
  }

  getAllUsers(){
    this.userService.getUsers().subscribe({
      next: (x) => {
        this.numberOfRegisteredUsers = x.length;
      },
      error: (err) => {

      }
    })
  }

  rowClick(rowData: IToken) {
    this.router.navigate([`doctor/appointment/${rowData.id}`]);
  }

  private createChartOption(data: number[]): EChartsOption {
    return {
      color: ['#5A79C3'],
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: xAxis.week,
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

  customRangeSelection([startDate, endDate]: [Date, Date]){
    if(startDate && endDate) {

      this.chartOption.xAxis.data = xAxis.custom(startDate, endDate);
      this.chartOption = cloneDeep(this.chartOption);    

    };
  }

  graphPeriodChange({value, originalEvent}: {value: string, originalEvent: PointerEvent} ){
    console.log(value);
    console.log(this.selectedFilter);
    this.rangeDates = undefined;
    switch(value){
      case 'week':
        console.log(`hit ${value}`);
        
        this.chartOption.xAxis.data = xAxis.week; 
        break
      case 'month':
        console.log(`hit ${value}`);

        this.chartOption.xAxis.data = xAxis.month();
        break
      case 'year':
        console.log(`hit ${value}`);

        this.chartOption.xAxis.data = xAxis.year;
        break
      case 'custom':
        console.log(`hit ${value}`);

        this.chartOption.xAxis.data = xAxis.week;
        break
    }

    this.chartOption = cloneDeep(this.chartOption);    
  }


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
      width: '90vw',
      height: '90vh',
      data: { display: true },
    });
  }
}
