import { Component, Input, Output, EventEmitter } from '@angular/core';
import { PrimeNgModule } from '../../modules/prime-ng/prime-ng.module';
import { CommonModule, DatePipe } from '@angular/common';
import { Table } from 'primeng/table';
import { ITableColumns } from 'src/app/models/interfaces/table-Columns';
import { DataTypesEnum } from 'src/app/constants/enums/dataTypes';
import { ICustomActions } from 'src/app/models/interfaces/customActions';

@Component({
  selector: 'app-generic-table',
  templateUrl: './generic-table.component.html',
  styleUrls: ['./generic-table.component.scss'],
  standalone: true,
  imports:[
    CommonModule,
    PrimeNgModule
  ],
  providers:[DatePipe]
})
export class GenericTableComponent {
    @Input() data!: any[];
    @Input() columns!: ITableColumns[];
    @Input() filterColumns!: any[];
    @Input() showActions!: boolean;
    @Input() totalRecords: number = 0;
    @Input() actionsToShow: Array<string> = [];
    @Input() additionalActions: Array<ICustomActions> = [];
    
    @Output() edit: EventEmitter<any> = new EventEmitter<any>();
    @Output() delete: EventEmitter<any> = new EventEmitter<any>();
    customers:any[] = [];

    options: any[] = [];

    statuses: any[]= [];

    @Input() loading: boolean = false;

    activityValues: number[] = [0, 100];

    constructor(private readonly datePipe: DatePipe) {}

    ngOnInit() {
        this.filterColumns = this.columns.map(x => {
            if(x.globalSearch) return x.property;
            else return
        });
    }

    resolveField(a: any, b: ITableColumns){
        console.log(this.filterColumns);
        
        if(b.columnType === DataTypesEnum.Date) return this.datePipe.transform(a[b.property], 'MM/dd/yyyy');
        if(b.columnType === DataTypesEnum.Enum) return b.enum[a[b.property]];
        if(b.valueToShow) return b.valueToShow(a[b.property]);
        return a[b.property]        
    }

    clear(table: Table) {
        table.clear();
    }

    actionEmitter(data: any, action: string){
        if(action === 'edit') this.edit.emit(data);
        if(action === 'delete') this.delete.emit(data);
    }

    filterFunction(event: any){
        console.log(event);
        
    }
    
    pageChange(event: any){
        console.log(event);
        
    }

    sort(event: any){
        console.log(event);

    }

    filter(event: any){
        console.log(event);

    }

    lazyload(event :any){
        console.log(event);

    }

    getSeverity(status:any) {
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
                default: return '';
        }
    }
}
