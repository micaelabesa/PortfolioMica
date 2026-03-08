import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Projects } from './pages/projects/projects';
import { Cimientos } from './pages/cimientos/cimientos';
import { Contact } from './pages/contact/contact';

export const routes: Routes = [
  { path: 'home', component: Home },
  { path: 'projects', component: Projects },
  { path: 'cimientos', component: Cimientos },
  { path: 'contact', component: Contact },
  { path: '', component: Home },
];
