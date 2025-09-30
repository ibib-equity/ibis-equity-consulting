import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  template: `
    <h2>Dashboard</h2>
    <div class="grid" aria-live="polite">
      <mat-card *ngFor="let item of items" style="padding:12px; min-height:100px">
        <mat-card-title>{{item.title}}</mat-card-title>
        <mat-card-content style="font-size:1.2rem; font-weight:600">{{item.value}}</mat-card-content>
      </mat-card>
    </div>
  `
})
export class DashboardComponent {
  items = [
    { title: 'Portfolio Value', value: '$1,234,567' },
    { title: 'Active Clients', value: '24' },
    { title: 'Open Opportunities', value: '3' }
  ];
}
