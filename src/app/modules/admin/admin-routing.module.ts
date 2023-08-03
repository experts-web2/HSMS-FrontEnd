import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminRootComponent } from './admin-root/admin-root.component';
import { UserFormComponent } from './user/user-form/user-form.component';
import { UserListComponent } from './user/user-list/user-list.component';
import { MedicineListComponent } from './medicine/medicine-list/medicine-list.component';
import { WardListComponent } from './wards/ward-list/ward-list.component';
import { CategoriesFormComponent } from './categories/categories-form/categories-form.component';
import { WardFormComponent } from './wards/ward-form/ward-form.component';
import { MedicineFormComponent } from './medicine/medicine-form/medicine-form.component';
import { TestsFormComponent } from './tests/tests-form/tests-form.component';
import { BedFormComponent } from './beds/bed-form/bed-form.component';
import { HumanRecourcesComponent } from './human-resources/human-recources/human-recources.component';
import { ShiftsComponent } from './Shifts/shifts/shifts.component';
import { DataImpExpComponent } from './import-export/data-imp-exp/data-imp-exp.component';
import { TestsListComponent } from './tests/tests-list/tests-list.component';
import { CategoriesListComponent } from './categories/categories-list/categories-list.component';
import { DoctorFormComponent } from './doctors/doctor-form/doctor-form.component';
import { DoctorListComponent } from './doctors/doctor-list/doctor-list.component';
import { AddVendorComponent } from './vendor/add-vendor/add-vendor.component';
import { VendorListComponent } from './vendor/vendor-list/vendor-list.component';
import { BrandFormComponent } from './medicine-brand/brand-form/brand-form.component';
import { BrandListComponent } from './medicine-brand/brand-list/brand-list.component';

const routes: Routes = [
  {path:'', component: AdminRootComponent, children:[
    {path: '', redirectTo:'user-list', pathMatch: 'full'},
    {path: 'user-list', component: UserListComponent},
    {path: 'doctors-list', component: DoctorListComponent},
    {path: 'medicine-brand', component: BrandFormComponent},
    {path: 'medicine-brand-list', component: BrandListComponent},
    {path: 'medicine', component: MedicineFormComponent},
    {path: 'medicine-list', component: MedicineListComponent},
    {path: 'vendor', component: AddVendorComponent},
    {path: 'vendor-list', component: VendorListComponent},
    {path: 'wards', component: WardFormComponent},
    // {path: 'categories', component: CategoriesFormComponent},
    {path: 'category-list', component: CategoriesListComponent},
    // {path: 'tests', component: TestsFormComponent},
    {path: 'tests-list', component: TestsListComponent},
    {path: 'beds', component: BedFormComponent},
    {path: 'shifts', component: ShiftsComponent},
    {path: 'HR', component: HumanRecourcesComponent},
    {path: 'data-import-export', component: DataImpExpComponent},
    {path: 'doctors-form', component: DoctorFormComponent},

  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
