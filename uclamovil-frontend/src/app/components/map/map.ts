import { AfterViewInit, Component, Inject, OnDestroy, PLATFORM_ID, ElementRef, ViewChild } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-map',
  standalone: true,
  template: `<div #mapContainer style="height: 100vh; width: 100%;"></div>`
})
export class MapComponent implements AfterViewInit, OnDestroy {
  private map: any; // instancia del mapa Leaflet
  private isBrowser: boolean; // flag para verificar si estamos en navegador

  // referencia directa al <div> del mapa
  @ViewChild('mapContainer', { static: true }) mapContainer!: ElementRef<HTMLDivElement>;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId); // solo cargamos mapa en navegador
  }

  async ngAfterViewInit(): Promise<void> {
    if (this.isBrowser) {
      const L = await import('leaflet'); // import dinámico

      // delay pequeño para que Angular pinte el contenedor
      setTimeout(() => {
        this.initMap(L);
      }, 100); // 👈 espera un poco más para evitar offsetWidth null
    }
  }

  private initMap(L: any): void {
    if (!this.mapContainer?.nativeElement) return;

     // 🧹 limpiar si ya había un mapa en este contenedor
    const container = L.DomUtil.get(this.mapContainer.nativeElement.id || 'map');
    if (container != null) {
      (container as any)._leaflet_id = null;
      container.innerHTML = '';
    }
    // inicializamos mapa
    this.map = L.map(this.mapContainer.nativeElement, {
      center: [10.4806, -66.9036],
      zoom: 13,
      zoomControl: true,
      dragging: true,
      scrollWheelZoom: true
    });
        // capa base con OpenStreetMap

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);

    // recalcular tamaño para evitar errores de offsetWidth
    this.map.whenReady(() => {
      this.map.invalidateSize();
    });
  }

  ngOnDestroy(): void {
    if (this.map) {
      this.map.remove();
    }
  }
}

