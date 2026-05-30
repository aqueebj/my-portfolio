import {
  Component,
  OnInit,
  OnDestroy,
  HostListener,
  Inject,
  PLATFORM_ID,
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { ThemeService } from '../../core/services/theme.service';
import { ScrollService } from '../../core/services/scroll.service';

interface NavLink {
  label: string;
  id: string;
}

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit, OnDestroy {
  isScrolled = false;
  isMobileMenuOpen = false;
  activeSection = 'hero';
  isDarkTheme = true;

  navLinks: NavLink[] = [
    { label: 'About', id: 'about' },
    { label: 'Experience', id: 'experience' },
    { label: 'Skills', id: 'skills' },
    { label: 'Projects', id: 'projects' },
    { label: 'Map', id: 'map' },
    { label: 'Contact', id: 'contact' },
  ];

  private readonly destroy$ = new Subject<void>();
  private readonly isBrowser: boolean;

  constructor(
    public themeService: ThemeService,
    private scrollService: ScrollService,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
    // Subscribe to active section updates from scroll spy
    this.scrollService.activeSection$
      .pipe(takeUntil(this.destroy$))
      .subscribe((section) => {
        if (section) {
          this.activeSection = section;
        }
      });

    // Subscribe to theme changes
    this.themeService.currentTheme$
      .pipe(takeUntil(this.destroy$))
      .subscribe((theme) => {
        this.isDarkTheme = theme === 'dark';
      });
  }

  @HostListener('window:scroll')
  onWindowScroll(): void {
    if (this.isBrowser) {
      this.isScrolled = window.scrollY > 50;
    }
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;

    // Prevent body scroll when mobile menu is open
    if (this.isBrowser) {
      document.body.style.overflow = this.isMobileMenuOpen ? 'hidden' : '';
    }
  }

  navigateTo(sectionId: string): void {
    this.scrollService.scrollTo(sectionId);

    // Close mobile menu after navigation
    if (this.isMobileMenuOpen) {
      this.isMobileMenuOpen = false;
      if (this.isBrowser) {
        document.body.style.overflow = '';
      }
    }
  }

  scrollToTop(): void {
    this.scrollService.scrollToTop();
    if (this.isMobileMenuOpen) {
      this.isMobileMenuOpen = false;
      if (this.isBrowser) {
        document.body.style.overflow = '';
      }
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();

    if (this.isBrowser) {
      document.body.style.overflow = '';
    }
  }
}
