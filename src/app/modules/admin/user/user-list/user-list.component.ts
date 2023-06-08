import { Component } from '@angular/core';
import { Table } from 'primeng/table';
import { UserService } from 'src/app/Services/user.service';
import { DataTypesEnum } from 'src/app/constants/enums/dataTypes';
import { TableColumnFilterTypes } from 'src/app/constants/enums/table-column-filterTypes';
import { ITableColumns } from 'src/app/models/interfaces/table-Columns';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent {

  constructor(private readonly userService: UserService) { }
  
  userList: Array<any> = [];
  totalRecords: number = 0;
  
  columns: Array<ITableColumns> = [
  {
    name: 'First Name',
    property: 'firstName',
    filter: true,
    filterType: TableColumnFilterTypes.Text
  },
  {
    name: 'Last Name',
    property: 'lastName',
    filter: true,
    filterType: TableColumnFilterTypes.Text
  },
  {
    name: 'Email',
    property: 'email',
    filter: true,
    filterType: TableColumnFilterTypes.Text
  },
  {
    name: 'Phone#',
    property: 'phoneNumber',
    filter: true,
    filterType: TableColumnFilterTypes.Text
  },
  {
    name: 'Role',
    property: 'role',
    filter: true,
    filterType: TableColumnFilterTypes.Text
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

  ngOnInit(): void {
    this.getMedicine();
  }

  getMedicine(){
    this.userService.getUsersByAccount().subscribe(x => {
      console.log(x);
      this.userList = x; 
      this.totalRecords = x.length;     
    })
  }

  edit(e: any){
    console.log(e);
    
  }

  delete(e: any){
    console.log(e);
    
  }
}
