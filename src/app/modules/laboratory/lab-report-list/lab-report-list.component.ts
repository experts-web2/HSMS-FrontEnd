import { Component, OnInit } from '@angular/core';
import { TableColumnFilterTypes } from 'src/app/constants/enums/table-column-filterTypes';
import { IDropDown } from 'src/app/models/interfaces/Dropdown';
import { ITableColumns } from 'src/app/models/interfaces/table-Columns';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { TestsFormComponent } from '../../admin/tests/tests-form/tests-form.component';
import { formatDate } from '@angular/common';
import { TestService, AlertService, PatientTestService } from 'src/app/services';
import { ILabeTest } from 'src/app/models/interfaces/labTest';
import { PatientService } from 'src/app/services';
import { SubscriptionManagmentDirective } from 'src/app/shared/directive/subscription-managment.directive';
import { takeUntil } from 'rxjs';
import { IFetchRequest } from 'src/app/models/interfaces/fetchTableRequest';
import { SortOrder } from 'src/app/constants/enums/SortOrder';
import { DataTypesEnum } from 'src/app/constants/enums/dataTypes';

@Component({
  selector: 'app-lab-report-list',
  templateUrl: './lab-report-list.component.html',
  styleUrls: ['./lab-report-list.component.scss'],
})
export class LabReportListComponent
  extends SubscriptionManagmentDirective
  implements OnInit
{
  actionsToShow: Array<string> = ['edit', 'delete'];
  totalRecords: number = 0;
  selectTypes: IDropDown[] = [];
  selectReportType: IDropDown[] = [];
  ref!: DynamicDialogRef;
  now = new Date();
  startDatePlaceholder = formatDate(
    new Date(
      this.now.getFullYear(),
      this.now.getMonth(),
      this.now.getDate() - 7
    ),
    'MM/dd/yyyy hh:mm',
    'en-US'
  );
  endDatePlaceholder = formatDate(Date.now(), 'MM/dd/yyyy hh:mm', 'en-US');
  datePlaceholder = `${this.startDatePlaceholder} - ${this.endDatePlaceholder}`;

  columns: Array<ITableColumns> = [
    {
      name: 'LAB#',
      property: 'lab',
      filter: false,
      filterType: TableColumnFilterTypes.Text,
    },
    {
      name: 'MR#',
      property: 'mrNo',
      filter: false,
      filterType: TableColumnFilterTypes.Text,
    },
    {
      name: 'PATIENT',
      property: 'patientName',
      filter: false,
      filterType: TableColumnFilterTypes.Text,
    },
    {
      name: 'PATIENT TYPE',
      property: 'patientType',
      filter: false,
      filterType: TableColumnFilterTypes.Text,
    },
    {
      name: 'TEST NAME',
      property: 'testName',
      filter: false,
      filterType: TableColumnFilterTypes.Text,
    },
    {
      name: 'PRICE',
      property: 'price',
      filter: false,
      filterType: TableColumnFilterTypes.Text,
    },
    {
      name: 'LAB REFERAL',
      property: 'referal',
      filter: false,
      filterType: TableColumnFilterTypes.Text,
    },
    {
      name: 'ADDED BY',
      property: 'createdBy',
      filter: false,
      filterType: TableColumnFilterTypes.Text,
    },
    {
      name: 'CREATED AT',
      property: 'createdAt',
      valueToShow: this.dateFormate.bind(this),
    },
  ];
  testsList: ILabeTest[] = [];
  testsToShow: any;
  sampleTests: any;
  sampleTestPending: any;
  sampleTestPendingTotalRecords: any;
  constructor(
    public readonly dialogService: DialogService,
    private readonly testsService: TestService,
    private readonly alertService: AlertService,
    private patientTestService: PatientTestService
  ) {
    super();
    console.log(this.startDatePlaceholder, this.endDatePlaceholder);
  }
  ngOnInit(): void {
    this.getLabSampleCollected();
    this.getTests();
  }

  handleChange(tabIndex: number) {
    console.log(tabIndex)
    switch (tabIndex) {
      case 0:
        this.getLabSampleCollected();
        break;
      case 1:
        this.getLabSamplePending();
        break;
      default:
        break;
    }
  }

  getTests(): void {
    let getAllLabTestPayload: IFetchRequest = {
      pagedListRequest:{
        pageNo: 1,
        pageSize: 100
      },
      queryOptionsRequest:{
        filtersRequest:[],
        sortRequest:[
          {
            field: 'CreatedAt',
            direction: SortOrder.Descending,
            priority: 1
          }
        ]
      }
    }
    this.testsService
      .getTests(getAllLabTestPayload)
      .pipe(takeUntil(this.componetDestroyed))
      .subscribe({
        next: (x: any) => {
          this.testsList = x.data;
        },
        error: (err: Error) => {
          this.alertService.error(
            'Somthing went wrong while getting Lab Tests.',
            'Error'
          );
        },
      });
  }

  getLabSampleCollected() {
    let getLabTestCollectionPayload: IFetchRequest = {
      pagedListRequest:{
        pageNo: 1,
        pageSize: 100
      },
      queryOptionsRequest:{
        filtersRequest:[],
        sortRequest:[
          {
            field: 'CreatedAt',
            direction: SortOrder.Descending,
            priority: 1
          }
        ]
      }
    }
    this.patientTestService
      .getsamplecollections(getLabTestCollectionPayload)
      .pipe(takeUntil(this.componetDestroyed))
      .subscribe((res: any) => {
        console.log(res);
        this.sampleTests = res.data;
        this.totalRecords = res.total;
      });
  }


  getLabSamplePending() {
    let getLabTestCollectionPayload: IFetchRequest = {
      pagedListRequest:{
        pageNo: 1,
        pageSize: 100
      },
      queryOptionsRequest:{
        filtersRequest:[],
        sortRequest:[
          {
            field: 'CreatedAt',
            direction: SortOrder.Descending,
            priority: 1
          }
        ]
      }
    }
    this.patientTestService
      .getpendingsamplecollections(getLabTestCollectionPayload)
      .pipe(takeUntil(this.componetDestroyed))
      .subscribe((res: any) => {
        console.log(res);
        this.sampleTestPending = res.data;
        this.sampleTestPendingTotalRecords = res.total;
      });
  }

  dateFormate(date: string): string {
    return formatDate(date, 'MM/dd/yyyy hh:mm:aa', 'en-US');
  }

  search(event: any) {
    console.log(event.query);
    const query = event.query;
    this.testsToShow = this.testsList.filter((patient) =>
      patient.name.toLowerCase().includes(query.toLowerCase())
    );
  }

  addTests(test?: any, action: string = 'add') {
    this.ref = this.dialogService.open(TestsFormComponent, {
      width: '80%',
      height: '80%',
      data: {
        test: test,
        action: action,
      },
    });
    this.ref.onClose.subscribe((test) => {});
  }
}
