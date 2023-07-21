import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { AlertService } from 'src/app/Services/alert/alert.service';
import { LabOrderService } from 'src/app/Services/lab-order.service';
import { TestService } from 'src/app/Services/test-service/test.service';
import { TestCategoryService } from 'src/app/Services/testCategory-service/test-category.service';
import { Roles } from 'src/app/constants/enums/Roles-Enum';
import { IToken } from 'src/app/models/interfaces/Token';
import { ILabeTest } from 'src/app/models/interfaces/labTest';
import { ILabTestCategory } from 'src/app/models/interfaces/labTestCategory';

@Component({
  selector: 'app-lab-order',
  templateUrl: './lab-order.component.html',
  styleUrls: ['./lab-order.component.scss']
})
export class LabOrderComponent implements OnInit {
  @Input() token!: IToken;
  tabs: any[] = [];
  roles = [{ id: Roles.Doctor, name: 'Doctor' }, { id: Roles.Nurse, name: 'Nurse' }, { id: Roles.Patient, name: 'Ptient' }, { id: Roles.Admin, name: 'Admin' }, { id: Roles.LabTechnician, name: 'Lab Technician' }, { id: Roles.Sweeper, name: 'Sweeper' }];
  testPriorty = [{ id: 1, name: 'Routine' }, { id: 2, name: 'Urgent' }];

  testsList: ILabTestList[] = [];
  tabsToView: ILabtestCategoriesTabs[] = [];
  testsListToShow: ILabTestList[] = [];
  allSelected: boolean = false;

  checkboxes: any[] = [];
  tabId: string = '';
  selectedCategories: any[] = [];
  selectedTestsIds: Array<string> = []

  constructor(
    private readonly testCategoryService: TestCategoryService,
    private readonly testsService: TestService,
    private readonly alertService: AlertService,
    private readonly laborderService: LabOrderService
  ) {
  }

  ngOnInit(): void {

    this.getTests()
    this.getTestCategories();
  }

  getTestCategories() {
    this.testCategoryService.getTestCategoryList().subscribe({
      next: (x: any) => {
        this.tabsToView = x.map((x: any) => { return { ...x, active: false } });
        this.tabsToView[0].active = true;
        this.getVisibleTests(this.tabsToView[0].id);
      },
      error: (err: Error) => {
        this.alertService.error('Something went wrong while getting lab test categories', 'Error');
      }
    })
  }

  getTests(): void {
    this.testsService.getTests().subscribe({
      next: (x: any) => {
        this.testsList = x.data;
      },
      error: (err: Error) => {
        this.alertService.error('Somthing went wrong while getting Lab Tests.', 'Error');
      }
    })
  }


  active(id: string) {
    this.tabId = id
    this.tabsToView.map(x => {
      x.active = false
      if (x.id === id) x.active = true;
    });
    this.getVisibleTests(id);
  }
  
  getVisibleTests(categoryId: string) {
    this.testsListToShow = this.testsList.filter(x => x.testCategoryId === categoryId);
    this.selectAllChecked();
  }

  selectLabTest(event: any) {

  }



  selectAllCheckboxes(event: any): void {
    if (event.target.checked) {
       this.testsListToShow.forEach(checkbox => {
        if (checkbox.testCategoryId === this.tabId) {
          checkbox.selected = true;
          if(!this.selectedTestsIds.includes(checkbox.id)) this.selectedTestsIds.push(checkbox.id);
        }
      });
      
    } else {
      
      this.testsListToShow.forEach(checkbox => {
        if (checkbox.testCategoryId === this.tabId) {
          checkbox.selected = false;
          if(this.selectedTestsIds.includes(checkbox.id)) this.selectedTestsIds = this.selectedTestsIds.filter(x => x !== checkbox.id);
        }
      });
    }
  this.selectAllChecked()    

  }

  updateSelectedCheckboxes(checked: boolean, selectedValue: ILabTestList): void {    
    if(checked) {
      this.selectedTestsIds.push(selectedValue.id);      
    }
    else this.selectedTestsIds = this.selectedTestsIds.filter(x => x !== selectedValue.id);   
    this.selectAllChecked();
 
  }

  addLabOrder() {

    let labOrderPayload: {doctorId: string, patientId: string, labTestIds: Array<string>} = {
      doctorId: this.token.doctorId,
      patientId: this.token.patientId,
      labTestIds: this.selectedTestsIds
    }

    this.laborderService.addMedication(labOrderPayload).subscribe({
      next: (x) => {
        console.log(x);
        this.alertService.success('Lab Order Added Successfully.')
      },
      error: (err) => {

      }
    })
  }

  selectAllChecked(){
    for(let test of this.testsListToShow.filter(x => x.testCategoryId === this.tabId)){
      let includes = this.selectedTestsIds.includes(test.id);
      if(includes) this.allSelected = true;
      else { 
        this.allSelected = false; 
        break;
      } 
    }
  }

}

interface ILabtestCategoriesTabs extends ILabTestCategory {
  active?: boolean;
}

interface ILabTestList extends ILabeTest{
  selected?: boolean;
}
