import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { MaterialModule } from './material.module';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LandingComponent } from './landing/landing.component';

@NgModule({
  declarations: [AppComponent, HomeComponent, DashboardComponent, LandingComponent],
  imports: [BrowserModule, BrowserAnimationsModule, MaterialModule, FormsModule, RouterModule.forRoot([
    { path: '', component: HomeComponent },
    { path: 'dashboard', component: DashboardComponent }
  ])],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
