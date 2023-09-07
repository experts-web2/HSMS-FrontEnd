import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { takeUntil } from 'rxjs';
import { AlertService, LabOrderService, TestCategoryService, TestService } from 'src/app/services';
import { SubscriptionManagmentDirective } from 'src/app/shared/directive/subscription-managment.directive';
import { Roles } from 'src/app/constants/enums/Roles-Enum';
import { IToken } from 'src/app/models/interfaces/Token';
import { ILabeTest } from 'src/app/models/interfaces/labTest';
import { ILabTestCategory } from 'src/app/models/interfaces/labTestCategory';
import { ILabOrderRequest } from 'src/app/models/interfaces/LabOrder-Request';
import { PatientVisitService } from 'src/app/services/patient visit/patient-visit.service';
import { IPrescriptionRequest } from 'src/app/models/interfaces/PrescriptionRequest';
import { IVitalRequest } from 'src/app/models/interfaces/vitalsRequest';
import { IMedicationRequest } from 'src/app/models/interfaces/MedicationRequest';
import { IHealthRecord } from 'src/app/models/interfaces/healthRecord';

@Component({
  selector: 'app-lab-order',
  templateUrl: './lab-order.component.html',
  styleUrls: ['./lab-order.component.scss']
})
export class LabOrderComponent extends SubscriptionManagmentDirective implements OnInit {
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
    private readonly laborderService: LabOrderService,
  ) {
    super();
  }

  ngOnInit(): void {

    this.getTests()
    this.getTestCategories();

    this.labOrderRequest = {
      doctorId: this.healthRecord.doctorId,
      patientId: this.healthRecord.patientId,
      labTestIds: [],
      healthRecordId: this.healthRecordId
    }
    
    this.emitRequest.emit(this.labOrderRequest);
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
          if (!this.selectedTestsIds.includes(checkbox.id)) this.selectedTestsIds.push(checkbox.id);
        }
      });

    } else {

      this.testsListToShow.forEach(checkbox => {
        if (checkbox.testCategoryId === this.tabId) {
          checkbox.selected = false;
          if (this.selectedTestsIds.includes(checkbox.id)) this.selectedTestsIds = this.selectedTestsIds.filter(x => x !== checkbox.id);
        }
      });
    }
    this.selectAllChecked()

  }

  updateSelectedCheckboxes(checked: boolean, selectedValue: ILabTestList): void {
    if (checked) {
      this.selectedTestsIds.push(selectedValue.id);
    }
    else this.selectedTestsIds = this.selectedTestsIds.filter(x => x !== selectedValue.id);
    this.selectAllChecked();
    this.labOrderRequest.labTestIds = this.selectedTestsIds;
    this.emitRequest.emit(this.labOrderRequest);

  }

  edit(){

  }

  updateLabOrder(){
    let labOrderId: string = '';
    if(this.healthRecord.labOrder) labOrderId = this.healthRecord.labOrder.id;
    this.laborderService.updateLabOrder(labOrderId ,this.labOrderRequest).subscribe({
      next: (x) => {
        this.alertService.success('Lab Order Updated Sucessfully.')
      },
      error: (err) => {
        this.alertService.error('An Error Occoured While Updating Lab Order.')
      }
    })
  }

  addLabOrder() {

    let labOrderPayload: ILabOrderRequest = {
      doctorId: this.token.doctorId,
      patientId: this.token.patientId,
      labTestIds: this.selectedTestsIds,
      healthRecordId: this.healthRecordId
    }

    this.laborderService.addMedication(labOrderPayload).pipe(takeUntil(this.componetDestroyed)).subscribe({
      next: (x) => {
        this.alertService.success('Lab Order Added Successfully.')
      },
      error: (err) => {
        this.alertService.error('Something went wrong while adding laborder.')
      }
    })
  }

  selectAllChecked() {
    for (let test of this.testsListToShow.filter(x => x.testCategoryId === this.tabId)) {
      let includes = this.selectedTestsIds.includes(test.id);
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