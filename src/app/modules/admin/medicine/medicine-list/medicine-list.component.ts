import { Component, OnInit } from '@angular/core';
import { MedicineService } from '../../../../Services/medicine-service/medicine.service';
import { IFiltersRequest } from 'src/app/models/interfaces/filterRequst';
import { ITableColumns } from 'src/app/models/interfaces/table-Columns';
import { TableColumnFilterTypes } from 'src/app/constants/enums/table-column-filterTypes';
import { DataTypesEnum } from 'src/app/constants/enums/dataTypes';
import { PotencyUnits } from 'src/app/constants/enums/potency-units';
import { IFetchRequest } from 'src/app/models/interfaces/fetchTableRequest';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MedicineFormComponent } from '../medicine-form/medicine-form.component';
import { AlertService } from 'src/app/Services/alert/alert.service';
import { IMedicinerequest } from 'src/app/models/interfaces/medicine-Request';
import { SubscriptionManagmentDirective } from 'src/app/Shared/directive/subscription-managment.directive';
import { takeUntil } from 'rxjs';


@Component({
  selector: 'app-medicine-list',
  templateUrl: './medicine-list.component.html',
  styleUrls: ['./medicine-list.component.scss']
})
export class MedicineListComponent extends SubscriptionManagmentDirective implements OnInit {
  medicineList: Array<any> = [];
  totalRecords: number = 0;
  ref!: DynamicDialogRef;
  actionsToShow: Array<string> = ['edit', 'delete'];

  columns: Array<ITableColumns> = [
  {
    name: 'Name',
    property: 'name',
    filter: true,
    filterType: TableColumnFilterTypes.Text
  },
  {
    name: 'Salts',
    property: 'salt',
    filter: true
  },
  {
    name: 'Potency Unit',
    property: 'potencyUnits',
    filter: true,
    columnType: DataTypesEnum.Enum,
    enum: PotencyUnits
  },
  {
    name: 'Potency',
    property: 'potency',
    filter: true,
    filterType: TableColumnFilterTypes.Numeric
  },
  {
    name: 'Price (Per Unit)',
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
  }  
  ];

  constructor(private readonly medicineService: MedicineService,
    public dialogService: DialogService,private readonly alertService: AlertService,){
      super();
  }

  ngOnInit(): void {
    this.getMedicine();
  }

  getMedicine(fetchRequest: IFetchRequest = {}){
    this.medicineService.getMedicine(fetchRequest).pipe(takeUntil(this.componetDestroyed)).subscribe(x => {
      this.medicineList = x.data; 
      this.totalRecords = x.total;     
    })
  }

  addMedicine(medicine?:any,action:string='add'){
    this.ref = this.dialogService.open(MedicineFormComponent, { 
      width:'100%',
      height:'100%',
      data: {
        medicine :medicine,
        action: action
      }
    });
    this.ref.onClose.subscribe((medicine) => {
      if (medicine === true) {
        this.getMedicine();
      }
  });
  }

  edit(editMedicine: IMedicinerequest){
    this.addMedicine(editMedicine,'update')
  }

  delete(deleteMedicine: any){
    this.medicineService.deleteMedicine(deleteMedicine).pipe(takeUntil(this.componetDestroyed)).subscribe({
      next: (x) => {
        this.alertService.success('Success', 'Medicine delete successfully');
        this.getMedicine();
      },
      error: (err) => {
        this.alertService.error('Error', 'An error occoured while delete medicine')
      }
    })
  }
}
