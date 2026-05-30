import { Injectable, Inject, PLATFORM_ID, OnDestroy, NgZone } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject, Observable, fromEvent, Subject } from 'rxjs';
import { map, distinctUntilChanged, takeUntil, throttleTime } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ScrollService implements OnDestroy {
  /** Currently active (visible) section ID */
  private readonly activeSectionSubject = new BehaviorSubject<string>('');
  readonly activeSection$ = this.activeSectionSubject.asObservable();

  /** Scroll progress as a percentage 0–100 */
  private readonly scrollProgressSubject = new BehaviorSubject<number>(0);
  readonly scrollProgress$: Observable<number> = this.scrollProgressSubject.asObservable();

  private observer: IntersectionObserver | null = null;
  private readonly destroy$ = new Subject<void>();
  private readonly isBrowser: boolean;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private ngZone: NgZone
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);

    if (this.isBrowser) {
      this.initScrollProgress();
    }
  }

  /**
   * Smooth-scroll to a DOM element by its ID.
   * Falls back to instant scroll if smooth behavior isn't supported.
   */
  scrollTo(sectionId: string): void {
    if (!this.isBrowser) return;

    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });

      // Update the active section immediately for a snappier UX
      this.activeSectionSubject.next(sectionId);
    }
  }

  /**
   * Scroll to the top of the page.
   */
  scrollToTop(): void {
    if (!this.isBrowser) return;

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }

  /**
   * Set up an IntersectionObserver that watches the given section IDs
   * and emits the currently-visible section through activeSection$.
   */
  initScrollSpy(sectionIds: string[]): void {
    if (!this.isBrowser) return;

    // Tear down any previous observer
    this.destroyObserver();

    this.ngZone.runOutsideAngular(() => {
      const options: IntersectionObserverInit = {
        root: null, // viewport
        rootMargin: '-10% 0px -60% 0px', // trigger when section is roughly in the top third
        threshold: 0,
      };

      this.observer = new IntersectionObserver((entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            this.ngZone.run(() => {
              this.activeSectionSubject.next(entry.target.id);
            });
          }
        }
      }, options);

      // Observe each section element
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          this.observer.observe(el);
        }
      }
    });
  }

  /**
   * Returns whether a specific section is currently the active section.
   */
  isSectionActive$(sectionId: string): Observable<boolean> {
    return this.activeSection$.pipe(
      map((active) => active === sectionId),
      distinctUntilChanged()
    );
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.destroyObserver();
  }

  // ─── Private ───────────────────────────────────────────────

  /** Listen to window scroll events and compute a 0–100 progress value */
  private initScrollProgress(): void {
    this.ngZone.runOutsideAngular(() => {
      fromEvent(window, 'scroll', { passive: true })
        .pipe(
          throttleTime(16, undefined, { leading: true, trailing: true }), // ~60 fps cap
          takeUntil(this.destroy$)
        )
        .subscribe(() => {
          const scrollTop = window.scrollY || document.documentElement.scrollTop;
          const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
          const progress = docHeight > 0 ? Math.min(100, Math.round((scrollTop / docHeight) * 100)) : 0;

          this.ngZone.run(() => {
            this.scrollProgressSubject.next(progress);
          });
        });
    });
  }

  /** Disconnect and null out the IntersectionObserver */
  private destroyObserver(): void {
    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
    }
  }
}
