import { Component, OnInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { ScrollService } from '../../core/services/scroll.service';

@Component({
  selector: 'app-scroll-progress',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './scroll-progress.component.html',
  styleUrls: ['./scroll-progress.component.scss'],
})
export class ScrollProgressComponent implements OnInit, OnDestroy {
  scrollProgress = 0;

  private readonly destroy$ = new Subject<void>();

  constructor(
    private scrollService: ScrollService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.scrollService.scrollProgress$
        .pipe(takeUntil(this.destroy$))
        .subscribe((progress) => {
          this.scrollProgress = progress;
        });
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
