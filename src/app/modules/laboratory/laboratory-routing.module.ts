import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LaboratoryRootComponent } from './laboratory-root/laboratory-root.component';
import { LabTestReportComponent } from './lab-test-report/lab-test-report.component';
import { LabReportListComponent } from './lab-report-list/lab-report-list.component';
import { AddLabTestComponent } from './add-lab-test/add-lab-test.component';

const routes: Routes = [{
  path: '', component: LaboratoryRootComponent, children: [
    { path: 'lab_report', component: LabTestReportComponent },
    { path: 'lab_report_list', component: LabReportListComponent },
    { path: 'add_lab_test', component: AddLabTestComponent }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LaboratoryRoutingModule { }
