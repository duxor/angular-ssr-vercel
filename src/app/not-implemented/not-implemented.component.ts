import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-not-implemented',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './not-implemented.component.html',
  styleUrls: ['./not-implemented.component.css']
})
export class NotImplementedComponent {
  // The page the user came from, if available
  referrer: string = '';

  // Get the current date for the "coming soon" message
  currentDate = new Date();
  estimatedReleaseDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 3, this.currentDate.getDate());

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      this.referrer = document.referrer;
    }
  }
}
