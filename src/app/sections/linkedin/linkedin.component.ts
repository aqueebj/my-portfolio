import { Component, OnInit, OnDestroy, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ThemeService } from '../../core/services/theme.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-linkedin',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="linkedin" id="linkedin">
      <div class="linkedin__header">
        <h2 class="section-title">My <span class="text-gradient">Profile</span></h2>
      </div>
      
      <div class="linkedin__badge-container">
        <div class="badge-base LI-profile-badge" 
             data-locale="en_US" 
             data-size="large" 
             [attr.data-theme]="currentTheme"
             data-type="HORIZONTAL" 
             data-vanity="aqueebj" 
             data-version="v1">
          <a class="badge-base__link LI-simple-link" 
             href="https://in.linkedin.com/in/aqueebj?trk=profile-badge">
            Aqueeb Jawed
          </a>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .linkedin {
      padding: var(--section-padding);
      
      &__header {
        text-align: center;
        margin-bottom: var(--spacing-xl);
      }
      
      &__badge-container {
        display: flex;
        justify-content: center;
        background: var(--bg-glass);
        backdrop-filter: blur(12px);
        padding: var(--spacing-xl);
        border-radius: var(--radius-xl);
        border: 1px solid var(--border-color);
        box-shadow: var(--shadow-md);
        max-width: 600px;
        margin: 0 auto;
        min-height: 250px;
        align-items: center;
      }
    }
  `]
})
export class LinkedinComponent implements OnInit, OnDestroy {
  currentTheme = 'dark';
  private themeSub?: Subscription;
  private isBrowser: boolean;

  constructor(
    public themeService: ThemeService,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit() {
    if (this.isBrowser) {
      this.themeSub = this.themeService.currentTheme$.subscribe(theme => {
        this.currentTheme = theme;
      });

      // Dynamically load the LinkedIn script for SPA
      const script = document.createElement('script');
      script.src = 'https://platform.linkedin.com/badges/js/profile.js';
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
    }
  }

  ngOnDestroy() {
    this.themeSub?.unsubscribe();
  }
}
