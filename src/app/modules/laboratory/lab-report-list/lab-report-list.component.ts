import { Component, OnInit } from '@angular/core';
import { TableColumnFilterTypes } from 'src/app/constants/enums/table-column-filterTypes';
import { IDropDown } from 'src/app/models/interfaces/Dropdown';
import { ITableColumns } from 'src/app/models/interfaces/table-Columns';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { TestsFormComponent } from '../../admin/tests/tests-form/tests-form.component';
import { formatDate } from '@angular/common';
import { TestService } from 'src/app/Services/test-service/test.service';
import { AlertService } from 'src/app/Services/alert/alert.service';
import { ILabeTest } from 'src/app/models/interfaces/labTest';
import { PatientService } from 'src/app/Services/patient/patient.service';



@Component({
  selector: 'app-lab-report-list',
  templateUrl: './lab-report-list.component.html',
  styleUrls: ['./lab-report-list.component.scss']
})
export class LabReportListComponent implements OnInit {
  actionsToShow: Array<string> = ['edit', 'delete'];
  totalRecords: number = 0;
  selectedIndex = 0;
  selectTypes: IDropDown[] = []
  selectReportType: IDropDown[]=[];
  ref!: DynamicDialogRef;
  now = new Date();
  startDatePlaceholder = formatDate(new Date(this.now.getFullYear(), this.now.getMonth(), this.now.getDate() - 7), 'MM/dd/yyyy hh:mm', 'en-US');
  endDatePlaceholder = formatDate(Date.now(), 'MM/dd/yyyy hh:mm', 'en-US');
  datePlaceholder =`${this.startDatePlaceholder} - ${this.endDatePlaceholder}`;

  columns: Array<ITableColumns> = [
    {
      name: 'LAB#',
      property: 'lab',
      filter: false,
      filterType: TableColumnFilterTypes.Text
    },
    {
      name: 'MR#',
      property: 'mr',
      filter: false,
      filterType: TableColumnFilterTypes.Text
    },
    {
      name: 'PATIENT',
      property: 'patient',
      filter: false,
      filterType: TableColumnFilterTypes.Text
    },
    {
      name: 'PATIENT TYPE',
      property: 'patientType',
      filter: false,
      filterType: TableColumnFilterTypes.Text
    },
    {
      name: 'NAME',
      property: 'name',
      filter: false,
      filterType: TableColumnFilterTypes.Text
    },
    {
      name: 'PRICE',
      property: 'price',
      filter: false,
      filterType: TableColumnFilterTypes.Text
    },
    {
      name: 'LAB REFERAL',
      property: 'referal',
      filter: false,
      filterType: TableColumnFilterTypes.Text
    },
    {
      name: 'ADDED BY',
      property: 'addedBy',
      filter: false,
      filterType: TableColumnFilterTypes.Text
    },
    {
      name: 'CREATED AT',
      property: 'createdAt',
      filter: false,
      filterType: TableColumnFilterTypes.Text
    }
  ];
  testsList: ILabeTest[]=[];
  testsToShow: any;
  labTests: any;
constructor(public readonly dialogService: DialogService,
  private readonly testsService: TestService,
  private readonly alertService: AlertService,
  private patientService: PatientService
  ){
  console.log(this.startDatePlaceholder,this.endDatePlaceholder)
}
  ngOnInit(): void {
    this.getLabTestData();
    this.getTests();
  }

selctData(event:any){
  console.log(event)
}

handleChange(tabIndex:number){
  this.selectedIndex = tabIndex;

  console.log(this.selectedIndex)
}

getTests(): void {
  this.testsService.getTests().subscribe({
    next: (x: any) => {
      this.testsList = x.data;
    },
    error: (err: Error) => {
      this.alertService.error('Somthing went wrong while getting Lab Tests.', 'Error');
    }
  })
}


getLabTestData() {
  this.patientService.getLabTests().subscribe((res: any) => {
    console.log(res)
    this.labTests = res
    this.totalRecords = res.length
  })
}

search(event:any){
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
      action: action
    }
  });
  this.ref.onClose.subscribe((test) => {
  });
}

}
