import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () => import('./gallery/gallery.component').then(m => m.GalleryComponent),
    title: 'Lumina - Explore Digital Art'
  },
  {
    path: 'artists',
    loadComponent: () => import('./artists/artists.component').then(m => m.ArtistsComponent),
    title: 'Lumina - Featured Artists'
  },
  {
    path: 'not-implemented',
    loadComponent: () => import('./not-implemented/not-implemented.component').then(m => m.NotImplementedComponent),
    title: 'Lumina - Coming Soon'
  },
  {
    path: '**',
    redirectTo: '/not-implemented',
  }
];
