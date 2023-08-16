import { Component, Input, Output, EventEmitter } from '@angular/core';
import {  PrimeNgModule } from 'src/app/shared/modules';
import { CommonModule, DatePipe } from '@angular/common';
import { Table } from 'primeng/table';
import { ITableColumns } from 'src/app/models/interfaces/table-Columns';
import { DataTypesEnum } from 'src/app/constants/enums/dataTypes';
import { ICustomActions } from 'src/app/models/interfaces/customActions';
import { ConfirmEventType } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-generic-table',
  templateUrl: './generic-table.component.html',
  styleUrls: ['./generic-table.component.scss'],
  standalone: true,
  imports: [CommonModule, PrimeNgModule, ConfirmDialogModule],
  providers: [DatePipe, ConfirmationService],
})
export class GenericTableComponent {
  @Input() data!: any[];
  @Input() columns!: ITableColumns[];
  @Input() filterColumns!: any[];
  @Input() showActions!: boolean;
  @Input() totalRecords: number = 0;
  @Input() actionsToShow: Array<string> = [];
  @Input() additionalActions: Array<ICustomActions> = [];
  @Input() clickableRow: boolean = false;
  @Input() showPaginator: boolean = true;
  @Input() rowClickAction!: Function;

  @Output() edit: EventEmitter<any> = new EventEmitter<any>();
  @Output() delete: EventEmitter<any> = new EventEmitter<any>();
  customers: any[] = [];

  options: any[] = [];

  statuses: any[] = [];

  @Input() loading: boolean = false;

  activityValues: number[] = [0, 100];

  constructor(
    private readonly datePipe: DatePipe,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit() {
    this.filterColumns = this.columns.map((x) => {
      if (x.globalSearch) return x.property;
      else return;
    });
  }

  resolveField(a: any, b: ITableColumns) {
    if (b.columnType === DataTypesEnum.Date)
      return this.datePipe.transform(a[b.property], 'MM/dd/yyyy');
    if (b.columnType === DataTypesEnum.Enum) return b.enum[a[b.property]];
    if (b.valueToShow) return b.valueToShow(a[b.property]);
    return a[b.property];
  }

  clear(table: Table) {
    table.clear();
  }

  actionEmitter(data: any, action: string) {
    if (action === 'edit') this.edit.emit(data);
    if (action === 'delete') {
      this.confirmationService.confirm({
        message: `Are you sure that you want to delete ${
          data.name ?? data.firstName
        } ?`,
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.delete.emit(data);
        },
        reject: (type: ConfirmEventType) => {},
      });
    }
  }

  filterFunction(event: any) {
    console.log(event);
  }

  pageChange(event: any) {
    console.log(event);
  }

  onRowReorder(event: any) {
    console.log(event);
  }

  sort(event: any) {
    console.log(event);
  }

  filter(event: any) {
    console.log(event);
  }

  lazyload(event: any) {
    console.log(event);
  }

  getSeverity(status: any) {
    switch (status) {
      case 'unqualified':
        return 'danger';

      case 'qualified':
        return 'success';

      case 'new':
        return 'info';

      case 'negotiation':
        return 'warning';

      case 'renewal':
        return '';
      default:
        return '';
    }
  }
}
