import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/Services/alert/alert.service';
import { TestService } from 'src/app/Services/test-service/test.service';
import { DataTypesEnum } from 'src/app/constants/enums/dataTypes';
import { TableColumnFilterTypes } from 'src/app/constants/enums/table-column-filterTypes';
import { ILabeTest } from 'src/app/models/interfaces/labTest';
import { ITableColumns } from 'src/app/models/interfaces/table-Columns';
import { TestCategoryService } from '../../../../Services/testCategory-service/test-category.service';
import { ILabTestCategory } from 'src/app/models/interfaces/labTestCategory';
import { TestsFormComponent } from '../tests-form/tests-form.component';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';


@Component({
  selector: 'app-tests-list',
  templateUrl: './tests-list.component.html',
  styleUrls: ['./tests-list.component.scss']
})
export class TestsListComponent implements OnInit {
  testsList!: Array<ILabeTest>;
  categories!: Array<ILabTestCategory>;
  totalRecords: number = 0;
  ref!: DynamicDialogRef;
  actionsToShow: Array<string> = ['edit', 'delete'];

  columns: Array<ITableColumns> = [
    {
      name: 'Code',
      property: 'code',
      filter: true,
      filterType: TableColumnFilterTypes.Text
    },
    {
      name: ' Test Name',
      property: 'name',
      filter: true,
      filterType: TableColumnFilterTypes.Text
    },
    {
      name: 'Price',
      property: 'price',
      filter: true,
      filterType: TableColumnFilterTypes.Numeric
    },
    {
      name: 'Sample',
      property: 'testSample',
      filter: true,
      filterType: TableColumnFilterTypes.Numeric
    },
    {
      name: 'Reporting Time',
      property: 'reportTime',
      filter: true,
      filterType: TableColumnFilterTypes.Numeric
    },
    {
      name: 'Created By',
      property: 'createdBy',
      filter: true
    },
    {
      name: 'Date Created',
      property: 'createdAt',
      filter: true,
      filterType: TableColumnFilterTypes.Date,
      columnType: DataTypesEnum.Date
    },
    {
      name: 'Category',
      property: 'testCategoryId',
      filter: true,
      valueToShow: this.getCategoryName.bind(this)
    }
  ];

  constructor(
    private readonly testsService: TestService,
    private readonly alertService: AlertService,
    private readonly testCategoryService: TestCategoryService,
    public readonly dialogService: DialogService) { }

  ngOnInit(): void {
    this.getTests();
    this.getCategories();
  }

  getTests(): void {
    this.testsService.getTests().subscribe({
      next: (x: any) => {
        this.testsList = x.data;
        this.totalRecords = x.total;
      },
      error: (err: Error) => {
        this.alertService.error('Somthing went wrong while getting Lab Tests.', 'Error');
      }
    })
  }

  getCategories() {
    this.testCategoryService.getCategories().subscribe({
      next: (x: any) => {
        this.categories = x.data;
      },
      error: (err: Error) => {
        this.alertService.error('Somthing wnet weong while fetching categories.', 'Error')
      }
    })
  }

  getCategoryName(id: string): string {
    let categoryName = this.categories?.find(x => x.id === id)?.name;
    if (!categoryName) return 'N/A';
    return categoryName
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
      if (test === true) {
        this.getTests();
      }
    });
  }

  edit(test: ILabeTest): void {
    this.addTests(test, 'update')
  }

  deleteTest(test: ILabeTest): void {
    this.testsService.deleteTest(test).subscribe({
      next: (x) => {
        this.alertService.success('Success', 'Test delete successfully');
        this.getTests();
      },
      error: (err) => {
        this.alertService.error('Error', 'An error occoured while delete test')
      }
    })
  }


}
