import { Component } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { takeUntil } from 'rxjs';
import { DataTypesEnum } from 'src/app/constants/enums/dataTypes';
import { TableColumnFilterTypes } from 'src/app/constants/enums/table-column-filterTypes';
import { IFetchRequest } from 'src/app/models/interfaces/fetchTableRequest';
import { ITableColumns } from 'src/app/models/interfaces/table-Columns';
import { AlertService, VendorService } from 'src/app/services';
import { SubscriptionManagmentDirective } from 'src/app/shared/directive/subscription-managment.directive';
import { AddVendorComponent } from '../add-vendor/add-vendor.component';
import { IVendor, IVendorRequest } from 'src/app/models/interfaces/vendorRequest';
import { ILabTestCategory } from 'src/app/models/interfaces/labTestCategory';


@Component({
  selector: 'app-vendor-list',
  templateUrl: './vendor-list.component.html',
  styleUrls: ['./vendor-list.component.scss']
})
export class VendorListComponent extends SubscriptionManagmentDirective {
  vendorsList: Array<IVendor> = [];
  totalRecords: number = 0;
  actionsToShow: Array<string> = ['edit', 'delete'];
  ref!: DynamicDialogRef;
  columns: Array<ITableColumns> = [
    {
      name: 'First Name',
      property: 'firstName',
      sortable:true
    },
    {
      name: 'Last Name',
      property: 'lastName',
      sortable:true
    },
    {
      name: 'Company Name',
      property: 'companyName',
      sortable:true
    },
    {
      name: 'Phone Number',
      property: 'phoneNumber',
      sortable:true
    },
    {
      name: 'Address',
      property: 'address',
      sortable:true
    },
  ];

  constructor(
    public dialogService: DialogService,
    private readonly alertService: AlertService,
    private readonly vendorService: VendorService,
  ) {
    super();
  }

  ngOnInit(): void {
    this.getVenders();
  }

  getVenders(filterRequest: IFetchRequest = {}) {
    this.vendorService
      .getVendorsList(filterRequest)
      .pipe(takeUntil(this.componetDestroyed))
      .subscribe((x) => {
        this.vendorsList = x.data;
        this.totalRecords = x.total;
      });
  }

  addVendor(vendor?: IVendor, action: string = 'add') {
    this.ref = this.dialogService.open(AddVendorComponent, {
      width: '60%',
      height: '60%',
      data: {
        vendor: vendor,
        action: action,
      },
    });
    this.ref.onClose.subscribe((vendor) => {
      if (vendor) {
        this.getVenders();
      }
    });
  }

  edit(editVendor: IVendor) {
    console.log('editVendor',editVendor)
    this.addVendor(editVendor, 'update');
  }

  delete(deleteCategory: IVendor) {
    this.vendorService
      .deleteVendor(deleteCategory)
      .pipe(takeUntil(this.componetDestroyed))
      .subscribe({
        next: (x) => {
          this.alertService.success('Success', 'Category delete successfully');
          this.getVenders();
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
