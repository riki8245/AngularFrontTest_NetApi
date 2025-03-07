import { Routes } from '@angular/router';
import { AuthenticateComponent } from './root/authenticate/authenticate.component';
import { ArticulosExtComponent } from './views/articulos-ext/articulos-ext.component';

export const routes: Routes = [
  { path: 'auth', component: AuthenticateComponent },
  { path: 'articuloext/:token', component: ArticulosExtComponent },
  { path: '', redirectTo: '/auth', pathMatch: 'full' }, // Default route
];
