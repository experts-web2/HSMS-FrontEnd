import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/Services/alert/alert.service';
import { TestService } from 'src/app/Services/test-service/test.service';
import { DataTypesEnum } from 'src/app/constants/enums/dataTypes';
import { TableColumnFilterTypes } from 'src/app/constants/enums/table-column-filterTypes';
import { ILabeTest } from 'src/app/models/interfaces/labTest';
import { ITableColumns } from 'src/app/models/interfaces/table-Columns';
import { TestCategoryService } from '../../../../Services/testCategory-service/test-category.service';
import { ILabTestCategory } from 'src/app/models/interfaces/labTestCategory';

@Component({
  selector: 'app-tests-list',
  templateUrl: './tests-list.component.html',
  styleUrls: ['./tests-list.component.scss']
})
export class TestsListComponent implements OnInit {
  testsList!: Array<ILabeTest>;
  categories!: Array<ILabTestCategory>;
  totalRecords: number = 0;

  columns: Array<ITableColumns> = [
    {
      name: 'Name',
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

  constructor(private readonly testsService: TestService, private readonly alertService: AlertService, private readonly testCategoryService: TestCategoryService) { }

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

  getCategories(){
    this.testCategoryService.getCategories().subscribe({
      next: (x: any) => {
        this.categories = x.data;
      },
      error: (err: Error) => {
        this.alertService.error('Somthing wnet weong while fetching categories.', 'Error')
      }
    })
  }

  getCategoryName(id: string): string{    
    let categoryName = this.categories?.find(x => x.id === id)?.name;
    if (!categoryName) return 'N/A';
    return categoryName
  }

  edit(test: ILabeTest): void {
    console.log(test);
  }

  delete(test: ILabeTest): void {
    console.log(test);
  }


}
