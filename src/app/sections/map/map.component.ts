import { Component, OnInit, OnDestroy, PLATFORM_ID, Inject, ViewEncapsulation } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MapComponent implements OnInit, OnDestroy {
  private map?: L.Map;
  activeLocation: 'home' | 'work' = 'home';
  private isBrowser: boolean;
  
  locations = {
    home: { lat: 21.6289, lng: 85.5817, label: 'Keonjhar, Odisha', description: 'Where I grew up', type: 'home' as const },
    work: { lat: 12.9716, lng: 77.5946, label: 'Bangalore, Karnataka', description: 'Where I build', type: 'work' as const }
  };

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit() {
    if (this.isBrowser) {
      setTimeout(() => this.initMap(), 100);
    }
  }

  ngOnDestroy() {
    this.map?.remove();
  }

  private initMap() {
    // Basic setup
    this.map = L.map('portfolio-map', {
      zoomControl: false,
      scrollWheelZoom: false
    }).setView([this.locations.home.lat, this.locations.home.lng], 10);

    // CartoDB Dark Matter tiles
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://carto.com/">CARTO</a>'
    }).addTo(this.map);

    this.addMarkers();
  }

  private addMarkers() {
    if (!this.map) return;

    const createIcon = (color: string, label: string) => L.divIcon({
      className: 'custom-map-marker',
      html: `<div class="marker-pin" style="background: ${color}"></div><div class="marker-label">${label}</div>`,
      iconSize: [30, 30],
      iconAnchor: [15, 30]
    });

    const homeIcon = createIcon('var(--accent-amber)', '🏠');
    const workIcon = createIcon('var(--accent-cyan)', '🏢');

    L.marker([this.locations.home.lat, this.locations.home.lng], { icon: homeIcon })
      .bindPopup(`<b>${this.locations.home.label}</b><br>${this.locations.home.description}`)
      .addTo(this.map);

    L.marker([this.locations.work.lat, this.locations.work.lng], { icon: workIcon })
      .bindPopup(`<b>${this.locations.work.label}</b><br>${this.locations.work.description}`)
      .addTo(this.map);

    // Draw dashed line between them
    const latlngs: L.LatLngExpression[] = [
      [this.locations.home.lat, this.locations.home.lng],
      [this.locations.work.lat, this.locations.work.lng]
    ];
    
    L.polyline(latlngs, { 
      color: 'var(--accent-cyan)', 
      dashArray: '5, 10', 
      weight: 2, 
      opacity: 0.6 
    }).addTo(this.map);
  }

  flyToLocation(type: 'home' | 'work') {
    this.activeLocation = type;
    if (!this.map) return;
    
    const loc = this.locations[type];
    this.map.flyTo([loc.lat, loc.lng], 12, {
      duration: 2,
      easeLinearity: 0.25
    });
  }
}
