import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent {
  artworks = [
    {
      id: 1,
      title: 'Digital Dreamscape',
      artist: 'Elena Bright',
      gradientColors: ['#FF6B6B', '#4ECDC4'],
      gradientDirection: '135deg',
      description: 'An immersive exploration of subconscious digital realms.'
    },
    {
      id: 2,
      title: 'Neon Horizons',
      artist: 'Marcus Wave',
      gradientColors: ['#6B6BFF', '#FF6B6B'],
      gradientDirection: '45deg',
      description: 'A vibrant cityscape rendered in neon colors and dynamic patterns.'
    },
    {
      id: 3,
      title: 'Quantum Reflections',
      artist: 'Sophia Quantum',
      gradientColors: ['#A56BFF', '#6BFFDB'],
      gradientDirection: '90deg',
      description: 'Exploring the intersection of quantum physics and visual art.'
    },
    {
      id: 4,
      title: 'Fractal Forest',
      artist: 'Leo Pattern',
      gradientColors: ['#6BFF9E', '#FFDB6B'],
      gradientDirection: '180deg',
      description: 'A mesmerizing journey through mathematically generated landscapes.'
    }
  ];
}
