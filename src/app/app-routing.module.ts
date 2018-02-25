import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {DashboardComponent} from "./employee/dashboard/dashboard.component";
import {AuthGuard} from "./auth/auth.guard";
import {AuthManagerGuard} from "./auth/auth-manager.guard";
import {ManagerDashboardComponent} from "./manager/manager-dashboard/manager-dashboard.component";
import {TourComponent} from "./tour/tour.component";

const routes: Routes = [
  {
    path: "/",
    component: LoginComponent
  },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "employee/dashboard",
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "manager/dashboard",
    component: ManagerDashboardComponent,
    canActivate: [AuthManagerGuard]
  },
  {
    path: "manager/tour/:id",
    component: TourComponent,
    canActivate: [AuthManagerGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [ LoginComponent, DashboardComponent, ManagerDashboardComponent, TourComponent ]