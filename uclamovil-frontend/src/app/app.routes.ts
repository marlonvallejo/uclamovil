import { Routes } from '@angular/router';

// importamos el componente del mapa

import { MapComponent } from './components/map/map';

// definición de rutas de la app
export const routes: Routes = [
  { path: '', component: MapComponent }, // 👈 ruta principal muestra el mapa
];
