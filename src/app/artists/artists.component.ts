import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-artists',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './artists.component.html',
  styleUrls: ['./artists.component.css']
})
export class ArtistsComponent {
  artists = [
    {
      id: 1,
      name: 'Elena Bright',
      specialty: 'Abstract Digital Landscapes',
      gradientColors: ['#FF6B6B', '#4ECDC4'],
      gradientDirection: '135deg',
      bio: 'Elena creates immersive digital landscapes that blend reality with imagination. Her work has been featured in digital exhibitions worldwide.',
      featured: true
    },
    {
      id: 2,
      name: 'Marcus Wave',
      specialty: 'Neon Urban Art',
      gradientColors: ['#6B6BFF', '#FF6B6B'],
      gradientDirection: '45deg',
      bio: 'Inspired by cyberpunk aesthetics, Marcus specializes in vibrant neon cityscapes that capture the energy of urban environments.',
      featured: true
    },
    {
      id: 3,
      name: 'Sophia Quantum',
      specialty: 'Quantum Visualization',
      gradientColors: ['#A56BFF', '#6BFFDB'],
      gradientDirection: '90deg',
      bio: 'With a background in physics, Sophia creates art that visualizes quantum phenomena in beautiful and accessible ways.',
      featured: false
    },
    {
      id: 4,
      name: 'Leo Pattern',
      specialty: 'Fractal Art',
      gradientColors: ['#6BFF9E', '#FFDB6B'],
      gradientDirection: '180deg',
      bio: 'Leo explores the infinite complexity of fractals, creating mesmerizing patterns that reveal the mathematical beauty of nature.',
      featured: true
    }
  ];

  featuredArtists = this.artists.filter(artist => artist.featured);
}
