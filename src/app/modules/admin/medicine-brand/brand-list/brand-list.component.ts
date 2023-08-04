import { Component } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { SubscriptionManagmentDirective } from 'src/app/shared/directive/subscription-managment.directive';
import { takeUntil } from 'rxjs';
import { AlertService } from 'src/app/services';
import { ITableColumns } from 'src/app/models/interfaces/table-Columns';
import { TableColumnFilterTypes } from 'src/app/constants/enums/table-column-filterTypes';
import { DataTypesEnum } from 'src/app/constants/enums/dataTypes';
import { MedicineBrandService } from 'src/app/Services/medicine-brand/medicine-brand.service';
import { IFetchRequest } from 'src/app/models/interfaces/fetchTableRequest';
import { BrandFormComponent } from '../brand-form/brand-form.component';
import { IAddOrUpdateBrandRequest } from 'src/app/models/interfaces/medicine-brand';



@Component({
  selector: 'app-brand-list',
  templateUrl: './brand-list.component.html',
  styleUrls: ['./brand-list.component.scss']
})
export class BrandListComponent extends SubscriptionManagmentDirective {
  medicineBrandList: Array<any> = [];
  totalRecords: number = 0;
  actionsToShow: Array<string> = ['edit', 'delete'];
  ref!: DynamicDialogRef;
  columns: Array<ITableColumns> = [
    {
      name: 'Brand Name',
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
    private readonly medicineBrandService: MedicineBrandService,
    public dialogService: DialogService,
    private readonly alertService: AlertService
  ) {
    super();
  }

  ngOnInit(): void {
    this.getBrands();
  }

  getBrands(filterRequest: IFetchRequest = {}) {
    this.medicineBrandService
      .getBrandsList(filterRequest)
      .pipe(takeUntil(this.componetDestroyed))
      .subscribe((x) => {
        this.medicineBrandList = x;
        this.totalRecords = x.total;
      });
  }

  addBrand(brand?: IAddOrUpdateBrandRequest, action: string = 'add') {
    this.ref = this.dialogService.open(BrandFormComponent, {
      width: '30%',
      height: '60%',
      data: {
        brand: brand,
        action: action,
      },
    });
    this.ref.onClose.subscribe((medicine) => {
      if (medicine) {
        this.getBrands();
      }
    });
  }

  edit(editBrand: IAddOrUpdateBrandRequest) {
    this.addBrand(editBrand, 'update');
  }

  delete(deleteBrand: IAddOrUpdateBrandRequest) {
    this.medicineBrandService
      .deleteBrand(deleteBrand)
      .pipe(takeUntil(this.componetDestroyed))
      .subscribe({
        next: (x) => {
          this.alertService.success('Success', 'Brand delete successfully');
          this.getBrands();
        },
        error: (err) => {
          this.alertService.error(
            'Error',
            'An error occoured while delete Brand'
          );
        },
      });
  }
}
