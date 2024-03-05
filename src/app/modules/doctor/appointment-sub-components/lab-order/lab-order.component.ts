import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { takeUntil } from 'rxjs';
import { AlertService, LabOrderService, TestCategoryService, TestService } from 'src/app/services';
import { SubscriptionManagmentDirective } from 'src/app/shared/directive/subscription-managment.directive';
import { Roles } from 'src/app/constants/enums/Roles-Enum';
import { IToken } from 'src/app/models/interfaces/Token';
import { ILabeTest } from 'src/app/models/interfaces/labTest';
import { ILabTestCategory } from 'src/app/models/interfaces/labTestCategory';
import { ILabOrderRequest } from 'src/app/models/interfaces/LabOrder-Request';
import { IHealthRecord } from 'src/app/models/interfaces/healthRecord';
import { cloneDeep } from 'lodash';

@Component({
  selector: 'app-lab-order',
  templateUrl: './lab-order.component.html',
  styleUrls: ['./lab-order.component.scss']
})
export class LabOrderComponent extends SubscriptionManagmentDirective implements OnInit, OnChanges {
  @Input() token!: IToken;
  @Input() healthRecordId!: string;
  @Output() emitRequest: EventEmitter<ILabOrderRequest> = new EventEmitter<ILabOrderRequest>();
  @Input() healthRecord!: IHealthRecord;
  tabs: any[] = [];
  roles = [{ id: Roles.Doctor, name: 'Doctor' }, { id: Roles.Nurse, name: 'Nurse' }, { id: Roles.Patient, name: 'Ptient' }, { id: Roles.Admin, name: 'Admin' }, { id: Roles.LabTechnician, name: 'Lab Technician' }, { id: Roles.LabAdmin, name: 'Lab Admin' }];
  testPriorty = [{ id: 1, name: 'Routine' }, { id: 2, name: 'Urgent' }];
  labOrderRequest!: ILabOrderRequest;
  testsList: ILabTestList[] = [];
  tabsToView: ILabtestCategoriesTabs[] = [];
  selectedTestIds: Array<string> = [];
  testsListToShow: ILabTestList[] = [];
  allSelected: boolean = false;
  newData: boolean = true;

  checkboxes: any[] = [];
  tabId: string = '';
  selectedCategories: any[] = [];

  constructor(
    private readonly testCategoryService: TestCategoryService,
    private readonly testsService: TestService,
    private readonly alertService: AlertService,
    private readonly laborderService: LabOrderService,
  ) {
    super();
    this.getTests();
    this.getTestCategories();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['healthRecord']){

      if(this.healthRecord.labOrder){
        this.newData = false;
        this.selectedTestIds = this.healthRecord.labOrder.labOrderDetails.map(x => x.labTestId) ?? [];
      }

      this.labOrderRequest = {
        doctorId: this.healthRecord.doctorId,
        patientId: this.healthRecord.patientId,
        labTestIds: this.healthRecord.labOrder?.labTestIds ?? [],
        healthRecordId: this.healthRecordId
      }

      this.selectedTestIds = this.healthRecord.labOrder?.labTestIds ?? [];

      if(this.tabsToView.length) this.getVisibleTests(this.tabsToView[0].id);
      this.emitRequest.emit(this.labOrderRequest)
    }
    
  }

  ngOnInit(): void {


    // this.emitRequest.emit(this.labOrderRequest);
  }

  getTestCategories() {
    this.testCategoryService.getTestCategoryList().pipe(takeUntil(this.componetDestroyed)).subscribe({
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
    this.testsService.getTests().pipe(takeUntil(this.componetDestroyed)).subscribe({
      next: (x) => {
        this.testsList = x.data.map(y => {
          return {
            ...y,
            selected: false
          }
        });
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
    
    this.testsListToShow.forEach(x => this.selectedTestIds.includes(x.id) ?  x.selected = true : null);    

    if(this.testsListToShow.every(y => y.selected) && this.testsListToShow.length){
      this.allSelected = true;      
    } else {
      this.allSelected = false;
    }
  }

  selectLabTest(event: any) {

  }

  selectAllCheckboxes(event: any): void {
    if (event.target.checked) {
      this.testsList.forEach(test => {
        if(test.testCategoryId === this.tabId) test.selected = event.target.checked;
      });

      this.testsListToShow.filter(checkbox => {
        if (checkbox.testCategoryId === this.tabId) {
          return checkbox
        }
        return null;
      });



    } else {

      this.testsListToShow.forEach(checkbox => {
        if (checkbox.testCategoryId === this.tabId) {
          checkbox.selected = false;
          if (this.selectedTestIds.includes(checkbox.id)) this.selectedTestIds = this.selectedTestIds.filter(x => x !== checkbox.id);
        }
      });
    }
    this.selectAllChecked()

  }

  updateSelectedCheckboxes(checked: boolean, selectedValue: ILabTestList): void {
    this.testsList.forEach(x => {
      if(x.id === selectedValue.id) x.selected = checked;
    })
    if (checked) {
      this.selectedTestIds.push(selectedValue.id);
    }
    else this.selectedTestIds = this.selectedTestIds.filter(x => x !== selectedValue.id);
   
    this.selectAllChecked();

    if(this.testsListToShow.every(test => test.selected)) this.allSelected = true;
    else this.allSelected = false;

    this.labOrderRequest.labTestIds = this.selectedTestIds;
    this.emitRequest.emit(this.labOrderRequest);

  }

  edit(){

  }

  removeTest(testId: string){
    
    for (const test of this.testsListToShow) {
      if(test.id === testId){
        test.selected = false;
        break;
      }
    }

    this.selectedTestIds = this.selectedTestIds.filter(x => x !== testId);
    this.testsList = JSON.parse(JSON.stringify(this.testsList))
  }

  updateLabOrder(){
    let labOrderId: string = '';
    if(this.healthRecord.labOrder) labOrderId = this.healthRecord.labOrder.id;
    this.laborderService.updateLabOrder(labOrderId ,this.labOrderRequest).subscribe({
      next: (x) => {
        this.alertService.success('Lab Order Updated Sucessfully.');
        this.emitRequest.emit(x);
        this.newData = false;
      },
      error: (err) => {
        this.alertService.error('An Error Occoured While Updating Lab Order.')
      }
    })
  }

  addLabOrder() {

    let labOrderPayload: ILabOrderRequest = {
      doctorId: this.healthRecord.doctorId,
      patientId: this.healthRecord.patientId,
      labTestIds: this.selectedTestIds,
      healthRecordId: this.healthRecordId
    }

    this.laborderService.addMedication(labOrderPayload).pipe(takeUntil(this.componetDestroyed)).subscribe({
      next: (x) => {        
        this.alertService.success('Lab Order Added Successfully.');
        this.emitRequest.emit(labOrderPayload);
        this.newData = false
      },
      error: (err) => {
        this.alertService.error('Something went wrong while adding laborder.')
      }
    })
  }

  selectAllChecked() {
    for (let test of this.testsListToShow.filter(x => x.testCategoryId === this.tabId)) {
      let includes = this.selectedTestIds.includes(test.id);
      if (includes) this.allSelected = true;
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

interface ILabTestList extends ILabeTest {
  selected?: boolean;
}

type Mode = 'edit' | 'new'; 