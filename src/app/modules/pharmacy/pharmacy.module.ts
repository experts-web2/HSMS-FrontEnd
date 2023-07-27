import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PharmacyRoutingModule } from './pharmacy-routing.module';
import { PharmacyPurchaseComponent } from './components/pharmacy-purchase/pharmacy-purchase.component';
import { PharmacyRootComponent } from './components/pharmacy-root/pharmacy-root.component';
import { PharmacySaleComponent } from './components/pharmacy-sale/pharmacy-sale.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {  PrimeNgModule } from 'src/app/shared/modules';

@NgModule({
  declarations: [
    PharmacyPurchaseComponent,
    PharmacyRootComponent,
    PharmacySaleComponent,
  ],
  imports: [
    CommonModule,
    PharmacyRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    PrimeNgModule,
  ],
})
export class PharmacyModule {}
