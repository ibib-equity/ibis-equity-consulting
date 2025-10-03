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
import { HeaderComponent } from './shared/header/header.component';

@NgModule({
  declarations: [AppComponent, HomeComponent, DashboardComponent, LandingComponent, HeaderComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, data: { title: 'Ibis Equity Consulting, LLC.', subtitle: 'Artificial Intelligence Engineering', tagline: 'Core AI Technologies for Business' } },
      { path: 'dashboard', component: DashboardComponent, data: { title: 'Dashboard - Ibis Equity Consulting', subtitle: 'AI Insights & Operations', tagline: 'Operationalize AI at scale' } }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
