import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent {
  artworks = [
    {
      id: 1,
      title: 'Digital Dreamscape',
      artist: 'Elena Bright',
      imageUrl: 'https://via.placeholder.com/400x300?text=Digital+Dreamscape',
      description: 'An immersive exploration of subconscious digital realms.'
    },
    {
      id: 2,
      title: 'Neon Horizons',
      artist: 'Marcus Wave',
      imageUrl: 'https://via.placeholder.com/400x300?text=Neon+Horizons',
      description: 'A vibrant cityscape rendered in neon colors and dynamic patterns.'
    },
    {
      id: 3,
      title: 'Quantum Reflections',
      artist: 'Sophia Quantum',
      imageUrl: 'https://via.placeholder.com/400x300?text=Quantum+Reflections',
      description: 'Exploring the intersection of quantum physics and visual art.'
    },
    {
      id: 4,
      title: 'Fractal Forest',
      artist: 'Leo Pattern',
      imageUrl: 'https://via.placeholder.com/400x300?text=Fractal+Forest',
      description: 'A mesmerizing journey through mathematically generated landscapes.'
    }
  ];
}
