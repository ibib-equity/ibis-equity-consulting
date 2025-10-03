import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';

@Component({
  selector: 'app-header',
  template: `
    <div class="app-header">
      <h1 class="title">{{ title }}</h1>
      <h2 class="subtitle">{{ subtitle }}</h2>
      <p class="tagline" [@reveal]>{{ tagline }}</p>
    </div>
  `,
  styles: [
    `
    .app-header { text-align: center; color: #fff; margin-bottom: 12px }
    .app-header .title { margin: 0; font-size: 1.8rem; font-weight: 700; letter-spacing: 0.5px }
    .app-header .subtitle { margin: 4px 0 0 0; font-size: 1.15rem; font-weight: 500; opacity: 0.95 }
    .app-header .tagline { margin-top: 8px; font-size: 1rem; opacity: 0.9; color: #e6eef8 }
    `
  ],
  animations: [
    // fade+scale with slight stagger for child elements
    trigger('reveal', [
      transition(':enter', [
        query('.title, .subtitle, .tagline', [
          style({ opacity: 0, transform: 'scale(0.97) translateY(6px)' }),
          stagger(80, animate('420ms cubic-bezier(.2,.8,.2,1)', style({ opacity: 1, transform: 'scale(1) translateY(0)' })))
        ], { optional: true })
      ])
    ])
  ]
})
export class HeaderComponent implements OnInit {
  @Input() title = 'Ibis Equity Consulting, LLC.';
  @Input() subtitle = 'Artificial Intelligence Engineering';
  @Input() tagline = 'Core AI Technologies for Business';

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    // If inputs aren't provided, prefer route data (per-route configurable headers)
    const applyRouteData = () => {
      const data = this.route.snapshot.firstChild?.data ?? this.route.snapshot.data;
      if (data) {
        if (!this.title && data['title']) this.title = data['title'];
        if (!this.subtitle && data['subtitle']) this.subtitle = data['subtitle'];
        if (!this.tagline && data['tagline']) this.tagline = data['tagline'];
      }
    };

    applyRouteData();
    // update on navigation as well
    this.router.events.subscribe(evt => {
      if (evt instanceof NavigationEnd) applyRouteData();
    });
  }
}
