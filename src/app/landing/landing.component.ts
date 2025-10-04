import { Component, EventEmitter, HostListener, OnDestroy, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-landing',
  template: `
    <div class="landing" role="dialog" aria-label="Landing animation" tabindex="0">
      <div class="content" (click)="onClickContent($event)">
        <header class="landing-header" [class.entered]="entered">
          <h1>Ibis Equity Consulting, LLC.</h1>
          <h2>Artificial Intelligence Engineering</h2>
        </header>
        <img class="landing-gif" [class.entered]="entered" src="/assets/ibis-pan.gif" alt="Landing animation" />

        <section class="capabilities-wrap" aria-label="Capabilities">
          <div class="capabilities-title">Pythonic AI</div>
          <div class="capabilities" role="list">
            <span class="cap" role="listitem" [class.entered]="entered">Machine Learning (ML) & Deep Learning</span>
            <span class="sep" aria-hidden="true"><svg width="10" height="12" viewBox="0 0 10 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2 2 L8 6 L2 10" stroke="rgba(255,255,255,0.5)" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" fill="none"/></svg></span>
            <span class="cap" role="listitem" [class.entered]="entered">Cloud Architecture</span>
            <span class="sep" aria-hidden="true"><svg width="10" height="12" viewBox="0 0 10 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2 2 L8 6 L2 10" stroke="rgba(255,255,255,0.5)" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" fill="none"/></svg></span>
            <span class="cap" role="listitem" [class.entered]="entered">Generative AI</span>
            <span class="sep" aria-hidden="true"><svg width="10" height="12" viewBox="0 0 10 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2 2 L8 6 L2 10" stroke="rgba(255,255,255,0.5)" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" fill="none"/></svg></span>
            <span class="cap" role="listitem" [class.entered]="entered">Prompt Engineering</span>
            <span class="sep" aria-hidden="true"><svg width="10" height="12" viewBox="0 0 10 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2 2 L8 6 L2 10" stroke="rgba(255,255,255,0.5)" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" fill="none"/></svg></span>
            <span class="cap" role="listitem" [class.entered]="entered">AI Agents & Orchestration Frameworks</span>
            <span class="sep" aria-hidden="true"><svg width="10" height="12" viewBox="0 0 10 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2 2 L8 6 L2 10" stroke="rgba(255,255,255,0.5)" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" fill="none"/></svg></span>
            <span class="cap" role="listitem" [class.entered]="entered">AI-Powered Analytics & BI</span>
          </div>
        </section>

        <!-- Visually hidden ARIA live region to announce landing content for screen readers -->
        <div aria-live="polite" class="sr-only" *ngIf="entered">Landing: Ibis Equity Consulting — Artificial Intelligence Engineering. Capabilities include Machine Learning, Cloud Architecture, Generative AI, Prompt Engineering, AI Agents and AI-Powered Analytics.</div>

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
  .landing-header { text-align: center; color: #fff; margin-bottom: 12px }
  .landing-header h1 { margin: 0; font-size: 1.6rem }
  .landing-header h2 { margin: 0; font-size: 1.1rem; opacity: 0.9 }
  /* Constrain GIF so it never overflows the viewport height and stays centered.
     Make the content area scrollable so the header remains visible on small viewports/fullscreen. */
  .landing-gif {
    width: auto;
    max-width: 85%;
    max-height: 65vh; /* increased size */
    height: auto;
    border-radius: 8px;
    display: block;
    margin: 0 auto;
    object-fit: contain;
    opacity: 0;
    transform: translateY(4px) scale(0.99);
    transition: opacity 520ms ease-out, transform 620ms cubic-bezier(.22,.9,.32,1);
  }

  /* Header pop-in with overshoot (longer duration) */
  @keyframes popIn {
    0% { opacity: 0; transform: translateY(-10px) scale(0.96) }
    70% { transform: translateY(0) scale(1.06); opacity: 1 }
    100% { transform: translateY(0) scale(1) }
  }

  /* GIF entrance (slower reveal, delayed) */
  @keyframes gifIn {
    0% { opacity: 0; transform: translateY(12px) scale(0.96) }
    100% { opacity: 1; transform: translateY(0) scale(1) }
  }

  /* show header immediately (no animation) */
  .landing-header { opacity: 1 }

  .landing-gif.entered { animation: gifIn 760ms cubic-bezier(.22,.9,.32,1) both; animation-delay: 360ms }

  /* Breakpoints - smaller viewports reduce GIF height further (55 / 42 / 36) */
  @media (max-width: 1100px) {
    .landing-gif { max-height: 60vh }
  }
  @media (max-width: 800px) {
    /* slightly larger and centered on tablets/smaller screens */
    .landing-gif { max-height: 52vh; max-width: 96%; margin-left:auto; margin-right:auto }
  }
  @media (max-width: 480px) {
    /* make GIF larger and fully centered on small phones */
    .landing-gif { max-height: 50vh; max-width: 100%; margin-left:auto; margin-right:auto }
  }

  /* Capabilities list under GIF */
  .capabilities-wrap { text-align: center; margin-top: 14px; color: #fff }
  .capabilities-title { font-weight: 600; margin-bottom: 6px }
  .capabilities { display: inline-flex; flex-wrap: wrap; gap: 6px; align-items: center; justify-content: center }
  .cap { padding: 4px 6px; font-size: 0.95rem; color: rgba(255,255,255,0.95); display:inline-block; opacity: 0; transform: translateY(4px) }
  /* Subtle vertical line separators instead of dots */
  .sep { display:inline-block; width:1px; height:18px; background: rgba(255,255,255,0.16); margin: 0 8px; vertical-align:middle }

  /* Staggered fade-in for capabilities */
  .capabilities .cap:nth-child(1) { transition: opacity 420ms ease-out 420ms, transform 420ms ease-out 420ms }
  .capabilities .cap:nth-child(3) { transition: opacity 420ms ease-out 520ms, transform 420ms ease-out 520ms }
  .capabilities .cap:nth-child(5) { transition: opacity 420ms ease-out 620ms, transform 420ms ease-out 620ms }
  .capabilities .cap:nth-child(7) { transition: opacity 420ms ease-out 720ms, transform 420ms ease-out 720ms }
  .capabilities .cap:nth-child(9) { transition: opacity 420ms ease-out 820ms, transform 420ms ease-out 820ms }
  .capabilities .cap.entered { opacity: 1; transform: translateY(0) }

  /* Accessibility: respect prefers-reduced-motion */
  @media (prefers-reduced-motion: reduce) {
    .landing-header.entered, .landing-gif.entered, .capabilities .cap { animation: none !important; transition: none !important; opacity: 1; transform: none }
  }

  /* Visually hidden util */
  .sr-only { position: absolute !important; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0,0,0,0); white-space: nowrap; border: 0 }
  .content { position: relative; display:flex; flex-direction:column; align-items:center; max-height: calc(100vh - 48px); overflow:auto; padding: 16px; box-sizing: border-box }
    .controls { position: absolute; right: 8px; bottom: 8px; color: #fff; display:flex; gap:8px; align-items:center}
    .controls label { font-size: 0.9rem }
    .controls .skip { background: rgba(255,255,255,0.1); color:#fff; border: none; padding:6px 10px; border-radius:4px }
  `]
})
export class LandingComponent implements OnInit, OnDestroy {
  @Output() closed = new EventEmitter<void>();
  private timeoutId: any;
  dontShowAgain = false;
  entered = false;

  ngOnInit(): void {
    // Trigger entrance animations shortly after init
    setTimeout(() => this.entered = true, 50);
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
