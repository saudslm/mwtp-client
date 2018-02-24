import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule, routingComponents } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import {AuthGuard} from "./auth/auth.guard";
import {AuthManagerGuard} from "./auth/auth-manager.guard";
import {DateService} from "./services/date.service";
import { FdashboardComponent } from './finance-manager/fdashboard/fdashboard.component';




@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    FdashboardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [AuthGuard, AuthManagerGuard, DateService],
  bootstrap: [AppComponent]
})
export class AppModule { }
