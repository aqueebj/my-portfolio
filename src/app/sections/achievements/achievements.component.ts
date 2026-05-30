import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService, type Achievement } from '../../core/services/data.service';

@Component({
  selector: 'app-achievements',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './achievements.component.html',
  styleUrls: ['./achievements.component.scss'],
})
export class AchievementsComponent {
  private readonly data = inject(DataService);

  /** Map the DataService icon keys to rich emoji for display */
  private readonly iconMap: Record<string, string> = {
    trophy: '🏆',
    award: '🥇',
    medal: '🎖️',
    target: '🎯',
  };

  readonly achievements = this.data.achievements.map((a: Achievement) => ({
    ...a,
    emoji: this.iconMap[a.icon] ?? '⭐',
  }));
}
