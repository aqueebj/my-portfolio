import { Component, OnInit, OnDestroy, ElementRef, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-section-header',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="section-header" [class.aos-animate]="isVisible">
      <h2 class="section-title">
        <ng-content></ng-content>
      </h2>
      <div class="section-header__accent"></div>
    </div>
  `,
  styles: [`
    .section-header {
      margin-bottom: var(--spacing-2xl);
      opacity: 0;
      transform: translateY(20px);
      transition: all var(--transition-slow);
      
      &.aos-animate {
        opacity: 1;
        transform: translateY(0);
        
        .section-header__accent {
          width: 60px;
        }
      }
    }
    
    .section-title {
      font-size: 2.5rem;
      font-weight: 700;
      margin-bottom: var(--spacing-sm);
      color: var(--text-primary);
      
      @media (max-width: 768px) {
        font-size: 2rem;
      }
    }
    
    .section-header__accent {
      height: 4px;
      width: 0;
      background: var(--accent-gradient);
      border-radius: var(--radius-full);
      transition: width 0.8s ease 0.2s;
    }
  `]
})
export class SectionHeaderComponent implements OnInit, OnDestroy {
  isVisible = false;
  private observer?: IntersectionObserver;
  private isBrowser: boolean;

  constructor(
    private el: ElementRef,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit() {
    if (this.isBrowser) {
      this.observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          this.isVisible = true;
          this.observer?.disconnect();
        }
      }, { threshold: 0.1 });
      
      this.observer.observe(this.el.nativeElement);
    }
  }

  ngOnDestroy() {
    this.observer?.disconnect();
  }
}
