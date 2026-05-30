import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService, type Experience, type Education } from '../../core/services/data.service';

export interface TimelineEntry {
  type: 'work' | 'education';
  period: string;
  title: string;
  organization: string;
  location: string;
  description: string;
  skills: string[];
}

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.scss'],
})
export class ExperienceComponent {
  private readonly data = inject(DataService);

  readonly timeline: TimelineEntry[] = [
    ...this.data.experiences.map(
      (exp: Experience): TimelineEntry => ({
        type: 'work',
        period: exp.period,
        title: exp.role,
        organization: exp.company,
        location: exp.location,
        description: exp.description,
        skills: exp.skills,
      })
    ),
    ...this.data.education.map(
      (edu: Education): TimelineEntry => ({
        type: 'education',
        period: edu.period,
        title: edu.degree,
        organization: edu.institution,
        location: '',
        description: `Graduated with ${edu.grade}`,
        skills: [],
      })
    ),
  ];
}
