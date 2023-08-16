import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PharmacyRootComponent } from './components/pharmacy-root/pharmacy-root.component';
import { PharmacySaleComponent } from './components/pharmacy-sale/pharmacy-sale.component';
import { PharmacyPurchaseComponent } from './components/pharmacy-purchase/pharmacy-purchase.component';
import { PharmacyReportingComponent } from './components/pharmacy-reporting/pharmacy-reporting.component';

const routes: Routes = [
  {
    path: '', component: PharmacyRootComponent, children: [
      {
        path: '',
        redirectTo: 'pharmacy-sale',
        pathMatch: 'full'
      },
      {
        path: 'pharmacy-sale', component: PharmacySaleComponent
      },
      {
        path: 'pharmacy-purchase', component: PharmacyPurchaseComponent
      },
      {
        path: 'pharmacy-reporting', component: PharmacyReportingComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PharmacyRoutingModule { }
