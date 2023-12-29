import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportingRoutingModule } from './reporting-routing.module';
import { GenericReportsComponent } from './components/generic-reports/generic-reports.component';
import { GenericFiltersComponent } from './components/generic-filters/generic-filters.component';
import { ReportViewComponent } from './components/report-view/report-view.component';
import { PrimeNgModule } from 'src/app/shared/modules';


@NgModule({
  declarations: [
    GenericReportsComponent,
    GenericFiltersComponent,
    ReportViewComponent
  ],
  imports: [
    CommonModule,
    ReportingRoutingModule,
    PrimeNgModule
  ]
})
export class ReportingModule { }
