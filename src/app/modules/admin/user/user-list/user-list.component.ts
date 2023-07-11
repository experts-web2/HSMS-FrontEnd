import { Component, OnInit } from '@angular/core';
import { Table } from 'primeng/table';
import { UserService } from 'src/app/Services/user.service';
import { UserStateService } from 'src/app/State/user/user.service';
import { DataTypesEnum } from 'src/app/constants/enums/dataTypes';
import { TableColumnFilterTypes } from 'src/app/constants/enums/table-column-filterTypes';
import { ILogedInUser } from 'src/app/models/interfaces/Iloggedinuser';
import { IFetchRequest } from 'src/app/models/interfaces/fetchTableRequest';
import { ITableColumns } from 'src/app/models/interfaces/table-Columns';
import { IUser } from 'src/app/models/interfaces/user';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  loggedInUser!: ILogedInUser;
  visible: boolean = false
  totalRecords: number = 0;
  userList: Array<IUser> = [];
  actionsToShow: Array<string> = ['edit', 'delete']
  columns: Array<ITableColumns> = [
    {
      name: 'First Name',
      property: 'firstName',
      filter: true,
      globalSearch: true,
      filterType: TableColumnFilterTypes.Text,
      columnType: DataTypesEnum.String
    },
    {
      name: 'Last Name',
      property: 'lastName',
      filter: true,
      globalSearch: true,
      filterType: TableColumnFilterTypes.Text,
      columnType: DataTypesEnum.String
    },
    {
      name: 'email',
      property: 'email',
      filter: true,
      globalSearch: true,
      filterType: TableColumnFilterTypes.Text,
      columnType: DataTypesEnum.String
    },
    {
      name: 'Phone Number',
      property: 'phoneNumber',
      filter: true,
      globalSearch: true,
      filterType: TableColumnFilterTypes.Text,
      columnType: DataTypesEnum.String
    },
    {
      name: 'User Name',
      property: 'username',
      filter: true,
      globalSearch: true,
      filterType: TableColumnFilterTypes.Text,
      columnType: DataTypesEnum.String
    },
    {
      name: 'Active',
      property: 'active',
      filter: true,
      globalSearch: true,
      columnType: DataTypesEnum.InnerHtml,
      valueToShow: this.getStatus.bind(this)
    }    
  ];

  constructor(private readonly userService: UserService, private readonly userStateService: UserStateService){
    this.userStateService.getUserState().subscribe({
      next: (x)=>{
        this.loggedInUser = x;  
      }
    })
  }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(){
    this.userService.getUsers().subscribe({
      next: (x) => {
        console.log(x);
        this.userList = x;
        this.totalRecords = x.length;
      },
      error: (err) => {

      }
    })
  }

  getStatus(status: boolean): string{
    
    
    let icon = '<span class="text-success"><i class="fa-solid fa-check"></i></span>';
    if(!status) icon = '<span class="text-danger"><i  class="fa-solid fa-xmark"></i></span>';
    return icon;
  }

  edit(e : IUser){
    // this.userService.deleteUser()
  }

  deleteUser(e: IUser){

  }
}
