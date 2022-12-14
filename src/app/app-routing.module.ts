import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {path:'' ,component:HomeComponent},
  {path:'home' ,component:HomeComponent},
  {path:'register',loadChildren:()=> import('./registration/registration.module').then((m)=>m.RegistrationModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
