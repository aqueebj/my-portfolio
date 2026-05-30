import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

// Layout
import { NavbarComponent } from './shared/navbar/navbar.component';
import { ScrollProgressComponent } from './shared/scroll-progress/scroll-progress.component';
import { SocialLinksComponent } from './shared/social-links/social-links.component';

// Sections
import { HeroComponent } from './sections/hero/hero.component';
import { AboutComponent } from './sections/about/about.component';
import { ExperienceComponent } from './sections/experience/experience.component';
import { SkillsComponent } from './sections/skills/skills.component';
import { ProjectsComponent } from './sections/projects/projects.component';
import { MapComponent } from './sections/map/map.component';
import { LinkedinComponent } from './sections/linkedin/linkedin.component';
import { ContactComponent } from './sections/contact/contact.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    NavbarComponent,
    ScrollProgressComponent,
    SocialLinksComponent,
    HeroComponent,
    AboutComponent,
    ExperienceComponent,
    SkillsComponent,
    ProjectsComponent,
    MapComponent,
    LinkedinComponent,
    ContactComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  ngOnInit() {
    // Basic init if needed
  }
}
