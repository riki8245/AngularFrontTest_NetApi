import { Routes } from '@angular/router';
import { AuthenticateComponent } from './root/authenticate/authenticate.component';
import { ArticulosExtComponent } from './views/articulos-ext/articulos-ext.component';
import { ArticulosComponent } from './views/articulos/articulos.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: 'auth', component: AuthenticateComponent, canActivate: [authGuard] },
  { path: 'articulosext', component: ArticulosExtComponent },
  { path: 'articulos', component: ArticulosComponent },
  { path: 'articulos/:id', component: ArticulosComponent },
  { path: '', redirectTo: '/auth', pathMatch: 'full' }, // Default route
];
