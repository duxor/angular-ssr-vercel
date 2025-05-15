import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-not-implemented',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './not-implemented.component.html',
  styleUrls: ['./not-implemented.component.css']
})
export class NotImplementedComponent {
  // The page the user came from, if available
  referrer: string = document.referrer;
  
  // Get the current date for the "coming soon" message
  currentDate = new Date();
  estimatedReleaseDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 3, this.currentDate.getDate());
}
