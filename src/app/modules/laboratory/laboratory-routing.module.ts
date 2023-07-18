import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LaboratoryRootComponent } from './laboratory-root/laboratory-root.component';
import { LabTestReportComponent } from './lab-test-report/lab-test-report.component';

const routes: Routes = [{
  path: '', component: LaboratoryRootComponent, children: [
    { path: 'lab_report', component: LabTestReportComponent }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LaboratoryRoutingModule { }
