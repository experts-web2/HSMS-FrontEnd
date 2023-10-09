import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminRootComponent } from './admin-root/admin-root.component';
import { AdminSideNavComponent } from './admin-side-nav/admin-side-nav.component';
import { UserFormComponent } from './user/user-form/user-form.component';
import { UserListComponent } from './user/user-list/user-list.component';
import { PrimeNgModule } from 'src/app/shared/modules';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WardListComponent } from './wards/ward-list/ward-list.component';
import { WardFormComponent } from './wards/ward-form/ward-form.component';
import { MedicineListComponent } from './medicine/medicine-list/medicine-list.component';
import { MedicineFormComponent } from './medicine/medicine-form/medicine-form.component';
import { CategoriesListComponent } from './categories/categories-list/categories-list.component';
import { CategoriesFormComponent } from './categories/categories-form/categories-form.component';
import { TestsListComponent } from './tests/tests-list/tests-list.component';
import { TestsFormComponent } from './tests/tests-form/tests-form.component';
import { BedsComponent } from './beds/beds/beds.component';
import { BedFormComponent } from './beds/bed-form/bed-form.component';
import { HumanRecourcesComponent } from './human-resources/human-recources/human-recources.component';
import { ShiftsComponent } from './Shifts/shifts/shifts.component';
import { DataImpExpComponent } from './import-export/data-imp-exp/data-imp-exp.component';
import { GenericTableComponent } from 'src/app/shared/components';
import { DoctorFormComponent } from './doctors/doctor-form/doctor-form.component';
import { DoctorListComponent } from './doctors/doctor-list/doctor-list.component';
import {
  DialogService,
  DynamicDialogConfig,
  DynamicDialogRef,
} from 'primeng/dynamicdialog';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { VendorListComponent } from './vendor/vendor-list/vendor-list.component';
import { AddVendorComponent } from './vendor/add-vendor/add-vendor.component';
import { BrandFormComponent } from './medicine-brand/brand-form/brand-form.component';
import { BrandListComponent } from './medicine-brand/brand-list/brand-list.component';
import { MedicineSaltsListComponent } from './medicine-salts/medicine-salts-list/medicine-salts-list.component';
import { MedicineSaltsFormComponent } from './medicine-salts/medicine-salts-form/medicine-salts-form.component';

@NgModule({
  declarations: [
    AdminRootComponent,
    AdminSideNavComponent,
    UserFormComponent,
    UserListComponent,
    WardListComponent,
    WardFormComponent,
    MedicineListComponent,
    MedicineFormComponent,
    CategoriesListComponent,
    CategoriesFormComponent,
    TestsListComponent,
    TestsFormComponent,
    BedsComponent,
    BedFormComponent,
    HumanRecourcesComponent,
    ShiftsComponent,
    DataImpExpComponent,
    DoctorFormComponent,
    DoctorListComponent,
    VendorListComponent,
    AddVendorComponent,
    BrandFormComponent,
    BrandListComponent,
    MedicineSaltsListComponent,
    MedicineSaltsFormComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    PrimeNgModule,
    FormsModule,
    ReactiveFormsModule,
    GenericTableComponent,
    DialogModule,
    ConfirmDialogModule,
  ],
  providers: [DialogService, DynamicDialogRef, DynamicDialogConfig],
})
export class AdminModule {}
