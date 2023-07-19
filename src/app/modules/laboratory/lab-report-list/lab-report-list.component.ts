import { Component } from '@angular/core';
import { IDropDown } from 'src/app/models/interfaces/Dropdown';


@Component({
  selector: 'app-lab-report-list',
  templateUrl: './lab-report-list.component.html',
  styleUrls: ['./lab-report-list.component.scss']
})
export class LabReportListComponent {
  actionsToShow: Array<string> = ['edit', 'delete'];
  totalRecords: number = 0;
  selectTypes: IDropDown[] = []
  selectReportType: IDropDown[]=[]
constructor(){

}

selctData(event:any){
  console.log(event)
}

}
