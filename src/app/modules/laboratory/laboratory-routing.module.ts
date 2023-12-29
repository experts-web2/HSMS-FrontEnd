import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LaboratoryRootComponent } from './laboratory-root/laboratory-root.component';
import { LabTestReportComponent } from './lab-test-report/lab-test-report.component';
import { LabReportListComponent } from './lab-report-list/lab-report-list.component';
import { CollectLabSampleComponent } from './collect-lab-sample/collect-lab-sample.component';
import { AddPatientTestComponent } from './add-patient-test/add-patient-test.component';
import { LabOrdersComponent } from './lab-orders/lab-orders.component';

const routes: Routes = [{
  path: '',  component: LaboratoryRootComponent,
   children: [
    { path: '', redirectTo: 'lab_report_list', pathMatch: "full" },
    { path: 'lab_report', component: LabTestReportComponent },
    { path: 'lab_report_list', component: LabReportListComponent },
    { path: 'add_patient_test', component: AddPatientTestComponent },
    { path: 'collect_lab_sample', component: CollectLabSampleComponent },
    { path: 'lab_orders', component: LabOrdersComponent}
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LaboratoryRoutingModule { }
