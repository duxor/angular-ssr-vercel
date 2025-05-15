import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-artists',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './artists.component.html',
  styleUrls: ['./artists.component.css']
})
export class ArtistsComponent {
  artists = [
    {
      id: 1,
      name: 'Elena Bright',
      specialty: 'Abstract Digital Landscapes',
      imageUrl: 'https://via.placeholder.com/300x300?text=Elena+Bright',
      bio: 'Elena creates immersive digital landscapes that blend reality with imagination. Her work has been featured in digital exhibitions worldwide.',
      featured: true
    },
    {
      id: 2,
      name: 'Marcus Wave',
      specialty: 'Neon Urban Art',
      imageUrl: 'https://via.placeholder.com/300x300?text=Marcus+Wave',
      bio: 'Inspired by cyberpunk aesthetics, Marcus specializes in vibrant neon cityscapes that capture the energy of urban environments.',
      featured: true
    },
    {
      id: 3,
      name: 'Sophia Quantum',
      specialty: 'Quantum Visualization',
      imageUrl: 'https://via.placeholder.com/300x300?text=Sophia+Quantum',
      bio: 'With a background in physics, Sophia creates art that visualizes quantum phenomena in beautiful and accessible ways.',
      featured: false
    },
    {
      id: 4,
      name: 'Leo Pattern',
      specialty: 'Fractal Art',
      imageUrl: 'https://via.placeholder.com/300x300?text=Leo+Pattern',
      bio: 'Leo explores the infinite complexity of fractals, creating mesmerizing patterns that reveal the mathematical beauty of nature.',
      featured: true
    }
  ];

  featuredArtists = this.artists.filter(artist => artist.featured);
}
