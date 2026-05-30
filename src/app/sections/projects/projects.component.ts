import { Component, OnInit, OnDestroy, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

interface Project {
  name: string;
  category: string;
  date: string;
  description: string;
  tech: string[];
  links: { live?: string; code?: string };
}

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit, OnDestroy {
  private observer?: IntersectionObserver;
  private isBrowser: boolean;

  projects: Project[] = [
    {
      name: 'Data Pipeline Framework',
      category: 'Data Modelling',
      date: 'May 2021',
      description: 'Built a comprehensive framework for data transformation — create specific tasks and chain them into pipelines. Users upload CSV data, select a pipeline from a visual list, execute it, and receive clean, processed results in CSV format.',
      tech: ['Python', 'Data Modelling', 'CSV Processing', 'Pipeline Architecture'],
      links: {}
    },
    {
      name: 'Mercari Price Suggestion',
      category: 'Machine Learning',
      date: 'Nov 2020',
      description: 'Developed a regression model for the Kaggle Mercari challenge that automatically suggests accurate product prices based on item descriptions and metadata. Leveraged TF-IDF vectorization, Ridge regression, and LightGBM ensemble for optimal RMSLE scores.',
      tech: ['Python', 'Scikit-learn', 'LightGBM', 'TF-IDF', 'Pandas', 'NumPy'],
      links: {}
    },
    {
      name: 'Banking Management System',
      category: 'Systems Programming',
      date: 'Nov 2020',
      description: 'Engineered a multi-functional concurrent banking system supporting regular users, joint accounts, and admin operations. The server handles multiple simultaneous clients using socket programming, file locking for data integrity, and UNIX system calls.',
      tech: ['C', 'Socket Programming', 'File Locking', 'System Calls', 'Concurrency'],
      links: {}
    }
  ];

  activeProject: number = -1;

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
    if (this.isBrowser) {
      setTimeout(() => this.initObserver(), 100);
    }
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }

  private initObserver(): void {
    const cards = document.querySelectorAll('.projects__card');
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('aos-animate');
          }
        });
      },
      { threshold: 0.15 }
    );
    cards.forEach((card) => this.observer!.observe(card));
  }
}
