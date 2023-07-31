import { Component } from '@angular/core';
import { TestCategoryService, AlertService } from 'src/app/services';
import { DataTypesEnum } from 'src/app/constants/enums/dataTypes';
import { TableColumnFilterTypes } from 'src/app/constants/enums/table-column-filterTypes';
import { IFetchRequest } from 'src/app/models/interfaces/fetchTableRequest';
import { IFiltersRequest } from 'src/app/models/interfaces/filterRequst';
import { ILabTestCategory } from 'src/app/models/interfaces/labTestCategory';
import { ITableColumns } from 'src/app/models/interfaces/table-Columns';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CategoriesFormComponent } from '../categories-form/categories-form.component';
import { IAddOrUpdateCategoryRequest } from 'src/app/models/interfaces/addOrUpdate-Category';
import { SubscriptionManagmentDirective } from 'src/app/shared/directive/subscription-managment.directive';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'app-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.scss'],
})
export class CategoriesListComponent extends SubscriptionManagmentDirective {
  labTestCategoryList: Array<ILabTestCategory> = [];
  totalRecords: number = 0;
  actionsToShow: Array<string> = ['edit', 'delete'];
  ref!: DynamicDialogRef;
  columns: Array<ITableColumns> = [
    {
      name: 'Name',
      property: 'name',
      filter: true,
      filterType: TableColumnFilterTypes.Text,
    },
    {
      name: 'Created By',
      property: 'createdBy',
      filter: true,
    },
    {
      name: 'Date Created',
      property: 'createdAt',
      filter: true,
      filterType: TableColumnFilterTypes.Date,
      columnType: DataTypesEnum.Date,
    },
  ];

  constructor(
    private readonly testCategoryService: TestCategoryService,
    public dialogService: DialogService,
    private readonly alertService: AlertService
  ) {
    super();
  }

  ngOnInit(): void {
    this.getCategory();
  }

  getCategory(filterRequest: IFetchRequest = {}) {
    this.testCategoryService
      .getCategories(filterRequest)
      .pipe(takeUntil(this.componetDestroyed))
      .subscribe((x) => {
        this.labTestCategoryList = x.data;
        this.totalRecords = x.total;
      });
  }

  addCategory(category?: IAddOrUpdateCategoryRequest, action: string = 'add') {
    this.ref = this.dialogService.open(CategoriesFormComponent, {
      width: '30%',
      height: '60%',
      data: {
        category: category,
        action: action,
      },
    });
    this.ref.onClose.subscribe((medicine) => {
      if (medicine) {
        this.getCategory();
      }
    });
  }

  edit(editCategory: IAddOrUpdateCategoryRequest) {
    this.addCategory(editCategory, 'update');
  }

  delete(deleteCategory: IAddOrUpdateCategoryRequest) {
    this.testCategoryService
      .deleteCategory(deleteCategory)
      .pipe(takeUntil(this.componetDestroyed))
      .subscribe({
        next: (x) => {
          this.alertService.success('Success', 'Category delete successfully');
          this.getCategory();
        },
        error: (err) => {
          this.alertService.error(
            'Error',
            'An error occoured while delete category'
          );
        },
      });
  }
}
