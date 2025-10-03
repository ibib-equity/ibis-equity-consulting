import { Component } from '@angular/core';

const LANDING_KEY = 'landing:hide';

@Component({
  selector: 'app-root',
  template: `
    <app-landing *ngIf="showLanding" (closed)="onLandingClosed()"></app-landing>

    <div *ngIf="!showLanding">
      <mat-toolbar color="primary">
        <button mat-icon-button (click)="toggle()" aria-label="Toggle navigation"><mat-icon>menu</mat-icon></button>
        <span style="margin-left:12px">Ibis Equity Consulting, LLC</span>
        <span class="spacer"></span>
        <a mat-button routerLink="/dashboard">Dashboard</a>
      </mat-toolbar>
      <app-header></app-header>
      <div class="container">
        <router-outlet></router-outlet>
      </div>
      <mat-toolbar color="primary" class="footer" role="contentinfo">
        <span>© Ibis Equity Consulting, LLC</span>
        <span class="spacer"></span>
        <a mat-button href="mailto:info@ibisec.com">Contact</a>
      </mat-toolbar>
    </div>
  `,
  styles: [`.spacer { flex: 1 1 auto; }`]
})
export class AppComponent {
  showLanding = true;

  constructor() {
    try {
      const v = localStorage.getItem(LANDING_KEY);
      if (v === '1') this.showLanding = false;
    } catch {}
  }

  onLandingClosed() {
    this.showLanding = false;
  }

  toggle() { /* placeholder for sidenav on larger UI */ }
}
