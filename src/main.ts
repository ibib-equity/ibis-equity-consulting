import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import 'zone.js';

if (environment.production) {
  enableProdMode();
  // Register service worker when in production
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/ngsw-worker.js').catch(err => console.warn('SW registration failed:', err));
  }
}

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch(err => console.error(err));
