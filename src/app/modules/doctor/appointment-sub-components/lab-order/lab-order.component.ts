import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { AlertService } from 'src/app/Services/alert/alert.service';
import { TestService } from 'src/app/Services/test-service/test.service';
import { TestCategoryService } from 'src/app/Services/testCategory-service/test-category.service';
import { Roles } from 'src/app/constants/enums/Roles-Enum';

@Component({
  selector: 'app-lab-order',
  templateUrl: './lab-order.component.html',
  styleUrls: ['./lab-order.component.scss']
})
export class LabOrderComponent implements OnInit {
  tabs: any[] = [];
  roles = [{ id: Roles.Doctor, name: 'Doctor' }, { id: Roles.Nurse, name: 'Nurse' }, { id: Roles.Patient, name: 'Ptient' }, { id: Roles.Admin, name: 'Admin' }, { id: Roles.LabTechnician, name: 'Lab Technician' }, { id: Roles.Sweeper, name: 'Sweeper' }];
  testPriorty = [{ id: 1, name: 'Routine' }, { id: 2, name: 'Urgent' }];


  testsList: any[] = [];
  tabsToView: any[] = [];
  testsListToShow: any[] = [];

  checkboxForm!: FormGroup;
  checkboxes: any[] = [];

  constructor(private formBuilder: FormBuilder,
    private readonly testCategoryService: TestCategoryService,
    private readonly testsService: TestService,
    private readonly alertService: AlertService,
  ) {
    this.checkboxForm = this.formBuilder.group({
      checkboxes: new FormControl([]),
    });
  }

  ngOnInit(): void {
    
    this.getTestCategories();
    this.getTests()
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
    this.tabsToView.map(x => {
      x.active = false
      if (x.id === id) x.active = true;
    });
    this.getVisibleTests(id);
  }

  getVisibleTests(categoryId: string) {
    this.testsListToShow = this.testsList.filter(x => x.testCategoryId === categoryId);
  }

  selectLabTest(event: any) {

  }



  selectAllCheckboxes(event: any): void {
    if (event.target.checked) {
      const selectedCheckboxes = this.checkboxes.map(checkbox => checkbox.id);
      this.checkboxForm.get('checkboxes')?.setValue(selectedCheckboxes);
    } else {
      this.checkboxForm.get('checkboxes')?.setValue([]);
    }

    console.log(this.checkboxForm.value)
  }

  updateSelectedCheckboxes(event: any ,selectedValue:any): void {
    const checkboxValue = event.target.value;    
    const selectedCheckboxes = this.checkboxForm.get('checkboxes')?.value;
    if (event.target.checked) {
        selectedCheckboxes.push(checkboxValue);
        if(event.target.value === selectedValue.id){
          Object.assign(selectedValue ,{selected:true})
        }
    } else {
      const index = selectedCheckboxes.indexOf(event.target.value);
      if (index >= 0) {
        selectedCheckboxes.splice(index, 1);
        Object.assign(selectedValue,{selected:false})
        
      }
    }
    this.checkboxForm.get('checkboxes')?.setValue(selectedCheckboxes);
    console.log(this.checkboxForm.value)
  }

  formSubmit(){
    console.log(this.checkboxForm.value)
  }


}

interface ILabtestCategories {
  id: string;
  name: string;
}
