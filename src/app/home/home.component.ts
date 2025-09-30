import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  template: `
  <h1>Welcome to Ibis Equity Consulting, LLC</h1>
    <p>Mobile-first, responsive Angular starter.</p>
    <div class="grid" role="list">
      <mat-card *ngFor="let card of cards" role="listitem" style="padding:12px; touch-action: manipulation;">
        <mat-card-title>{{card.title}}</mat-card-title>
        <mat-card-content>{{card.content}}</mat-card-content>
      </mat-card>
    </div>
  `
})
export class HomeComponent {
  cards = [
    { title: 'About', content: 'About the company' },
    { title: 'Services', content: 'What we offer' },
    { title: 'Contact', content: 'Get in touch' }
  ];
}
