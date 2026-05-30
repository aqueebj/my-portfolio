import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="contact" id="contact">
      <div class="contact__header">
        <h2 class="section-title">Want To <span class="text-gradient">Connect?</span></h2>
      </div>
      
      <div class="contact__container">
        <div class="contact__card">
          <p class="contact__text">
            Networking is key in the tech industry, and I'm always looking to meet new people, expand my professional circle, and explore exciting opportunities. Whether you're a fellow developer, designer, or entrepreneur, I'd love to chat and learn more about your work.
          </p>
          <div class="contact__links">
            <a *ngFor="let link of contactLinks" [href]="link.href" target="_blank" class="contact__link-btn">
              {{ link.label }}
            </a>
          </div>
        </div>
      </div>
      
      <footer class="footer">
        <p>&copy; {{ currentYear }} Aqueeb Jawed. All Rights Reserved.</p>
      </footer>
    </section>
  `,
  styles: [`
    .contact {
      padding: var(--section-padding);
      
      &__header {
        text-align: center;
        margin-bottom: var(--spacing-xl);
      }
      
      &__container {
        max-width: 600px;
        margin: 0 auto;
      }
      
      &__card {
        background: var(--bg-glass);
        backdrop-filter: blur(12px);
        padding: var(--spacing-xl);
        border-radius: var(--radius-xl);
        border: 1px solid var(--border-color);
        box-shadow: var(--shadow-lg);
        text-align: center;
      }
      
      &__text {
        color: var(--text-secondary);
        font-size: 1.1rem;
        line-height: 1.6;
        margin-bottom: var(--spacing-lg);
      }
      
      &__links {
        display: flex;
        flex-wrap: wrap;
        gap: var(--spacing-md);
        justify-content: center;
      }
      
      &__link-btn {
        background: var(--bg-secondary);
        color: var(--text-primary);
        padding: var(--spacing-sm) var(--spacing-lg);
        border-radius: var(--radius-full);
        font-weight: 500;
        text-decoration: none;
        border: 1px solid var(--border-color);
        transition: all var(--transition-fast);
        
        &:hover {
          border-color: var(--accent-cyan);
          background: rgba(0, 212, 255, 0.05);
          transform: translateY(-2px);
          box-shadow: var(--shadow-glow);
        }
      }
    }
    
    .footer {
      margin-top: var(--spacing-3xl);
      text-align: center;
      color: var(--text-muted);
      font-size: 0.9rem;
      padding-top: var(--spacing-md);
      border-top: 1px solid var(--border-color);
    }
  `]
})
export class ContactComponent implements OnInit {
  currentYear = new Date().getFullYear();
  
  contactLinks = [
    { label: 'Email', href: 'mailto:aqueebj@gmail.com' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/aqueeb-jawed-32b2ab131' },
    { label: 'GitHub', href: 'https://github.com/aqueebj' },
    { label: 'Resume', href: 'assets/docs/resume.png' }
  ];

  ngOnInit() {}
}
