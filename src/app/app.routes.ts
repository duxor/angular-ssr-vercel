import { Routes } from '@angular/router';

export const routes: Routes = [
  { 
    path: '', 
    redirectTo: '/gallery', 
    pathMatch: 'full' 
  },
  {
    path: 'gallery',
    loadComponent: () => import('./gallery/gallery.component').then(m => m.GalleryComponent),
    title: 'Lumina - Explore Digital Art'
  },
  {
    path: 'artists',
    loadComponent: () => import('./artists/artists.component').then(m => m.ArtistsComponent),
    title: 'Lumina - Featured Artists'
  },
  {
    path: '**',
    redirectTo: '/gallery'
  }
];
