import { Component, AfterViewInit, ViewChild, ElementRef, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import Chart from 'chart.js/auto';

interface Skill {
  name: string;
  level: number;
}

interface SkillCategory {
  name: string;
  icon: string;
  skills: Skill[];
}

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss'],
})
export class SkillsComponent implements AfterViewInit, OnDestroy {
  @ViewChild('skillsChart') chartRef!: ElementRef<HTMLCanvasElement>;

  private chart: Chart | null = null;
  activeCategory = 0;

  readonly categories: SkillCategory[] = [
    {
      name: 'Frontend',
      icon: '🎨',
      skills: [
        { name: 'Angular', level: 95 },
        { name: 'TypeScript', level: 90 },
        { name: 'JavaScript', level: 92 },
        { name: 'Angular Material', level: 88 },
        { name: 'RxJS', level: 85 },
        { name: 'HTML/CSS', level: 90 },
        { name: 'SCSS', level: 85 },
      ],
    },
    {
      name: 'Maps & Geo',
      icon: '🗺️',
      skills: [
        { name: 'Leaflet', level: 90 },
        { name: 'GeoJSON', level: 88 },
        { name: 'OpenStreetMap', level: 82 },
      ],
    },
    {
      name: 'AI & Chatbots',
      icon: '🤖',
      skills: [
        { name: 'Google ADK', level: 80 },
        { name: 'Generative AI', level: 75 },
        { name: 'Dialogflow', level: 70 },
      ],
    },
    {
      name: 'Data & Visualization',
      icon: '📊',
      skills: [
        { name: 'Chart.js', level: 88 },
        { name: 'JSON/GeoJSON', level: 90 },
        { name: 'Firebase', level: 82 },
      ],
    },
    {
      name: 'Backend & Tools',
      icon: '⚙️',
      skills: [
        { name: 'Node.js', level: 75 },
        { name: 'REST APIs', level: 88 },
        { name: 'Git', level: 85 },
        { name: 'Python', level: 80 },
      ],
    },
    {
      name: 'Languages',
      icon: '💻',
      skills: [
        { name: 'C/C++', level: 78 },
        { name: 'Java', level: 75 },
        { name: 'MySQL', level: 72 },
      ],
    },
  ];

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => this.createChart(), 0);
    }
  }

  ngOnDestroy(): void {
    this.chart?.destroy();
  }

  private createChart(): void {
    const canvas = this.chartRef?.nativeElement;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Top skills for the radar chart
    const radarLabels = [
      'Angular', 'TypeScript', 'JavaScript', 'Leaflet',
      'Chart.js', 'REST APIs', 'RxJS', 'SCSS',
      'GeoJSON', 'Git', 'Firebase', 'Node.js'
    ];
    const radarData = [95, 90, 92, 90, 88, 88, 85, 85, 88, 85, 82, 75];

    this.chart = new Chart(ctx, {
      type: 'radar',
      data: {
        labels: radarLabels,
        datasets: [
          {
            label: 'Proficiency',
            data: radarData,
            backgroundColor: 'rgba(0, 212, 255, 0.12)',
            borderColor: '#00d4ff',
            borderWidth: 2,
            pointBackgroundColor: '#00d4ff',
            pointBorderColor: '#0a0a0f',
            pointBorderWidth: 2,
            pointRadius: 4,
            pointHoverRadius: 6,
            pointHoverBackgroundColor: '#ff9f43',
            pointHoverBorderColor: '#0a0a0f',
            fill: true,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            backgroundColor: 'rgba(18, 18, 26, 0.95)',
            titleColor: '#e4e4e7',
            bodyColor: '#00d4ff',
            borderColor: '#1e1e2e',
            borderWidth: 1,
            padding: 12,
            cornerRadius: 8,
            displayColors: false,
            callbacks: {
              label: (context) => `${context.parsed.r}% proficiency`,
            },
          },
        },
        scales: {
          r: {
            beginAtZero: true,
            max: 100,
            min: 0,
            ticks: {
              stepSize: 20,
              color: '#a1a1aa',
              backdropColor: 'transparent',
              font: {
                size: 10,
                family: 'Inter',
              },
            },
            grid: {
              color: 'rgba(30, 30, 46, 0.6)',
              circular: true,
            },
            angleLines: {
              color: 'rgba(30, 30, 46, 0.4)',
            },
            pointLabels: {
              color: '#a1a1aa',
              font: {
                size: 11,
                family: 'Inter',
                weight: 500,
              },
              padding: 8,
            },
          },
        },
        animation: {
          duration: 1200,
          easing: 'easeOutQuart',
        },
      },
    });
  }
}
