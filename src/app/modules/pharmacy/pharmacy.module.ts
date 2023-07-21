import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PharmacyRoutingModule } from './pharmacy-routing.module';
import { PharmacyPurchaseComponent } from './components/pharmacy-purchase/pharmacy-purchase.component';
import { PharmacyRootComponent } from './components/pharmacy-root/pharmacy-root.component';
import { PharmacySaleComponent } from './components/pharmacy-sale/pharmacy-sale.component';


@NgModule({
  declarations: [
    PharmacyPurchaseComponent,
    PharmacyRootComponent,
    PharmacySaleComponent
  ],
  imports: [
    CommonModule,
    PharmacyRoutingModule
  ]
})
export class PharmacyModule { }
