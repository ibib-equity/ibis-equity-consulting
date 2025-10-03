import { Component, EventEmitter, HostListener, OnDestroy, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-landing',
  template: `
    <div class="landing" role="dialog" aria-label="Landing animation" tabindex="0">
      <div class="content" (click)="onClickContent($event)">
        <img src="/assets/ibis-gif-3.gif" alt="Landing animation" />
        <div class="controls">
          <label><input type="checkbox" [(ngModel)]="dontShowAgain" /> Don't show again</label>
          <button class="skip" (click)="close()">Skip</button>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
    .landing {
      position: fixed;
      inset: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #000;
      z-index: 9999;
      cursor: pointer;
    }
    .landing img { max-width: 90%; height: auto; border-radius: 8px; }
    .content { position: relative; }
    .controls { position: absolute; right: 8px; bottom: 8px; color: #fff; display:flex; gap:8px; align-items:center}
    .controls label { font-size: 0.9rem }
    .controls .skip { background: rgba(255,255,255,0.1); color:#fff; border: none; padding:6px 10px; border-radius:4px }
  `]
})
export class LandingComponent implements OnInit, OnDestroy {
  @Output() closed = new EventEmitter<void>();
  private timeoutId: any;
  dontShowAgain = false;

  ngOnInit(): void {
    // Hide after 30 seconds
    this.timeoutId = setTimeout(() => this.close(), 30000);
  }

  ngOnDestroy(): void {
    if (this.timeoutId) clearTimeout(this.timeoutId);
  }

  close() {
    if (this.dontShowAgain) {
      try { localStorage.setItem('landing:hide', '1'); } catch {}
    }
    this.closed.emit();
  }

  onClickContent(e: Event) {
    // Prevent clicks inside content from bubbling to outer landing (so Skip/button controls behave)
    e.stopPropagation();
  }

  @HostListener('document:keydown.escape', [])
  handleEscape() {
    this.close();
  }
}
