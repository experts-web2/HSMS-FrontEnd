import { Component } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { takeUntil } from 'rxjs/operators';
import { SortOrder } from 'src/app/constants/enums/SortOrder';
import { DataTypesEnum } from 'src/app/constants/enums/dataTypes';
import { TableColumnFilterTypes } from 'src/app/constants/enums/table-column-filterTypes';
import { IFetchRequest } from 'src/app/models/interfaces/fetchTableRequest';
import { ISaltRequest } from 'src/app/models/interfaces/saltRequest';
import { ITableColumns } from 'src/app/models/interfaces/table-Columns';
import { AlertService } from 'src/app/services';
import { MedicineSaltsService } from 'src/app/services/medicine-salts/medicine-salts.service';
import { SubscriptionManagmentDirective } from 'src/app/shared/directive/subscription-managment.directive';
import { MedicineSaltsFormComponent } from '../medicine-salts-form/medicine-salts-form.component';

@Component({
  selector: 'app-medicine-salts-list',
  templateUrl: './medicine-salts-list.component.html',
  styleUrls: ['./medicine-salts-list.component.scss']
})
export class MedicineSaltsListComponent extends SubscriptionManagmentDirective {
  medicineSaltList: Array<any> = [];
  totalRecords: number = 0;
  actionsToShow: Array<string> = ['edit', 'delete'];
  ref!: DynamicDialogRef;
  columns: Array<ITableColumns> = [
    {
      name: 'Salt Name',
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
    private readonly medicineSaltService: MedicineSaltsService,
    public dialogService: DialogService,
    private readonly alertService: AlertService
  ) {
    super();
  }

  ngOnInit(): void {
    this.getSalts();
  }

  getSalts() {
    let getMedicineSaltPayload: IFetchRequest = {
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
    this.medicineSaltService
      .getSaltsList(getMedicineSaltPayload)
      .pipe(takeUntil(this.componetDestroyed))
      .subscribe((x) => {
        this.medicineSaltList = x.data;
        this.totalRecords = x.total;
      });
  }

  addSalt(salt?: ISaltRequest, action: string = 'add') {
    this.ref = this.dialogService.open(MedicineSaltsFormComponent, {
      width: '30%',
      height: '60%',
      data: {
        salt: salt,
        action: action,
      },
    });
    this.ref.onClose.subscribe((medicine) => {
      if (medicine) {
        this.getSalts();
      }
    });
  }

  edit(editSalt: ISaltRequest) {
    this.addSalt(editSalt, 'update');
  }

  delete(deleteSalt: ISaltRequest) {
    this.medicineSaltService
      .deleteSalt(deleteSalt)
      .pipe(takeUntil(this.componetDestroyed))
      .subscribe({
        next: (x) => {
          this.alertService.success('Success', 'Salt delete successfully');
          this.getSalts();
        },
        error: (err) => {
          this.alertService.error(
            'Error',
            'An error occoured while delete Salt'
          );
        },
      });
  }
}
