import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject, Observable } from 'rxjs';

export type Theme = 'dark' | 'light';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly STORAGE_KEY = 'portfolio-theme';
  private readonly themeSubject: BehaviorSubject<Theme>;

  /** Observable stream of the current theme */
  readonly currentTheme$: Observable<Theme>;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    const initialTheme = this.getStoredTheme();
    this.themeSubject = new BehaviorSubject<Theme>(initialTheme);
    this.currentTheme$ = this.themeSubject.asObservable();

    // Apply initial theme to DOM
    this.applyTheme(initialTheme);
  }

  /** Whether the current theme is dark */
  get isDark(): boolean {
    return this.themeSubject.getValue() === 'dark';
  }

  /** Current theme value (snapshot) */
  get currentTheme(): Theme {
    return this.themeSubject.getValue();
  }

  /** Toggle between dark and light themes */
  toggleTheme(): void {
    const newTheme: Theme = this.isDark ? 'light' : 'dark';
    this.setTheme(newTheme);
  }

  /** Explicitly set a theme */
  setTheme(theme: Theme): void {
    this.themeSubject.next(theme);
    this.applyTheme(theme);
    this.storeTheme(theme);
  }

  /** Apply the data-theme attribute to the document root element */
  private applyTheme(theme: Theme): void {
    if (isPlatformBrowser(this.platformId)) {
      document.documentElement.setAttribute('data-theme', theme);

      // Also toggle a CSS class for easier global styling hooks
      document.documentElement.classList.remove('theme-dark', 'theme-light');
      document.documentElement.classList.add(`theme-${theme}`);
    }
  }

  /** Retrieve the stored theme from localStorage, defaulting to 'dark' */
  private getStoredTheme(): Theme {
    if (isPlatformBrowser(this.platformId)) {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (stored === 'dark' || stored === 'light') {
        return stored;
      }
    }
    return 'dark';
  }

  /** Persist the selected theme to localStorage */
  private storeTheme(theme: Theme): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(this.STORAGE_KEY, theme);
    }
  }
}
