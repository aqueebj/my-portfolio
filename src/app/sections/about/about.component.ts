import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent {
  readonly cards = [
    {
      phase: 'Past',
      icon: '🎓',
      description:
        'Started my journey with a deep fascination for algorithms and data structures during my B.Tech at Gandhi Engineering College, Bhubaneswar. Secured Institute Rank 1 and earned the Best Student Award. My curiosity drove me to master Python (NPTEL Gold Medalist, Top 1%) and crack GATE with AIR 1086, leading me to IIIT Bangalore for M.Tech.',
    },
    {
      phase: 'Present',
      icon: '💻',
      description:
        'Currently working as SDE 2 at Cropin Technology, Bangalore — an AI-driven agritech company. I architect and build enterprise Angular applications featuring interactive Leaflet maps for geospatial farm analytics, AI-powered chatbots using Google ADK, and rich data visualizations with Chart.js. Angular Material and TypeScript are my daily companions.',
    },
    {
      phase: 'Future',
      icon: '🚀',
      description:
        'Excited about the convergence of web technologies, AI, and geospatial intelligence. Looking to deepen my expertise in building intelligent, map-driven applications and contribute to products that create real-world impact. Open to challenging opportunities that push the boundaries of frontend engineering.',
    },
  ];
}
