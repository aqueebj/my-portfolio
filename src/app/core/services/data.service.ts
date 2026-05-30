import { Injectable } from '@angular/core';

// ──────────────────────────────────────────────
//  Interfaces
// ──────────────────────────────────────────────

export interface Profile {
  name: string;
  title: string;
  subtitle: string;
  email: string;
  phone: string;
  github: string;
  linkedin: string;
  linkedinVanity: string;
  location: string;
  hometown: string;
  bio: string;
  resumeUrl: string;
}

export interface Experience {
  role: string;
  company: string;
  location: string;
  period: string;
  description: string;
  skills: string[];
}

export interface Project {
  name: string;
  category: string;
  date: string;
  description: string;
  tech: string[];
  links: Record<string, string>;
}

export interface Skill {
  name: string;
  level: number; // 0–100
}

export interface SkillCategory {
  name: string;
  icon: string;
  skills: Skill[];
}

export interface Achievement {
  title: string;
  description: string;
  icon: string;
}

export interface Education {
  degree: string;
  institution: string;
  period: string;
  grade: string;
}

export interface MapLocation {
  lat: number;
  lng: number;
  label: string;
  description: string;
  type: 'home' | 'work' | 'education' | 'other';
}

// ──────────────────────────────────────────────
//  Data Constants
// ──────────────────────────────────────────────

export const PROFILE_DATA: Profile = {
  name: 'Aqueeb Jawed',
  title: 'Senior Software Engineer',
  subtitle: 'Angular · Maps · AI Chatbots',
  email: 'aqueebj@gmail.com',
  phone: '+91-8338996578',
  github: 'https://github.com/aqueebj',
  linkedin: 'https://www.linkedin.com/in/aqueeb-jawed-32b2ab131',
  linkedinVanity: 'aqueebj',
  location: 'Bangalore, India',
  hometown: 'Keonjhar, Odisha, India',
  bio: 'Passionate Senior Software Engineer specializing in Angular web applications, interactive maps with Leaflet, AI-powered chatbots, and data visualization. Building enterprise-grade solutions at Cropin, driving agricultural technology with intelligent web platforms.',
  resumeUrl: 'assets/docs/resume.pdf',
};

export const EXPERIENCE_DATA: Experience[] = [
  {
    role: 'Senior Software Engineer',
    company: 'Cropin Technology',
    location: 'Bangalore, India',
    period: 'Apr 2026 – Present',
    description:
      'Leading development of enterprise Angular applications for agricultural intelligence. Building interactive GIS-based dashboards with Leaflet maps, developing AI-powered chatbots using Google ADK, and creating data visualization solutions with Chart.js for farm analytics.',
    skills: ['Angular', 'TypeScript', 'Leaflet', 'Chart.js', 'Firebase', 'Angular Material', 'Google ADK'],
  },
  {
    role: 'Software Development Engineer 2',
    company: 'Cropin Technology',
    location: 'Bangalore, India',
    period: 'Apr 2024 – Mar 2026',
    description:
      'Developed and maintained Angular-based web applications for crop monitoring and farm management. Implemented responsive UI components with Angular Material, integrated REST APIs, and built GeoJSON-based map visualizations.',
    skills: ['Angular', 'JavaScript', 'TypeScript', 'Angular Material', 'REST APIs', 'GeoJSON'],
  },
  {
    role: 'Software Development Engineer 1',
    company: 'Cropin Technology',
    location: 'Bangalore, India',
    period: 'Jul 2022 – Mar 2024',
    description:
      'Contributed to the development of agricultural technology solutions. Assisted in building UI components, writing unit tests, and debugging Angular applications to ensure robust performance.',
    skills: ['Angular', 'JavaScript', 'HTML/CSS', 'Debugging', 'Git'],
  },
];

export const EDUCATION_DATA: Education[] = [
  {
    degree: 'M.Tech in Computer Science & Engineering',
    institution: 'IIIT Bangalore',
    period: 'Aug 2020 – Jul 2022',
    grade: 'CGPA 3.15/4',
  },
  {
    degree: 'B.Tech in Computer Science & Engineering',
    institution: 'Gandhi Engineering College, Bhubaneswar',
    period: 'Jul 2015 – May 2019',
    grade: 'CGPA 9.13/10',
  },
];

export const PROJECTS_DATA: Project[] = [
  {
    name: 'Data Pipeline Framework',
    category: 'Data Modelling',
    date: 'May 2021',
    description:
      'Built a framework for Data to create specific tasks and create pipelines of tasks. Users can upload input in CSV format and select a pipeline to run and get results in CSV format.',
    tech: ['Python', 'Data Modelling', 'CSV Processing', 'Pipeline Architecture'],
    links: {},
  },
  {
    name: 'Mercari Price Suggestion',
    category: 'ML / Kaggle',
    date: 'Nov 2020',
    description:
      'Built a regression model that automatically suggests accurate prices for products. Used traditional ML methods including RMSLE, TF-IDF, Ridge, and LightGBM for prediction.',
    tech: ['Python', 'Scikit-learn', 'LightGBM', 'TF-IDF', 'Pandas'],
    links: {},
  },
  {
    name: 'Banking Management System',
    category: 'Socket Programming',
    date: 'Nov 2020',
    description:
      'Developed a multi-functional banking system with regular user, joint account, and admin features. Server handles concurrent clients with socket programming, file locking, and system calls.',
    tech: ['C', 'Socket Programming', 'File Locking', 'System Calls'],
    links: {},
  },
];

export const SKILL_CATEGORIES_DATA: SkillCategory[] = [
  {
    name: 'Frontend',
    icon: 'code',
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
    icon: 'map',
    skills: [
      { name: 'Leaflet', level: 90 },
      { name: 'GeoJSON', level: 88 },
      { name: 'OpenStreetMap', level: 82 },
    ],
  },
  {
    name: 'AI & Chatbots',
    icon: 'bot',
    skills: [
      { name: 'Google ADK', level: 80 },
      { name: 'Generative AI', level: 75 },
      { name: 'Dialogflow', level: 70 },
    ],
  },
  {
    name: 'Data & Visualization',
    icon: 'chart',
    skills: [
      { name: 'Chart.js', level: 88 },
      { name: 'JSON/GeoJSON', level: 90 },
      { name: 'Firebase', level: 82 },
    ],
  },
  {
    name: 'Backend & Tools',
    icon: 'server',
    skills: [
      { name: 'Node.js', level: 75 },
      { name: 'REST APIs', level: 88 },
      { name: 'Git', level: 85 },
      { name: 'Python', level: 80 },
    ],
  },
  {
    name: 'Languages',
    icon: 'terminal',
    skills: [
      { name: 'C/C++', level: 78 },
      { name: 'Java', level: 75 },
      { name: 'MySQL', level: 72 },
    ],
  },
];

export const ACHIEVEMENTS_DATA: Achievement[] = [
  {
    title: 'Institute Rank 1',
    description: 'Secured Institute Rank 1 in both Undergraduate and School',
    icon: 'trophy',
  },
  {
    title: 'Best Student Award',
    description: 'Received the First Best Student Award in School',
    icon: 'award',
  },
  {
    title: 'Python Gold Medalist',
    description: 'Scored 96% and achieved TOP 1% in NPTEL Python certification',
    icon: 'medal',
  },
  {
    title: 'GATE AIR 1086',
    description: 'Secured All India Rank 1086 in Graduate Aptitude Test in Engineering',
    icon: 'target',
  },
];

export const MAP_LOCATIONS_DATA: Record<string, MapLocation> = {
  home: {
    lat: 21.6289,
    lng: 85.5817,
    label: 'Keonjhar, Odisha',
    description: 'Where I grew up',
    type: 'home',
  },
  work: {
    lat: 12.9716,
    lng: 77.5946,
    label: 'Bangalore, Karnataka',
    description: 'Where I build',
    type: 'work',
  },
};

// ──────────────────────────────────────────────
//  Service
// ──────────────────────────────────────────────

@Injectable({
  providedIn: 'root',
})
export class DataService {
  // ── Profile ──
  readonly profile: Profile = PROFILE_DATA;

  // ── Experience ──
  readonly experiences: Experience[] = EXPERIENCE_DATA;

  // ── Education ──
  readonly education: Education[] = EDUCATION_DATA;

  // ── Projects ──
  readonly projects: Project[] = PROJECTS_DATA;

  // ── Skills ──
  readonly skillCategories: SkillCategory[] = SKILL_CATEGORIES_DATA;

  // ── Achievements ──
  readonly achievements: Achievement[] = ACHIEVEMENTS_DATA;

  // ── Map Locations ──
  readonly mapLocations: Record<string, MapLocation> = MAP_LOCATIONS_DATA;

  /** Get all unique tech/skill tags across projects */
  get allProjectTags(): string[] {
    const tags = new Set<string>();
    for (const project of this.projects) {
      for (const tech of project.tech) {
        tags.add(tech);
      }
    }
    return Array.from(tags).sort();
  }

  /** Get all unique project categories */
  get projectCategories(): string[] {
    return [...new Set(this.projects.map((p) => p.category))];
  }

  /** Filter projects by category */
  getProjectsByCategory(category: string): Project[] {
    return this.projects.filter((p) => p.category === category);
  }

  /** Get flat list of all skills across every category */
  get allSkills(): Skill[] {
    return this.skillCategories.flatMap((cat) => cat.skills);
  }

  /** Get map locations as an array */
  get mapLocationsArray(): MapLocation[] {
    return Object.values(this.mapLocations);
  }
}
