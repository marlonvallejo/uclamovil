import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';  // 👈 Necesario para usar directivas como *ngIf, *ngFor
import { MapComponent } from './components/map/map';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, MapComponent],  // 👈 habilita *ngIf y demás directivas de Angular 
  templateUrl: './app.html',  // 👈 permite renderizar las rutas definidas en app.routes.ts
  styleUrls: ['./app.scss']   // 👈 registra el mapa como componente utilizable en este template
})   // 👈 registra el mapa como componente utilizable en este template
export class App {
  protected readonly title = signal('uclamovil-frontend');
}

