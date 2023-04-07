import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersRootComponent } from './users-root/users-root.component';

const routes: Routes = [
  {path: '', redirectTo: 'users', pathMatch: 'full'},
  {path: 'users', component: UsersRootComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
