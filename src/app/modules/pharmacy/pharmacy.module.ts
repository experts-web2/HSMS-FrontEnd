import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PharmacyRoutingModule } from './pharmacy-routing.module';
import { PharmacyPurchaseComponent } from './components/pharmacy-purchase/pharmacy-purchase.component';
import { PharmacyRootComponent } from './components/pharmacy-root/pharmacy-root.component';
import { PharmacySaleComponent } from './components/pharmacy-sale/pharmacy-sale.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {  PrimeNgModule } from 'src/app/shared/modules';
import { PharmacyReportingComponent } from './components/pharmacy-reporting/pharmacy-reporting.component';
import { PharmacySaleInvoiceComponent } from './components/pharmacy-sale-invoice/pharmacy-sale-invoice.component';
import { PharmacyPurchaseInvoiceComponent } from './components/pharmacy-purchase-invoice/pharmacy-purchase-invoice.component';
import { GenericTableComponent } from 'src/app/shared/components';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@NgModule({
  declarations: [
    PharmacyPurchaseComponent,
    PharmacyRootComponent,
    PharmacySaleComponent,
    PharmacyReportingComponent,
    PharmacySaleInvoiceComponent,
    PharmacyPurchaseInvoiceComponent,
  ],
  imports: [
    CommonModule,
    PharmacyRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    PrimeNgModule,
    GenericTableComponent
  ],
  providers: [
    DialogService,
    DynamicDialogRef,
    DynamicDialogConfig
  ]
})
export class PharmacyModule {}
