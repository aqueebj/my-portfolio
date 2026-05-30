import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../core/services/theme.service';
import { ScrollService } from '../../core/services/scroll.service';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss'],
})
export class HeroComponent implements OnInit, OnDestroy {
  private readonly themeService = inject(ThemeService);
  private readonly scrollService = inject(ScrollService);

  readonly titles: string[] = [
    'Angular Developer',
    'Maps Engineer',
    'AI Chatbot Builder',
    'Full-Stack Engineer',
  ];

  currentTitleIndex = 0;
  displayText = '';
  isTyping = true;

  private typewriterTimeout: ReturnType<typeof setTimeout> | null = null;
  private pauseTimeout: ReturnType<typeof setTimeout> | null = null;
  private charIndex = 0;

  ngOnInit(): void {
    this.startTypewriter();
  }

  ngOnDestroy(): void {
    this.clearAllTimeouts();
  }

  scrollToSection(id: string): void {
    this.scrollService.scrollTo(id);
  }

  // ─── Typewriter Engine ─────────────────────────────────────

  private startTypewriter(): void {
    this.charIndex = 0;
    this.displayText = '';
    this.isTyping = true;
    this.typeForward();
  }

  private typeForward(): void {
    const currentTitle = this.titles[this.currentTitleIndex];

    if (this.charIndex <= currentTitle.length) {
      this.displayText = currentTitle.slice(0, this.charIndex);
      this.charIndex++;
      this.typewriterTimeout = setTimeout(() => this.typeForward(), 80);
    } else {
      // Finished typing — pause, then start deleting
      this.isTyping = false;
      this.pauseTimeout = setTimeout(() => {
        this.isTyping = true;
        this.typeBackward();
      }, 2000);
    }
  }

  private typeBackward(): void {
    if (this.charIndex > 0) {
      this.charIndex--;
      this.displayText = this.titles[this.currentTitleIndex].slice(0, this.charIndex);
      this.typewriterTimeout = setTimeout(() => this.typeBackward(), 40);
    } else {
      // Move to the next title and start typing again
      this.currentTitleIndex = (this.currentTitleIndex + 1) % this.titles.length;
      this.pauseTimeout = setTimeout(() => this.startTypewriter(), 300);
    }
  }

  private clearAllTimeouts(): void {
    if (this.typewriterTimeout) {
      clearTimeout(this.typewriterTimeout);
      this.typewriterTimeout = null;
    }
    if (this.pauseTimeout) {
      clearTimeout(this.pauseTimeout);
      this.pauseTimeout = null;
    }
  }
}
