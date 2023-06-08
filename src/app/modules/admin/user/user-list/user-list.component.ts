import { Component } from '@angular/core';
import { Table } from 'primeng/table';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent {

  constructor(private readonly userService: UserService){

  }
}
