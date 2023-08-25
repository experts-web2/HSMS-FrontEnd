import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppointmentComponent } from './appointment/appointment.component';
import { DoctorRootComponent } from './doctor-root/doctor-root.component';
import { DoctorDashboardComponent } from './doctor-dashboard/doctor-dashboard.component';
import { SchedulingComponent } from './scheduling/scheduling.component';

const routes: Routes = [
  {path:'', component: DoctorRootComponent, children:[
    {path:'', redirectTo: 'health_record', pathMatch: 'full'},
    {path:'appointment/:tokenId', component: AppointmentComponent},
    {path:'health_records', component: AppointmentComponent},
    {path:'scheduling', component: SchedulingComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DoctorRoutingModule { }
